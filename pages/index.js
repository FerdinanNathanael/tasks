import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert('Login failed: ' + error.message)
    } else {
      alert('Login successful!')
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Login - TaskMaster</title>
      </Head>
      <nav className="navbar">
        <div className="logo">TaskMaster</div>
        <div className="nav-links">
          <a href="/dashboard">home</a>
          <a href="#">tasks</a>
          <a href="/team">team</a>
          <a href="#">logout</a>
        </div>
      </nav>

      <div className="login-container">
        <img src="/assets/logo.png" alt="TaskMaster Logo" className="logo" />
        <h2>Login to TaskMaster</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>

      </div>
    </>
  )
}
