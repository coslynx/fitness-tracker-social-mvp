import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/utils/store';
import Button from '@/components/Button';

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useStore();
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn('credentials', {
        email,
        password,
      });
      setUser(session?.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error gracefully (e.g., display error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-96 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <Button type="submit" variant="primary" fullWidth>
              Log In
            </Button>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <span className="underline cursor-pointer">Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;