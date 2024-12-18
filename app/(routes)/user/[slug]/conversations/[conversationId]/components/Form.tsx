"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { ImageUp, Send } from "lucide-react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { usePathname } from "next/navigation";


const Form = () => {
  const { conversationId } = useConversation();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/chat/messages', {
      ...data,
      conversationId
    })
  };

  const handleUpload = (result: any) => {
    axios.post('/api/chat/messages', {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div
      className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
      "
    >
      {!pathname.includes('/user') && (
        <>
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onSuccess={handleUpload}
            uploadPreset="f2vz6rku"
          >
            <ImageUp size={30} className="text-blue-500" />
          </CldUploadButton>
        </>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
            rounded-full
            p-2
            bg-blue-500
            cursor-pointer
            hover:bg-blue-600
            transition
          "
        >
          <Send size={18}
            className="text-white" />

        </button>
      </form>
    </div>
  );
}

export default Form;