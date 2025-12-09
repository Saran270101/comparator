import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const illustration = process.env.PUBLIC_URL + '/e-commerce.jpg';

const containerStyle = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'Inter, Arial, sans-serif',
  background: '#fff'
};

const leftStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
};

const rightStyle = {
  flex: 1,
  background: '#FFF4EE',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  borderRadius: 20,
  background: '#fff',
  boxShadow: '0 8px 32px rgba(77,72,72,0.09)',
  padding: '48px 40px 44px 40px',
  width: 390,
  maxWidth: '92vw',
};

const logoStyle = {
  fontSize: '1.32rem',
  fontWeight: 700,
  color: '#FF7043',
  marginBottom: 12,
};

const welcomeStyle = {
  color: '#888',
  fontSize: 15,
  marginBottom: 5,
  marginTop: 5,
};

const titleStyle = {
  fontWeight: 800,
  fontSize: '2.25rem',
  marginBottom: 20,
  marginTop: 5,
  color: '#181818',
  letterSpacing: 1,
};

const inputBoxStyle = {
  width: '90%',
  borderRadius: 8,
  padding: '15px 16px',
  fontSize: '1rem',
  background: '#FFF1EB',
  outline: 'none',
  border: 'none',
  margin: '10px 0',
  color: '#333',
};

const labelStyle = {
  fontWeight: 500,
  color: '#444',
  fontSize: 16,
  marginBottom: 3,
  marginTop: 10,
};

const forgotStyle = {
  float: 'right',
  fontSize: 14,
  color: '#FF7043',
  textDecoration: 'none',
  fontWeight: 500,
  cursor: 'pointer'
};

const buttonStyle = {
  marginTop: 18,
  width: '100%',
  background: '#FF7043',
  color: '#fff',
  border: 'none',
  padding: '13px',
  borderRadius: 9,
  fontSize: '1.09rem',
  fontWeight: 700,
  letterSpacing: '0.5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const footerText = {
  marginTop: 24,
  fontSize: 15,
  color: '#aaa',
  textAlign: 'center'
};

const linkStyle = {
  color: '#FF7043',
  fontWeight: 600,
  textDecoration: 'none',
  marginLeft: 5,
  cursor: 'pointer'
};

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(true);

  function SignIn({ onSwitch }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      try {
        const res = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            setSuccessMsg('Login successful!');
            localStorage.setItem('jwt_token', data.token);
            setTimeout(() => navigate('/'), 500);
          } else {
            setErrorMsg('Login failed: Token missing');
          }
        } else {
          let errorText = 'Invalid credentials';
          try {
            const errData = await res.json();
            if (errData.message) errorText = errData.message;
          } catch {
            // keep default
          }
          setErrorMsg(errorText);
        }
      } catch {
        setErrorMsg('Could not connect to backend');
      }
      setLoading(false);
    };

    return (
      <form style={cardStyle} onSubmit={handleSubmit}>
        <div style={logoStyle}>Logo Here</div>
        <div style={welcomeStyle}>Welcome back !!!</div>
        <div style={titleStyle}>Sign in</div>

        <div>
          <div style={labelStyle}>Email</div>
          <input
            style={inputBoxStyle}
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={labelStyle}>Password</span>
            <span style={forgotStyle}>Forgot Password?</span>
          </div>
          <input
            style={inputBoxStyle}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? "Signing in..." : <>SIGN IN <span style={{ marginLeft: 7, fontSize: '1.35rem' }}>&rarr;</span></>}
        </button>
        {errorMsg && <div style={{ color: '#ff3333', marginTop: 10 }}>{errorMsg}</div>}
        {successMsg && <div style={{ color: '#06b06c', marginTop: 10 }}>{successMsg}</div>}
        <div style={footerText}>
          I don't have an account?
          <span style={linkStyle} onClick={onSwitch}>Sign up</span>
        </div>
      </form>
    );
  }

  function SignUp({ onSwitch }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      try {
        const res = await fetch('http://localhost:8080/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          setSuccessMsg('Registration successful! Please sign in.');
        } else {
          const data = await res.text();
          setErrorMsg(data || 'Registration failed');
        }
      } catch {
        setErrorMsg('Could not connect to backend');
      }
      setLoading(false);
    };

    return (
      <form style={cardStyle} onSubmit={handleSubmit}>
        <div style={logoStyle}>Logo Here</div>
        <div style={welcomeStyle}>Welcome to our store!</div>
        <div style={titleStyle}>Sign up</div>

        <div>
          <div style={labelStyle}>Name</div>
          <input
            style={inputBoxStyle}
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <div style={labelStyle}>Email</div>
          <input
            style={inputBoxStyle}
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <div style={labelStyle}>Phone</div>
          <input
            style={inputBoxStyle}
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <div style={labelStyle}>Password</div>
          <input
            style={inputBoxStyle}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            minLength={6}
            required
          />
        </div>

        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? "Signing up..." : <>SIGN UP <span style={{ marginLeft: 7, fontSize: '1.35rem' }}>&rarr;</span></>}
        </button>
        {errorMsg && <div style={{ color: '#ff3333', marginTop: 10 }}>{errorMsg}</div>}
        {successMsg && <div style={{ color: '#06b06c', marginTop: 10 }}>{successMsg}</div>}
        <div style={footerText}>
          Already have an account?
          <span style={linkStyle} onClick={onSwitch}>Sign in</span>
        </div>
      </form>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        {showSignIn
          ? <SignIn onSwitch={() => setShowSignIn(false)} />
          : <SignUp onSwitch={() => setShowSignIn(true)} />}
      </div>
      <div style={rightStyle}>
        <img
          src={illustration}
          alt="E-commerce Illustration"
          style={{
            width: '70%',
            maxWidth: 440,
            minWidth: 180,
            borderRadius: 20,
            background: '#fff',
            boxShadow: '0 2px 18px rgba(255,112,67,0.11)',
          }}
        />
      </div>
    </div>
  );
}
