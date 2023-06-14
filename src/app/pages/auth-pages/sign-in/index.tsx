import { useLogin } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import "./signIn.css";

export const SignInPage = () => {
  const { usernameRef, passwordRef, showError, loading, handleLogin } =
    useLogin();
  const navigaite = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleLogin();
    if (success) {
      // Login successful, perform desired actions
      console.log("success");
      navigaite("/", { replace: true });
    } else {
      // Login failed
      console.log("faild");
    }
  };
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        {showError && (
          <p className="error-message">
            Username and password are required. Password must be at least 8
            characters long and contain 1 uppercase, 1 lowercase, and 1 special
            character.
          </p>
        )}
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};
