"use client"

import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { startTransition } from 'react'
import { useMutation } from '@tanstack/react-query';

import { Button } from '../ui/button';
import { useLoginToast } from '@/hooks/use-login-toast';
import { SubscribeToSubForumPayload } from '@/validators';


interface SubscriberToggleButtonProps {
    subforumId: string;
    subforumName: string;
    isSubscribed: boolean;
}

const SubscriberToggleButton = ({
    subforumId,
    subforumName,
    isSubscribed
}: SubscriberToggleButtonProps) => {

    const router = useRouter();
    const { loginToast } = useLoginToast();

    const { mutate: subscribe, isPending: isSubscribedPending } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubForumPayload = {
                subforumId: subforumId
            }

            const { data } = await axios.post('/api/subforum/subscribe', payload);
            return data as string;
        },
        onError: (error: AxiosError) => {

            if (error.response?.status === 401) {
                return loginToast();
            }

            if (error.response?.status === 400) {
                return toast({
                    title: 'Subscription already exists.',
                    description: 'You already subscribed to this Subforum',
                    variant: 'destructive',
                });
            }

            if (error.response?.status === 422) {
                return toast({
                    title: 'Invalid subforum name.',
                    description: 'Please choose a name between 2 and 18 letters.',
                    variant: 'destructive',
                });
            }

            return toast({
                title: 'An error occurred.',
                description: 'Something went wrong. Please try again later.',
                variant: 'destructive',
            });

        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            })

            return toast({
                title: 'Subscribed',
                description: `You are now subscribed to r/${subforumName} Subforum.`
            })
        }
    })

    const { mutate: unSubscribe, isPending: isUnSubscribedPending } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubForumPayload = {
                subforumId: subforumId
            }

            const { data } = await axios.post('/api/subforum/unsubscribe', payload);
            return data as string;
        },
        onError: (error: AxiosError) => {

            if (error.response?.status === 400) {
                return toast({
                    title: 'Please Subscribe',
                    description: 'You are not subscribed.',
                    variant: 'destructive',
                });
            }

            if (error.response?.status === 401) {
                return loginToast();
            }

            if (error.response?.status === 402) {
                return toast({
                    title: 'Forum cannot deleted',
                    description: 'You can not unsubscribe this forum beacuse you created it.',
                    variant: 'destructive',
                });
            }

            if (error.response?.status === 422) {
                return toast({
                    title: 'Invalid subforum name.',
                    description: 'Please choose a name between 2 and 18 letters.',
                    variant: 'destructive',
                });
            }

            return toast({
                title: 'An error occurred.',
                description: 'Something went wrong. Please try again later.',
                variant: 'destructive',
            });

        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            })

            return toast({
                title: 'Canceled subscription',
                description: `You are now not subscribed to r/${subforumName} Subforum.`,
                variant: 'destructive',
            })
        }
    })

    return (
        <>
            {
                isSubscribed ?
                    (
                        <Button
                            disabled={isUnSubscribedPending}
                            onClick={() => unSubscribe()}
                            className='w-full mt1 mb-4 '
                        >
                            Leave Community
                        </Button>
                    )
                    :
                    (
                        <Button
                            disabled={isSubscribedPending}
                            onClick={() => subscribe()}
                            className='w-full mt1 mb-4 '
                        >
                            Join Community
                        </Button>
                    )
            }
        </>
    )
}

export default SubscriberToggleButton
