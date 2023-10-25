import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const sendPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent!");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
        <main>
          <form onSubmit={sendPasswordReset}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="emailInput"
              value={email}
              onChange={onChange}
            />
            <Link className="forgotPasswordLink" to="/sign-in">
              Sign In
            </Link>

            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
              <button
                type="submit"
                className="signInButton"
                onSubmit={sendPasswordReset}
              >
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>
      </header>
    </div>
  );
}

export default ForgotPassword;
