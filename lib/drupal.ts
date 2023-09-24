import { DrupalClient } from "next-drupal"

let baseUrl

if (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL !== undefined) {
  baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
} else {
  baseUrl = "http://localhost:8080"
}

export const drupal = new DrupalClient(
  baseUrl,
  {
    previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
    auth: {
      clientId: process.env.DRUPAL_CLIENT_ID || '',
      clientSecret: process.env.DRUPAL_CLIENT_SECRET || '',
    },
  }
)
