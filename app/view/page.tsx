import TournamentList from "@/components/tournament-listview";
import { authOptions } from "@/lib/auth";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Tournaments() {
  const session = await getServerSession(authOptions);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-4xl font-medium leading-6 text-gray-900">
            Welcome {session?.user.name}
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

        </div>
      </div>
      <TournamentList />
    </div>
  );
}
