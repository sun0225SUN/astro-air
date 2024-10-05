import { tabs } from "~/config"

export function Tabs() {
  return (
    <div className="my-4 flex gap-4 text-lg">
      {tabs.map((tab, index) => (
        <a
          href={tab.link}
          className="hover:underline hover:underline-offset-4"
          key={index}
        >
          <div className="tab">{tab.label}</div>
        </a>
      ))}
    </div>
  )
}
