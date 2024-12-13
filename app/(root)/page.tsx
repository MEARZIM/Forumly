import Link from "next/link";
import { Home as HomeIcon } from "lucide-react";

import { getAuthSession } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import CustomFeed from "@/components/layouts/Home/CustomFeed";
import GeneralFeed from "@/components/layouts/Home/GeneralFeed";
import { Sidebar } from "@/components/layouts/Sidebar";

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
          <div className='bg-emerald-100 px-6 py-4'>
            <div className='font-semibold py-3 gap-1.5'>
              <div className="flex items-center gap-2">
                <HomeIcon className='h-5 w-4' />
                <span className="pt-1">
                  Home
                </span>
              </div>
            </div>
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-zinc-500'>
                Your personal Forumly frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              href={`/community/create`}>
              Create Community
            </Link>
          </dl>
        </div>
      </div>
    </>
  );
}
