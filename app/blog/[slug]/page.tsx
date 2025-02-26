'use client';

import { Metadata } from 'next';
import { useParams, useSearchParams } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return { title: `Post: ${resolvedParams.slug}` };
}

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  return <h1>Slug: {params?.slug}</h1>;
}
