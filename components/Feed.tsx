"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";
import { IPost } from "@/types/types";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string): void => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post: IPost) => {
    const {
      prompt,
      tag,
      creator: { username },
    } = post;
    const searched = searchText.toLowerCase();

    if (
      prompt.toLowerCase().includes(searched) ||
      tag.toLowerCase().includes(searched) ||
      username?.toLowerCase().includes(searched)
    ) {
      return true;
    }
  });

  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
