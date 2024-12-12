import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import ProfileHeader from "./components/Profile-Header";
import ProfileTabs from "./components/Profile-Tabs";
import ProfileModeratorCard from "./components/Profile-Moderator-Card";
import ProfileStatsCard from "./components/Profile-Stats-Card";
import Leftsidebar from "./components/Left-Sidebar";
import { notFound } from "next/navigation";

const SingleUserPage = async ({
    params 
}: {
        params: Promise<{ slug: string }>
}) => {
    
    const slug = (await params).slug

    if (!slug) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="space-y-2 lg:col-span-1">
                        <Leftsidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 mx-2 space-y-6">
                        {/* Profile Header */}
                        <ProfileHeader userData={slug} />

                        {/* Navigation Tabs */}
                        <ProfileTabs />

                        {/* Feature Posts */}
                        <div className="space-y-4 ">
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
