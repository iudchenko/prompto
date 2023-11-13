"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { IPost, IProfile, IUser } from "@/types/types";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    // if (!session?.user?.id) return;
    const fetchPosts = async () => {
      if (session?.user) {
        try {
          const response = await fetch(
            `/api/users/${(session?.user as IProfile)?.id}/posts`,
          );
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPosts();
  }, [session]);

  const handleEdit = (post: IPost) => {
    if (post?._id) {
      router.push(`/update-prompt?id=${post._id}`);
    }
  };

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?",
    );

    if (hasConfirmed && post?._id) {
      try {
        await fetch(`/api/prompt/${post?._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
