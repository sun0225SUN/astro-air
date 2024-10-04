import { introduction } from "~/config"

export default function Introduction() {
  return (
    <div className="my-8" dangerouslySetInnerHTML={{ __html: introduction }} />
  )
}
