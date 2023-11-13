"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import user from "@models/user";
import { FormTypes, INewPost } from "@/types/types";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newPrompt = {
      prompt: post.prompt,
      userId: (session?.user as { id: string })?.id,
      tag: post.tag,
    };

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify(newPrompt as INewPost),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type={FormTypes.Create}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
