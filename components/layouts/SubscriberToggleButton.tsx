import React from 'react'
import { Button } from '../ui/button';

interface SubscriberToggleButtonProps {

}

const SubscriberToggleButton = ({

}: SubscriberToggleButtonProps) => {
    const isSubscriber = false;
    return (
        <>
            {
                isSubscriber ?
                    (
                        <Button className='w-full mt1 mb-4 ' >
                            Leave Community
                        </Button>
                    )
                    :
                    (
                        <Button className='w-full mt1 mb-4 ' >
                            Join Community
                        </Button>
                    )
            }
        </>
    )
}

export default SubscriberToggleButton
