import { useState } from 'react';
import { signIn } from '../../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    const signedIn = signIn(email, password);

    if (signedIn != null) {
      console.log("signed in")
      navigate('/');
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
          <button
            type="submit"
            className="w-full rounded-lg justify-center items-center px-2 py-1 mt-2 bg-primary text-white text-lg font-semibold">
            Sign in
          </button>
        </form>
        <Link
          to="/signup"
          className="underline text-primary mt-2"
        >
          Don't have an account? Sign up here!
        </Link>
      </div>
    </div>
  )
}

export default SignIn;