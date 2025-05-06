import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)


        console.log('supabase:', supabase)
        console.log('supabase.auth:', supabase?.auth)

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            alert('Signup failed: ' + error.message)
        } else {
            alert('Signup successful! Check your email to confirm.')
            router.push('/')
        }

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Signup - TaskMaster</title>
            </Head>
            <nav className="navbar">
                <div className="logo">TaskMaster</div>
                <div className="nav-links">
                    <a href="/">login</a>
                </div>
            </nav>

            <div className="login-container">
                <h2>Create a TaskMaster Account</h2>
                <form onSubmit={handleSignup}>
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
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </form>
            </div>
        </>
    )
}
