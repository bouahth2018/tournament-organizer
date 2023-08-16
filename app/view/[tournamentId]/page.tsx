import GeneralSettings from "@/components/general-settings";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
async function getTournament(id: string, userId: string) {
  return await prisma.tournament.findFirst({
    where: {
      id: id,
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      full_name: true,
      discipline: {
        select: { name: true },
      },
      platforms: true,
      organization: true,
      website: true,
      size: true,
      // logo: true,
      online: true,
      location: true,
      country: true,
      scheduled_date_start: true,
      scheduled_date_end: true,
      timezone: true,
      description: true,
      prize: true,
      rules: true,
      contact: true,
      discord: true,
    },
  });
}

interface Params {
  params: {
    tournamentId: string;
    name: string;
  };
}

export default async function EditGeneralSettings({ params }: Params) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const tournament = await getTournament(params.tournamentId, user.id);

  if (!tournament) {
    // notFound()
  }
  console.log(tournament);
  //return <GeneralSettings tournament={tournament} />;
  return (


    <div className="px-4 sm:px-6 lg:px-8">
      <Link href={`/view`}>
    <button className="text-sm mb-4 hover:text-[#333]">
      <span aria-hidden="true">&larr;</span> Back
    </button>
  </Link>
  <div className="relative h-80">
    <div className="absolute inset-0">
      <img
        className="object-cover h-full w-full"
        src={`/Image/6505.jpg`}
        alt="Tournament Cover"
      />
    </div>
    {/* Tournament Name */}
    <h1 className="text-3xl font-medium text-black absolute bottom-1 left-0 ml-4 mb-4">
      {tournament?.name}
    </h1>
    {/* Discipline Area */}
    <p className="text-lg text-black absolute bottom-0 left-0 ml-4 mb-2">
    Valorant
    </p>
  </div>
  <div className="-mx-4 mt-8 ring-1 ring-gray-300 sm:mx-0 rounded bg-white">
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:divide-x mt-6">
      {/* Content for the left side */}
      <div className="px-4 py-6">
        {/* Left side content */}
      </div>
    
      {/* Content for the right side */}
      <div className="px-4 py-6">
        {/* Right side content */}
      </div>
    </div>
  </div>
      <div className="-mx-4 mt-8 ring-1 ring-gray-300 sm:mx-0 rounded bg-white">

        <div className="grid grid-cols-1 xl:grid-cols-2 xl:divide-x mt-6">

          <div className="xl:pr-6">
            <h1 className="py-3.5 px-6 text-left text-2xl font-medium">ເງິນລາງວັນລວມ : {tournament?.prize}</h1>
            <br />
            <br />
            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                ຄຳອະທິບາຍ
              </div>
              <div className="text-1xl">
                {tournament?.description}
              </div>
            </div>
            <br />
            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                ມື້ເປີດຮັບສະໝັກ
              </div>
              <div className="text-1xl">
                {tournament?.scheduled_date_start} - {tournament?.scheduled_date_end}
              </div>
            </div>
            <br />
            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                ຈຳນວນຮັບສະໝັກ
              </div>
              <div className="text-1xl">
                {tournament?.size}
              </div>
            </div>
            <br />
            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                ສະຖານທີ່ແຂ່ງຂັນ
              </div>
              <div className="text-1xl">
                {tournament?.location}
              </div>
            </div>
          </div>

          <div className="mt-4 xl:-mt-2 xl:pl-6 space-y-4">
            <div className="mt-4 mr-10 py-3.5 px-6 text-right text-2xl">
              <Link href={`/view/${params.tournamentId}/register`}>
                <button className="rounded bg-[#111] px-5 py-2 text-sm text-white shadow-sm hover:bg-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Rigister Tournament</button>
              </Link>
            </div>
            <br />

            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">ກົດການແຂ່ງຂັນ</div>
              <div className="max-h-40 overflow-auto">
                <pre className="text-1xl">{tournament?.rules}</pre>
              </div>
            </div>

            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                ຊ່ອງທາງການຕິດຕໍ່
              </div>
              <div className="text-1xl">
                {tournament?.contact}
              </div>
            </div>

            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                Discord:
              </div>
              <div className="text-1xl">
                <a href={`https://discord.com/invite/${tournament?.discord}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                  {tournament?.discord}
                </a>
              </div>
            </div>

            <div className="py-3.5 px-6 text-left">
              <div className="text-2xl">
                ຜູ້ຈັດການແຂ່ງຂັນ
              </div>
              <div className="text-1xl">
                {tournament?.organization}
              </div>
            </div>
          </div>

        </div>

        <br /><br /><br />

      </div>
    </div>
  );

}