import Link from "next/link";

import { getAuthSession } from "@/auth";
import CustomFeed from "@/components/layouts/Home/CustomFeed";
import GeneralFeed from "@/components/layouts/Home/GeneralFeed";
import { Sidebar } from "@/components/layouts/Sidebar";
import CreateCommunity from "@/components/layouts/CreateCommunity";

export default async function Home() {

  const session = await getAuthSession();

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl bg-inherit'>Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 md:gap-x-2 py-6">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-2">
          {session?.user ? <CustomFeed /> : <GeneralFeed />}
        </div>
        <div className='overflow-hidden col-span-1 h-fit rounded-lg border border-gray-200 order-first md:order-last'>

          <CreateCommunity />
        </div>
      </div>
    </>
  );
}
