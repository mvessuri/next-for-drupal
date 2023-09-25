import Link from "next/link"
import Header from "./Header"

import { PreviewAlert } from "components/preview-alert"

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <Header />
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
