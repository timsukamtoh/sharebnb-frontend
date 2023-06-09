import React from "react";
import LoginForm from "./LoginForm";

/** Login renders the page for /login
 *
 * Prop:
 * - login: func from parent, called when user logs in
 *
 * RouteList -> LoginPage -> LoginForm
 */

function LoginPage({login}) {

  return (
    <div className="Login m-2">
      <h2>Login</h2>
      <LoginForm onSubmit={login}/>
    </div>
  );
}

export default LoginPage;