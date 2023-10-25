import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { ReactComponent as GoogleIcon } from "../assets/svg/googleIcon.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      //Check for user
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      //If user doesnt exist, create user
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could not sign in with Google");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "sign-up" ? "Up" : "In"} with</p>
      <button className="socialIconDiv" onClick={signInGoogle}>
        <GoogleIcon className="socialIconImg" />
      </button>
    </div>
  );
}

export default OAuth;
