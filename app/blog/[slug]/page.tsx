import { Metadata } from 'next';
import ClientPage from './client-page';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return { title: `Post: ${params.slug}` };
}

export default function Page({ params, searchParams }: PageProps) {
  return <ClientPage />;
}
