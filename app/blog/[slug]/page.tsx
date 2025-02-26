import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return { title: `Post: ${resolvedParams.slug}` };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <h1>Slug: {resolvedParams.slug}</h1>;
}
