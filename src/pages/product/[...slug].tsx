import { drupal } from "lib/drupal"
import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import { Layout } from "components/layout"
import { DrupalNode } from "next-drupal"
import Head from "next/head"
import { NodeProduct } from "components/node--product"

interface NodePageProps {
  resource: DrupalNode
}

export default function NodePage({ resource }: NodePageProps) {
  if (!resource) return null

  return (
    <Layout>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
        <NodeProduct node={resource} />
    </Layout>
  )
}


export async function getStaticPaths(context) {
  return {
    paths: await drupal.getStaticPathsFromContext("node--products", context, { pathPrefix: "/product" }),
    fallback: "blocking",
  }
}


export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context, { pathPrefix: "/product" })

  if (!path) {
    return {
      notFound: true,
    }
  }

  const type = path.jsonapi?.resourceName

  const params = {
    include: "field_product_image.field_media_image",
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params,
    }
  )

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi?.individual}`)
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      resource,
    },
  }
}
