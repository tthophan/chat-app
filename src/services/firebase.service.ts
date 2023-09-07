import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QueryStartAtConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { Configs } from "../common/constants";
import { Collection } from "../common/constants/collection.const";

// Initialize Firebase
export const app = initializeApp(Configs.firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export const getDocumentbyCondition = async <T>(
  collectionName: string,
  conditions: Array<QueryFieldFilterConstraint>
) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...conditions);
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const documentSnapshot = querySnapshot.docs[0];
    const documentData = documentSnapshot.data();
    return {
      ...documentData,
      id: documentSnapshot.id,
    } as T;
  } else {
    return null;
  }
};

export const getDocumentById = async <T>(
  collectionName: string,
  id: string
) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    } as T;
  }
  return null;
};

export const insertDocument = async <T>(collectionName: string, data: any) => {
  const rs = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date().getTime(),
  }).catch((error: any) => {
    toast(error.message, {
      type: "error",
    });
  });
  if (!rs) return null;
  return await getDocumentById<T>(collectionName, rs.id);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  return await deleteDoc(doc(db, collectionName, id)).catch((error: any) => {
    toast(error.message, {
      type: "error",
    });
  });
};

export const loginByEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password).catch(
    (error: any) => {
      toast(error.message, {
        type: "error",
      });
    }
  );
};

export const signupByEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password).catch(
    (error: any) => {
      toast(error.message, {
        type: "error",
      });
    }
  );
};

export const readMessage = async (messageId: string) => {
  await updateDoc(doc(db, Collection.messages, messageId), {
    unRead: false,
  }).catch((error: any) => {
    toast(error.message, {
      type: "error",
    });
  });
};

// Get the registration token
export const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY,
    });
    if (currentToken) return currentToken;
  }
  return null;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const getDocuments = async <T>(
  collectionName: string,
  conditions: Array<
    | QueryFieldFilterConstraint
    | QueryLimitConstraint
    | QueryOrderByConstraint
    | QueryStartAtConstraint
  >
): Promise<Array<T>> => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...conditions);
  const querySnapshot = await getDocs(q).catch((e) => {
    console.log("Query exception", e);
  });
  if (querySnapshot && !querySnapshot.empty) {
    return querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as T)
    );
  } else {
    return [];
  }
};
