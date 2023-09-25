import Head from "next/head"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { ProductTeaser } from "components/product--teaser"

async function getData() {

  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--products",
    {
      params: {
        "filter[status]": 1,
        "fields[node--products]": "title,path,field_product_image",
        include: "field_product_image.field_media_image",
        sort: "title",
      },
    }
  )

  return nodes

}



export default async function TestPage() {
  const nodes = await getData()

  return (
    <>
      <Head>
        <title>Products List</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Products List</h1>
        <h2 className="mb-8 text-3xl font-black">This page uses the new App Router and fetches data using the Drupal class.</h2>

        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <ProductTeaser node={node} />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </>
  )
}

