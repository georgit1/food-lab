import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

import getCurrentUser from '@/lib/getCurrentUser';
import InfoBoard from './_components/InfoBoard';
import PageHeader from '@/components/PageHeader';
import DataInsight from './_components/DataInsight';

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return redirect('/');

  const user = await db.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });

  if (!user) return redirect('/');

  return (
    <div>
      <PageHeader
        header='Personal Data'
        subtext='full insight into your personal values'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
        <DataInsight userData={user} />
        <InfoBoard />
      </div>
    </div>
  );
};

export default ProfilePage;
