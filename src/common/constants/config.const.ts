export const Configs = {
  firebaseConfig: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  },
  pusherConfig: {
    appId: process.env.REACT_APP_PUSHER_APP_ID!,
    key: process.env.REACT_APP_PUSHER_APP_KEY!,
    secret: process.env.REACT_APP_PUSHER_APP_SECRET!,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER!,
  },
  application: {
    backendURL: process.env.REACT_APP_BASE_URL
  }
};
