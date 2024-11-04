import React, { useState } from 'react';
import { useAuth } from './auth-context'; // Import the useAuth hook

const AuthForm: React.FC = () => {
  const { login, signup, error } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);


  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoadingLogin(true);

    try {
      await login(username, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoadingSignUp(true);

    try {
      await signup(username, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSignUp(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Authenticate</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={handleLogin} disabled={loadingLogin}>
          {loadingLogin ? 'Logging in...' : 'Login'}
        </button>
        <button type="submit" onClick={handleSignup} disabled={loadingSignUp}>
          {loadingSignUp ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
