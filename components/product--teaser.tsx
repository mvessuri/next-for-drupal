import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface ProductTeaserProps {
  node: DrupalNode
}

export function ProductTeaser({ node, ...props }: ProductTeaserProps) {
  return (
    <article {...props}>
      <Link href={node.path.alias} className="no-underline hover:text-blue-600">
        <h2 className="mb-4 text-4xl font-bold">{node.title}</h2>
      {node.field_product_image && (
        <figure className="my-4">
          <Image
            src={absoluteUrl(node.field_product_image.field_media_image.uri.url)}
            width={150}
            height={150}
            alt={node.field_product_image.field_media_image.resourceIdObjMeta.alt}
          />
        </figure>
      )}
      </Link>
    </article>
  )
}
