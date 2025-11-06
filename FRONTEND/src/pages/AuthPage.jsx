

import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {

    const [login, setLogin] = useState(true)

    return (
        <div className="min-h-screen w-full flex items-center justify-center 
            bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400
            p-6">

            <div className="max-w-5xl w-full bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl 
                p-6 flex flex-col md:flex-row items-center gap-10 border border-white/30">
                
                {/* LEFT IMAGE SECTION */}
                <div className="hidden md:flex w-1/2 h-full justify-center">
                    <img 
                        src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=900&q=60"
                        alt="auth-banner"
                        className="rounded-xl shadow-xl w-full h-[420px] object-cover border border-white/40"
                    />
                </div>

                {/* RIGHT AUTH FORM SECTION */}
                <div className="w-full md:w-1/2 bg-white/30 rounded-2xl p-6 shadow-xl backdrop-blur-md
                    border border-white/40 animate-fadeIn">
                    {login ? (
                        <LoginForm state={setLogin} />
                    ) : (
                        <RegisterForm state={setLogin} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthPage
