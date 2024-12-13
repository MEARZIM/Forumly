'use client';

import Link from "next/link";
import { Suspense } from "react";
import { Subforum } from "@prisma/client";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Rocket } from 'lucide-react';

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSidebar } from "@/hooks/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton"
import { Button, buttonVariants } from "@/components/ui/button";



interface Props {
    resentSubForum?: Subforum[];
    communitySubForum?: Subforum[];
}


const RecentSubforums = ({ resentSubForum }: { resentSubForum: Subforum[] }) => (
    <div>
        {resentSubForum.map((forum) => (
            <Link
                key={forum.id}
                href={`/community/${forum.name}`}
                className={cn(
                    buttonVariants({
                        variant: "sidebarButton",
                    }),
                    "w-full justify-start",
                )}
            >
                r/{forum.name}
            </Link>
        ))}
    </div>
);

const CommunitySubforums = ({ communitySubForum }: { communitySubForum: Subforum[] }) => (
    <CollapsibleContent className="space-y-1">
        {communitySubForum.map((forum) => (
            <Link
                key={forum.id}
                href={`/community/${forum.name}`}
                className={cn(
                    buttonVariants({
                        variant: "sidebarButton",
                    }),
                    "w-full justify-start",
                )}
            >
                {forum.name}
            </Link>
        ))}
    </CollapsibleContent>
);

export const Sidebar = ({ resentSubForum, communitySubForum }: Props) => {
    const url = usePathname();
    const sidebar = useSidebar();
    

    return (
        <div>
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-inherit dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ${sidebar.isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:static`}
            >
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                        <div className="space-y-1">
                            <Link
                                href="/"
                                className={cn(
                                    buttonVariants({
                                        variant: "sidebarButton",
                                    }),
                                    "w-full justify-start",
                                    url === '/' ? `bg-white text-black` : ``
                                )}
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </Link>
                            <Link
                                href="/popular"
                                className={cn(
                                    buttonVariants({
                                        variant: "sidebarButton",
                                    }),
                                    "w-full justify-start",
                                    url === '/popular' ? `bg-white text-black` : ``
                                )}
                            >
                                <Rocket className="mr-2 h-4 w-4" />
                                Popular
                            </Link>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="mb-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                Recent
                            </h3>
                            <Suspense fallback={<Skeleton className="h-6 w-[60px]" />}>
                                {resentSubForum && <RecentSubforums resentSubForum={resentSubForum} />}
                            </Suspense>
                        </div>

                        <Separator />

                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="sidebarButton" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            TOPICS
                                        </span>
                                    </span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <Suspense fallback={<Skeleton className="h-6 w-[60px]" />}>
                                {communitySubForum && <CommunitySubforums communitySubForum={communitySubForum} />}
                            </Suspense>
                        </Collapsible>

                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="sidebarButton" className="w-full justify-between">
                                    <span className="flex items-center">
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            RESOURSE
                                        </span>
                                    </span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <Link
                                    href="/about"
                                    className={cn(
                                        buttonVariants({
                                            variant: "sidebarButton",
                                        }),
                                        "w-full justify-start pl-6",

                                    )}
                                >
                                    About Forumly
                                </Link>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </ScrollArea>
            </aside>

            {sidebar.isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={sidebar.onClose}
                ></div>
            )}
        </div>
    );
};
