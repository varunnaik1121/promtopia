'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Profile from '@components/Profile';
const UserProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  //fething the profile by user id

  console.log({ routerId: router.query.id });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${router.query.id}/posts`);
      const data = await res.json();
      console.log({ data });
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      'are you sure you want to delete the prompt?.'
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={posts[0]?.creator.username}
      desc="welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
