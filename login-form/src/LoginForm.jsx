import { useState } from 'react'
import './LoginForm.css';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);

  function revealPassword() {
    setShowPassword(showPassword ? false : true);
  }

  return (
    <>
      <div>
      <input 
        placeholder="Email" 
        className="form-input"/>
      </div>
      <div>
      <input 
        placeholder="Password" 
        type={
        showPassword
          ? 'password'
          : 'text'
        }
        className="form-input" />
      <button
        onClick={revealPassword}
      >{
        showPassword
          ? 'Show'
          : 'Hide'
        }</button>
    </div>
      <button className="form-button">Login</button>
      <button className="form-button">Sign up</button>
    </>
  );
}

export default LoginForm;