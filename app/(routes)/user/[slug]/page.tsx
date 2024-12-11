'use client'

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "./components/Profile-Header";
import ProfileTabs from "./components/Profile-Tabs";
import ProfileModeratorCard from "./components/Profile-Moderator-Card";
import ProfileStatsCard from "./components/Profile-Stats-Card";
import Leftsidebar from "./components/Left-Sidebar";


const SingleUserPage = async ({

    params,
}: {
    params: {
        slug: string;
    };
}) => {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
    const { slug } = await params;

    if (!slug) {
        return <div>Error: User not found</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">

                {/* Search Bar */}
                {/* <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full lg:w-1/2 mx-auto p-2 border rounded-md"
                    />
                </div> */}

                {/* <SearchBar /> */}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="space-y-6 lg:col-span-1">
                        <Leftsidebar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Header */}
                        <ProfileHeader userData={slug} />

                        {/* Navigation Tabs */}
                        <ProfileTabs />

                        {/* Feature Posts */}
                        <div className="space-y-4">
                            {/* Example Post */}
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Posted by u/Rast987 • 12 min. ago
                                    </p>
                                    <h2 className="text-lg font-semibold mb-2">
                                        Alia's Post after meeting the PM
                                    </h2>
                                    <p>Idts. She was chatting and laughing with them yesterday</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <ProfileStatsCard />
                        <ProfileModeratorCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleUserPage;
