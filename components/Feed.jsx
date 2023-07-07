"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter((item) => {
      return (
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      );
    });
  };

  const handleSearchChange = (event) => {
    clearTimeout(searchTimeOut);
    setSearchText(event.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(event.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tag) => {
    const searchResult = filterPrompts(tag);
    setSearchText(tag);
    setSearchResults(searchResult);
  };

  console.log(searchResults);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
