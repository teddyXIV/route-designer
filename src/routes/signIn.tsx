import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == confirmPassword) {
      console.log("Email:", email, "Password:", password);
    }
  };

  return (
    <div className="w-screen h-screen bg-black">
      <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-primary text-4xl font-bold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="flex flex-col">
              Email:
              <input
                className="rounded-lg mb-2 p-1 text-black"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              Password:
              <input
                className="rounded-lg mb-2 p-1 text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              Confirm password:
              <input
                className="rounded-lg mb-2 p-1 text-black"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg justify-center items-center px-2 py-1 bg-primary text-white text-lg font-semibold">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn;