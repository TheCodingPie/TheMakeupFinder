import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyBK1x8StOfg8vi8cwJB7bd9bFGAE8sScd0",
    authDomain: "makeupfindersjp.firebaseapp.com",
    databaseURL: "https://makeupfindersjp.firebaseio.com",
    projectId: "makeupfindersjp",
    storageBucket: "makeupfindersjp.appspot.com",
    messagingSenderId: "577343992660",
    appId: "1:577343992660:web:e27cc48a32db6b83aa8ec1",
    measurementId: "G-1WECQWVY1R"
  };
 
  firebase.initializeApp(firebaseConfig);
  

  export default firebase