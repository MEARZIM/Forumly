'use client'

import * as z from 'zod'
import * as React from 'react'
import { User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { UsernameValidator } from '@/validators'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, 'id' | 'username'>
}

type FormData = z.infer<typeof UsernameValidator>

const UserForm = ({
    user,
    className,
    ...props
}: UserNameFormProps) => {

    const router = useRouter()
    const form = useForm<FormData>({
        resolver: zodResolver(UsernameValidator),
        defaultValues: {
            name: user?.username || '',
        },
    })

    const { mutate: updateUsername, isPending } = useMutation({
        mutationFn: async ({ name }: FormData) => {
            const payload: FormData = { name }

            const { data } = await axios.patch('/api/settings/username', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: 'Username already taken.',
                        description: 'Please choose another username.',
                        variant: 'destructive',
                    })
                }
            }

            return toast({
                title: 'Something went wrong.',
                description: 'Your username was not updated. Please try again.',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            toast({
                description: 'Your username has been updated.',
            })
            router.refresh()
        },
    })

    return (
        <Form {...form}>
            <form
                className={cn(className)}
                onSubmit={form.handleSubmit((e) => updateUsername(e))}
                {...props}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Your username</CardTitle>
                        <CardDescription>
                            Please enter a display name you are comfortable with.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">Name</FormLabel>
                                    <FormControl>
                                        <div className="relative grid gap-1">
                                            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
                                                <span className="text-sm mb-1 text-zinc-400">u/</span>
                                            </div>
                                            <Input
                                                id="name"
                                                className="w-[400px] pl-6"
                                                size={32}
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant={"destructive"}
                            size={"default"}
                            disabled={isPending}
                        >
                            Change name
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default UserForm
