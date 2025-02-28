import { Metadata } from 'next';
import ClientPage from './client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return { title: `Post: ${resolvedParams.slug}` };
}

export default async function Page({ params, searchParams }: PageProps) {
  const _resolvedParams = await params;
  const _resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <ClientPage />;
}
