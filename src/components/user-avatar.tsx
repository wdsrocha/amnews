import { auth } from "@/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      <Image
        src={session.user.image!}
        alt={session.user.name!}
        width={32}
        height={32}
        className="rounded-full"
      />
      <span>{session.user.name}</span>
    </div>
  );
}
