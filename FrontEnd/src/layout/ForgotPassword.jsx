import React from 'react'

export default function ForgotPassword() {
  return (
      <div className="relative z-10 bg-black bg-opacity-5 rounded-3xl shadow-3xl p-20 w-[500px] 
            top-20 mx-auto backdrop-blur-lg border border-black border-opacity-40">
            <h2 className="text-center text-3xl font-bold text-black mb-4">Forgot Password</h2>
            <form>
                <div className="mb-8 relative">
                    <input
                        className="w-full p-3 rounded-lg bg-black bg-opacity-20 text-black placeholder-black focus:outline-none 
                        focus:ring-2 focus:ring-purple-400"
                        type="email"
                        id="username"
                        placeholder="Email"
                    />
                </div>
                
                <div className="mb-2 text-right">
                        <button
                            type="button"
                            className="text-sm text-black-300 hover:text-black-100 transition"
                        >
                            <a href="\login">Login!!</a>
                        </button>
                    </div>
                <div>
                      <button
                    className="w-full py-5 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Forgot Password
                </button>
                </div>
            </form>
        </div>
  )
}
