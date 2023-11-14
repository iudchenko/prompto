"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { IPost, IProfile, IUser } from "@/types/types";

const MyProfile = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const { data: session } = useSession();

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <Profile
      name={`${username}'s `}
      desc={`Welcome to ${username}'s profile page`}
      data={posts}
    />
  );
};

export default MyProfile;
