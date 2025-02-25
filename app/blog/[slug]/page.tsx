type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  return { title: `Post: ${params.slug}` };
}

export default async function Page({ params }: Props) {
  return <h1>Slug: {params.slug}</h1>;
}
