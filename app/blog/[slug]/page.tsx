export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: `Post: ${params.slug}` };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  return <h1>Slug: {params.slug}</h1>;
}
