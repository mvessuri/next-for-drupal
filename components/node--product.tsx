import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

interface NodeProductProps {
  node: DrupalNode
}

export function NodeProduct({ node, ...props }: NodeProductProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">{node.title}</h1>

        <figure>
          <Image
            src={absoluteUrl(node.field_product_image.field_media_image.uri.url)}
            width={500}
            height={300}
            className="rounded-lg shadow-md"
            alt={node.field_product_image.field_media_image.resourceIdObjMeta.alt}
            priority
          />
          {node.field_product_image.field_media_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_product_image.field_media_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>


        {node.body?.processed && (
          <div
            dangerouslySetInnerHTML={{ __html: node.body?.processed }}
            className="mt-6 font-serif text-xl leading-loose prose"
          />
        )}
    </div>
  )
}
