import { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return { title: `Post: ${params.slug}` };
}

export default async function Page({ params }: PageProps) {
  return <h1>Slug: {params.slug}</h1>;
}
