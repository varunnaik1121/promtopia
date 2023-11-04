'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Form from '@components/Form';
const page = () => {
  const [submitting, setSubmitting] = useState(false);
  return <Form />;
};

export default page;
