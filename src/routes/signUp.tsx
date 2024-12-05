import { useState } from 'react';
import { signUp } from "../../lib/firebase.ts";
import { Link, useNavigate } from 'react-router-dom';
import images from "../constants/logos.ts";

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
    <div className="w-screen h-screen bg-black overflow-x-hidden overflow-y-hidden">
      <header className="h-14 bg-black flex items-center px-4">
        <Link to="/" className="flex items-center">
          <img
            src={images.logo}
            alt="RouteDesigner logo"
            className="w-10 h-auto rounded-full"
          />
          <h1 className="text-white text-2xl font-bold px-2">RouteDesigner</h1>
        </Link>
      </header>
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
            Sign up
          </button>
        </form>
        <Link
          to="/signin"
          className="underline text-primary mt-2"
        >
          Already have an account? Sign in here!
        </Link>
      </div>
    </div>
  )
}

export default SignUp;