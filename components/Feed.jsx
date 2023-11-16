import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    //filter the values based on search and set the values to original posts
    if (posts) {
      if (!searchText) {
        setFilteredPosts(posts);
      }
      const filtered = posts.filter((post) => {
        return (
          post.creator.username.includes(searchText) ||
          post.tag.includes(searchText) ||
          post.prompt.includes(searchText)
        );
      });
      setFilteredPosts(filtered);
    }
  }, [searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);

      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  const handleTagClick = (value) => {
    setSearchText(value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
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
