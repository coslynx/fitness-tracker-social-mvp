import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/utils/store";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const { user, setUser } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Fitness Tracker"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold">Fitness Tracker</h1>
        </Link>

        <nav className="flex items-center gap-4">
          {session && (
            <>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative"
              >
                <span className="text-gray-700">{user?.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
          {!session && (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;