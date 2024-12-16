"use client"

import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserFeed from '@/components/layouts/UserFeed'
import { useRouter } from 'next/navigation'

interface Props {
    slug: string
}

const ProfileTabs = ({
    slug
}: Props) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleTabChange = (tabName: string) => {
        setIsLoading(true);
        setActiveTab(tabName);

        setTimeout(() => setIsLoading(false), 3000);
    };

    useEffect(() => {
        router.refresh();
    }, [activeTab]);

    return (
        <>
            <Tabs
                defaultValue="overview"
                className="w-full"
                onValueChange={handleTabChange}
            >
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
                    <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="posts"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        Posts
                    </TabsTrigger>
                    <TabsTrigger
                        value="comments"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent px-4 py-2"
                    >
                        Comments
                    </TabsTrigger>
                </TabsList>

                {/* Tab Contents */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <TabsContent value="overview" className="mt-6 space-y-6">
                            <UserFeed
                                initialPosts={[]}
                                username={slug}
                                tabName="overview"
                            />
                        </TabsContent>
                        <TabsContent value="posts" className="mt-6">
                            <UserFeed
                                initialPosts={[]}
                                username={slug}
                                tabName="posts"
                            />
                        </TabsContent>
                        <TabsContent value="comments" className="mt-6">
                            <UserFeed
                                initialPosts={[]}
                                username={slug}
                                tabName="comments"
                            />
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </>
    )
}

export default ProfileTabs