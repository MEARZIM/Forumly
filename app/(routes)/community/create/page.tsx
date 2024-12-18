'use client'

import axios, { AxiosError } from 'axios'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from '@/hooks/use-toast'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useLoginToast } from '@/hooks/use-login-toast'
import { CreateSubForumPayload, SubforumValidatorSchema } from '@/validators'

const CreateACommunityPage = () => {
  const router = useRouter();
  const { loginToast } = useLoginToast();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const form = useForm<CreateSubForumPayload>({
    resolver: zodResolver(SubforumValidatorSchema),
    defaultValues: {
      name: "",
    },
  });

  // Mutation setup
  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: async (values: CreateSubForumPayload) => {
      const { data } = await axios.post('/api/community/create', values);
      return data as string;
    },
    onError: (error: AxiosError) => {
      // Subforum already exists.
      if (error.response?.status === 409) {
        return toast({
          title: 'Subforum already exists.',
          description: 'Please choose a different name.',
          variant: 'destructive',
        });
      }

      // Invalid subforum name.
      if (error.response?.status === 422) {
        return toast({
          title: 'Invalid subforum name.',
          description: 'Please choose a name between 2 and 18 letters.',
          variant: 'destructive',
        });
      }

      // If user is not authenticated
      if (error.response?.status === 401) {
        return loginToast();
      }

      // Handle other errors
      return toast({
        title: 'An error occurred.',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });

    },

    onSuccess: (data) => {
      toast({
        title: 'Community created!',
        description: 'Your new community has been successfully created.',
        variant: 'default',
      });
      router.push(`/community/${data}`);
    },
  });

  const onSubmit = (values: CreateSubForumPayload) => {
    createCommunity(values);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community name</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <div className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
                        f/
                      </div>
                      <Input
                        type='text'
                        placeholder="Name of your community"
                        className='pl-6'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your Community name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateACommunityPage;
