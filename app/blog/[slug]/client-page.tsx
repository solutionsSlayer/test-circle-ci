'use client';

interface ClientPageProps {
  params?: {
    slug: string;
  };
  _searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ClientPage({ 
  params,
  _searchParams 
}: ClientPageProps) {
  // Ensure the slug is properly displayed
  const slug = params?.slug || '';
  
  return <h1>Slug: {slug}</h1>;
} 