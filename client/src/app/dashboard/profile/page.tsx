'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import auth from '../../../lib/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    (async () => {
      const t = await auth.getStoredToken();
      const u = await auth.getStoredUsername();
      setToken(t || '');
      setUsername(u || '');
    })();
  }, []);

  const handleLogout = async () => {
    await auth.clearAuth();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#edf6f9] p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <div className="space-y-2">
          <div>
            <h2 className="text-sm text-gray-500">Username</h2>
            <p className="text-lg font-medium">{username}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-500">Token</h2>
            <p className="text-xs text-gray-400 break-all">{token || 'Not signed in'}</p>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Link href="/dashboard" className="px-4 py-2 bg-[#e29578] text-white rounded">Back</Link>
          <button onClick={handleLogout} className="px-4 py-2 bg-[#006d77] text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  );
}
