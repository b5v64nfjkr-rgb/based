import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    setMessage(error ? error.message : 'Logged in!');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <div>{message}</div>
    </form>
  );
}

export default Login;
