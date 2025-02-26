'use client';

import { useParams, useSearchParams } from 'next/navigation';

export default function ClientPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  return <h1>Slug: {params?.slug}</h1>;
} 