import { createUploadthing, type FileRouter } from "uploadthing/next";

import getCurrentUser from "@/utils/getCurrentUser";

const f = createUploadthing();

const handleAuth = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;

  if (!userId || !currentUser.email) throw new Error("Unauthorized");
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  foodImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
