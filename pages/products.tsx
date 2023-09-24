import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { ProductTeaser } from "components/product--teaser"

interface ProductsPageProps {
  nodes: DrupalNode[]
}

export default function ProductsPage({ nodes }: ProductsPageProps) {
  return (
    <Layout>
      <Head>
        <title>Products List</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Products List</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <ProductTeaser node={node} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<ProductsPageProps>> {
  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--products",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--products]": "title,path,field_product_image",
        include: "field_product_image.field_media_image",
        sort: "title",
      },
    }
  )

  return {
    props: {
      nodes,
    },
  }
}
