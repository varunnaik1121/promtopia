'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Profile from '@components/Profile';
const MyProfile = () => {
  const handleEdit = async () => {};
  const handleDelete = async () => {};

  return (
    <Profile
      name={'My'}
      desc="welcome to your personalized profile page"
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
