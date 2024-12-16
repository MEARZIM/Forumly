import React from "react";
import { notFound } from "next/navigation";

import ProfileHeader from "./components/Profile-Header";
import ProfileTabs from "./components/Profile-Tabs";

const SingleUserPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const slug = (await params).slug;

    if (!slug) {
        return notFound();
    }


    return (
        <div className="lg:col-span-2 mx-2 space-y-6">
            {/* Profile Header */}
            <ProfileHeader userData={slug} />

            {/* Navigation Tabs */}
            <ProfileTabs slug={slug} />
        </div>
    );
};

export default SingleUserPage;
