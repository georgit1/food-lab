'use client';

import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
      <div>Browse Page</div>
    </div>
  );
}
