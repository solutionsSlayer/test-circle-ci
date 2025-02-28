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
  
  return <h1>Slug: {params?.slug}</h1>;
} 