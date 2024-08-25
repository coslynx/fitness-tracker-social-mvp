import { SessionProvider } from 'next-auth/react';
import { useStore } from '@/utils/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { session, user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session && !user) {
        try {
          const res = await fetch('/api/auth/session');
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error gracefully (e.g., display error message)
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session, user]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <div className="flex items-center justify-center h-screen">
      <p>Please log in to access the dashboard.</p>
      <button onClick={() => router.push('/login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log In</button>
    </div>;
  }

  return (
    <SessionProvider session={session}>
      <main className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-md">
          {/* Add header content here */}
        </header>
        <main className="container mx-auto py-6">
          {children}
        </main>
        <footer className="bg-gray-200 text-center py-4">
          {/* Add footer content here */}
        </footer>
      </main>
    </SessionProvider>
  );
};

export default Layout;