import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

const ProfileStatsCard = () => {
    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="font-bold">38,903</p>
                            <p className="text-sm text-muted-foreground">Post karma</p>
                        </div>
                        <div>
                            <p className="font-bold">26,401</p>
                            <p className="text-sm text-muted-foreground">Comment karma</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileStatsCard
