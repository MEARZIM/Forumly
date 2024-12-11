import React from 'react'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProfileTabs = () => {
    return (
        <>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
            </Tabs>
        </>
    )
}

export default ProfileTabs
