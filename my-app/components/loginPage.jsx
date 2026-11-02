'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const GoogleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-1.99 3.02v2.54h3.23c1.89-1.74 2.98-4.3 2.98-7.4Z" />
    <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.37l-3.23-2.54c-.9.6-2.04.96-3.38.96-2.6 0-4.81-1.76-5.6-4.13H3.07v2.62A10 10 0 0 0 12 22Z" />
    <path fill="#FBBC05" d="A6 6 0 0 1 11.2 7.05V4.43H3.07a10 10 0 0 0 0 8.99l3.33-2.62A6.02 6.02 0 0 1 12 7.05Z" />
    <path fill="#EA4335" d="M12 4.95c1.47 0 2.78.5 3.82 1.5l2.86-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.55l3.33 2.5A6.02 6.02 0 0 1 12 4.95Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5A12 12 0 0 0 8.2 23.88c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23A11.5 11.5 0 0 1 12 6c1.02 0 2.04.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.59c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

export default function LoginPage({ mode = 'login' }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData(event.currentTarget);
    try {
      if (isSignup) {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Unable to create account.');
        }
      }

      const result = await signIn('credentials', {
        email: data.get('email'),
        password: data.get('password'),
        redirect: false,
      });
      if (result?.error) throw new Error('Email or password is incorrect.');
      router.push('/');
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <Link href="/" className="brand" aria-label="Rivo home">
          <span className="brand-mark">R</span>
          <span>Rivo</span>
        </Link>
        <div className="auth-quote">
          <div className="quote-stars">★★★★★</div>
          <blockquote>“Rivo brings clarity to our work. Our team spends less time chasing updates and more time moving projects forward.”</blockquote>
          <div className="quote-author">
            <div className="author-avatar">AM</div>
            <div><strong>Alex Morgan</strong><span>Product Lead at Northstar</span></div>
          </div>
        </div>
        <div className="brand-orbit orbit-one" />
        <div className="brand-orbit orbit-two" />
      </section>

      <section className="auth-form-panel">
        <div className="auth-switch">
          {isSignup ? 'Already have an account?' : 'New to Rivo?'}
          <Link href={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create account'}</Link>
        </div>
        <div className="auth-card">
          <p className="auth-eyebrow">{isSignup ? 'GET STARTED' : 'WELCOME BACK'}</p>
          <h1>{isSignup ? 'Create your account' : 'Log in to Rivo'}</h1>
          <p className="auth-subtitle">{isSignup ? 'Start organizing your work in minutes.' : 'Enter your details to access your workspace.'}</p>

          <div className="social-buttons">
            <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}><GoogleIcon />Google</button>
            <button type="button" onClick={() => signIn('github', { callbackUrl: '/' })}><GitHubIcon />GitHub</button>
          </div>
          <div className="auth-divider"><span>or continue with email</span></div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label>Full name<input name="name" type="text" placeholder="Alex Morgan" autoComplete="name" required /></label>
            )}
            <label>Email address<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label>
            <label>
              <span><span>Password</span>{!isSignup && <Link href="/forgot-password">Forgot password?</Link>}</span>
              <input name="password" type="password" placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'} autoComplete={isSignup ? 'new-password' : 'current-password'} minLength={8} required />
            </label>
            {isSignup && (
              <label className="check-label"><input type="checkbox" required /><span>I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.</span></label>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-auth-button" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Log in'}
            </button>
          </form>
          <p className="auth-help">{isSignup ? 'By creating an account, you can start your free trial.' : 'Protected by enterprise-grade security.'}</p>
        </div>
      </section>
    </main>
  );
}