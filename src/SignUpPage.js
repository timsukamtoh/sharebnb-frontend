import React from "react";
import SignUpForm from "./SignUpForm";

/** SignUp renders the page for /signup
 *
 * Prop
 * - signup: func from parent, passed to SignUpForm
 *
 * JoblyRoutes => SignUp => SignUpForm
 */

function SignUpPage({signup}) {
  return (
    <div className="SignUpPage m-2">
      <h2>Sign up</h2>
      <SignUpForm onSubmit={signup}/>
    </div>
  );
}

export default SignUpPage;