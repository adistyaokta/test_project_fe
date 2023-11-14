import React from 'react'
import InputField from './InputField'

const RegisterForm = () => {
  return (
    <section className="bg-[#faf7f5] h-full flex items-center justify-center px-5 py-4">
      <div className="border border-primary w-full rounded-lg shadow sm:max-w-lg">
        <div className="p-6 space-y-4 md:space-y-6">
          <form className="space-y-4 md:space-y-6" action="#">
            <p className="text-xl text-center text-black py-2">Register</p>
            <div>
              <InputField
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <InputField
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <InputField
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <InputField
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <InputField
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div>
              <div className="flex items-center mb-8">
                <input className="hidden" id="file_input" type="file"/>
                <label
                  htmlFor="file_input"
                  className="block w-full text-right text-sm font-semibold uppercase py-4 px-3 rounded-full text-[#65c3c8] border border-gray-300 cursor-pointer bg-[#faf7f5] flex-grow hover:bg-[#65c3c8] hover:text-white"
                >
                  Browse
                </label>
              </div>

              <div className="border rounded-md overflow-hidden w-36 h-36 border-gray-300 flex justify-center mb-8">
                <img src="/assets/images/img-placeholder.svg" alt="" />
              </div>
            </div>

            <div className="text-center flex flex-col gap-2">
              <button
                type="submit"
                className="bg-[#65c3c8] text-sm text-gray-900 rounded-full uppercase font-semibold py-3 hover:bg-[#61b9bd]"
              >
                Register
              </button>
              <a
                href="/login"
                className="text-[#65c3c8] text-sm hover:underline-offset-1 hover:underline"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegisterForm