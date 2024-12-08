"use client"

import { z } from 'zod';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from '@hookform/resolvers/zod';
import type EditorJS from '@editorjs/editorjs'

import { PostCreationRequest, PostValidator } from '@/validators';
import { uploadFiles } from '@/lib/uploadthing';
import { toast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';


interface EditorProps {
  subforumId: string
}

type FormData = z.infer<typeof PostValidator>

const Editor = ({
  subforumId
}: EditorProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subforumId: subforumId,
      title: '',
      content: null,
    }
  });

  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, serIsMounted] = useState<boolean>(false);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subforumId,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content, subforumId }
      const { data } = await axios.post('/api/subforum/posts/create', payload)
      return data
    },
    onError: () => {
      return toast({
        title: 'Post Publication Failed',
        description: 'Your post was not published. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      // turn pathname /community/mycommunity/submit into /community/mycommunity
      const newPathname = pathname.split('/').slice(0, -1).join('/')
      router.push(newPathname)

      router.refresh()

      return toast({
        title: 'Post Published Successfully',
        description: 'Your post has been published.',
      })
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      serIsMounted(true);
    }
  }, [])

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: {
          blocks: []
        },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/editor',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles("imageUploader", {
                    files: [file],
                  })

                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  }
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        }
      })
    }

  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: 'Something went wrong.',
          description: (value as { message: string }).message,
          variant: 'destructive',
        })
      }
    }
  }, [errors])


  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0)
    }

    if (isMounted) {
      init();
    }

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    }

  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      subforumId,
    }

    createPost(payload)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title');

  return (
    <div className='w-full p-4 bg-white rounded-lg border border-black'>
      <form
        id='subforum-form-post'
        className='w-fit'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='prose prose-stone dark:prose-invert'>
          <TextareaAutosize
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none'
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
          />
          <div id='editor' className='min-h-[500px]' />
        </div>
      </form>
    </div>
  )
}

export default Editor
