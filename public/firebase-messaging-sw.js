importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyA1-bN1CN5gL2XFmAZEBHqNDmI6CbD_aSk",
  authDomain: "chat-app-dd38c.firebaseapp.com",
  projectId: "chat-app-dd38c",
  storageBucket: "chat-app-dd38c.appspot.com",
  messagingSenderId: "141381046940",
  appId: "1:141381046940:web:d5f4b350b3704ce8f39359",
  measurementId: "G-NGKQP7W737",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
