
import { getAuthSession } from "@/auth";
import CustomFeed from "@/components/layouts/Home/CustomFeed";
import GeneralFeed from "@/components/layouts/Home/GeneralFeed";
import { Sidebar } from "@/components/layouts/Sidebar";
import CreateCommunity from "@/components/layouts/CreateCommunity";
import { db } from "@/lib/db";

export default async function Home() {

  const session = await getAuthSession();
  const resentSubForum = await db.subforum.findMany({
    take: 2,
    orderBy: {
      createdAt: 'desc',
    }
  });

  const communitySubForum = await db.subforum.findMany({
    take: 6,
    orderBy: {
      createdAt: 'asc',
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 md:gap-x-2 py-6">
        <div className="col-span-1">
          <Sidebar
            resentSubForum={resentSubForum}
            communitySubForum={communitySubForum}
          />
        </div>
        <div className="col-span-2">
          <h1 className='font-bold text-3xl md:text-4xl bg-inherit py-6'>Your feed</h1>
          {session?.user ? <CustomFeed /> : <GeneralFeed />}
        </div>
        <div className='overflow-hidden col-span-1 h-fit rounded-lg border border-gray-200 order-first md:order-last'>

          <CreateCommunity />
        </div>
      </div>
    </>
  );
}
