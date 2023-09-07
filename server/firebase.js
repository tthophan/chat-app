const admin = require("firebase-admin");
const serviceAccount = require("./chat-app-dd38c-firebase-adminsdk-j8mhe-e8ba8e1bdd.json");
const { applicationConfig } = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const sendNotification = async () => {
  const unReadMessages = await getMessageUnread(
    applicationConfig.threadholdUnreadMessage
  );
  if (!unReadMessages?.length) return;
  const unreadMessagesGrouped = unReadMessages.reduce((acc, item) => {
    const { receiver } = item;

    if (!acc[receiver]) acc[receiver] = [];

    acc[receiver].push(item);

    return acc;
  }, {});

  const receiverIds = Object.keys(unreadMessagesGrouped);
  const receiverFcmTokens = await getFcmTokens(receiverIds);

  await Promise.allSettled(
    receiverFcmTokens.map(async ({ token, uid, id }) => {
      const message = {
        notification: {
          title: "Notice",
          body: `You have a ${unreadMessagesGrouped[uid].length} messages unread`,
        },
        token,
      };
      return await admin
        .messaging()
        .send(message)
        .catch(async (error) => {
          if (error.code === "messaging/invalid-registration-token") {
            // The token is invalid, take appropriate action (e.g., remove it from your database)
            console.log("Invalid token:", registrationToken);
            removeFcmTokens(id);
          }
        });
    })
  );
};
const removeFcmTokens = async (documentId) => {
  const documentRef = db.collection("fcmTokens").doc(documentId);

  await documentRef.delete().catch((error) => {
    console.error("Error deleting document:", error);
  });
};
const getFcmTokens = async (uids) => {
  const collectionRef = db.collection("fcmTokens");
  const querySnapshot = await collectionRef.where("uid", "in", uids).get();
  if (querySnapshot.empty) return [];
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getMessageUnread = async (agoMillis) => {
  const currentTimeMillis = new Date().getTime();
  const timeAgoMillis = currentTimeMillis - agoMillis;

  const collectionRef = db.collection("messages");
  const querySnapshot = await collectionRef
    .where("createdAt", "<=", timeAgoMillis)
    .where("unRead", "==", true)
    .get();

  if (querySnapshot.empty) return [];

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

module.exports = {
  sendNotification,
};
