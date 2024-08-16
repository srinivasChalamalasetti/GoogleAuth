import React,{useState, useEffect} from 'react'
import '../App.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'; 
import Home from './Home';


firebase.initializeApp({

  apiKey: "AIzaSyAxReFNNEDGKdJ0Qttiiz89u-VkYkifqvQ",
  authDomain: "userauth-1e249.firebaseapp.com",
  projectId: "userauth-1e249",
  storageBucket: "userauth-1e249.appspot.com",
  messagingSenderId: "852150886954",
  appId: "1:852150886954:web:ddba033396d63a8497d953",
  measurementId: "G-4BBRL2JESX"
})

const auth = firebase.auth(); 

export default function Auth() {

  const[user, setUser] = useState(null);  
  const[userProfile, setUserProfile] = useState({});

  useEffect(()=>{
    auth.onAuthStateChanged( user1 => {
      if(user1) 
      {
        setUser(user1); 
        setUserProfile({
            displayName : user1.displayName,
            email : user1.email,
            photoURL : user1.photoURL
        })
      } 
      else
      {
        setUser(null);
        setUserProfile({});
      }
    })
  },[])
  
  const signInWithGoogle = async() => {
    try {
      await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
    }
    catch(error) {
      console.log("Something went wrong...  ")
    }    
  }

  return (
    <div>
      <center> 
        {user ? <div>  
            <h1>UserDetails</h1>
            <img src={userProfile.photoURL} alt='image not found ' />
            <p>welcome, {userProfile.displayName}</p>
            <p>email id {userProfile.email}</p>
          <button onClick={() => auth.signOut()} className='btn'>Sign Out</button>
        </div> 
        :
        <button className='btn' onClick={signInWithGoogle}>Sign in with google</button> 
        }
      </center>
    </div>
  )
}
