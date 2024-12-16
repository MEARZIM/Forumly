import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthSession } from '@/auth';
import { db } from '@/lib/db';

interface Props {
    username: string;
}

const ProfileModeratorCard = async ({ username }: Props) => {
    const session = await getAuthSession();

    const subforums = await db.subforum.findMany({
        where: {
            Creator: {
                username,
            },
        },
        include: {
            Subscription: true,
        },
    });

    const subforumsWithMemberCount = subforums.map((subforum) => ({
        ...subforum,
        memberCount: subforum.Subscription.length,
    }));

    return (
        <>
            {username === session?.user.username ? (
                <Card>
                    <CardContent className="p-4">
                        <p className="font-semibold text-base mb-4">YOUR COMMUNITIES</p>
                        <div className="space-y-4">
                            {subforumsWithMemberCount.map((subforum) => (
                                <div key={subforum.id} className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <p className="font-medium text-base">r/{subforum.name}</p>
                                        <p className="text-xs text-muted-foreground">{subforum.memberCount} members</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-4">
                        <p className="font-semibold text-base mb-4">MODERATOR OF THESE COMMUNITIES</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback className="text-sm">R</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="font-medium">r/RanbirKapoor</p>
                                    <p className="text-xs text-muted-foreground">48K members</p>
                                </div>
                                <Button size={"sm"}>Join</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default ProfileModeratorCard;
