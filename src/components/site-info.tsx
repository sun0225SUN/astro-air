import { site } from "~/config"

export default function SiteInfo() {
  return (
    <a href={site.url}>
      <div className="text-xl font-semibold">{site.name}</div>
    </a>
  )
}
