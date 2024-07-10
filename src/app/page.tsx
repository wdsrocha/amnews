import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import UserAvatar from "@/components/user-avatar";

export default async function Home() {
  const session = await auth();
  return (
    <main className="max-w-4xl mx-auto mt-20 p-4 bg-slate-700">
      <div className="flex items-center justify-between">
        <h1>AM News</h1>
        {session?.user ? (
          <div className="flex items-center gap-x-2">
            <UserAvatar />
            <span>|</span>
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </main>
  );
}
