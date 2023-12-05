import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import getCurrentUser from "@/utils/getCurrentUser";

import InfoBoard from "./_components/InfoBoard";
import PageHeader from "@/components/PageHeader";
import DataInsight from "./_components/DataInsight";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) return redirect("/");

  const user = await db.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });

  if (!user) return redirect("/");

  return (
    <div>
      <PageHeader
        header="Personal Data"
        subtext="insight into your personal needs"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DataInsight userData={user} />
        <InfoBoard />
      </div>
    </div>
  );
};

export default ProfilePage;
