import { useState } from 'react';
import { signUp } from "../../lib/firebase.ts";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == confirmPassword) {
      const signedUp = signUp(email, password);
      console.log(signedUp);

      if (signedUp != null) {
        navigate('/');
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-black">
      <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-primary text-4xl font-bold mb-4">Sign up</h1>
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
            className="w-full rounded-lg justify-center items-center px-2 py-1 mt-2 bg-primary text-white text-lg font-semibold">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;