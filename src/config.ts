import { Github, Twitter } from "lucide-react"

export const config = {
  meta: {
    favicon: "",
    title: "小孙同学",
    url: "https://blog.sunguoqi.com",
    slogan: "一个浪漫的理性主义者",
    description: "读书、摄影、编程、旅行",
  },
  siteName: "小孙同学",
  social: [
    {
      icon: Twitter,
      label: "X",
      link: "https://x.com/sun0225SUN",
    },
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/sun0225SUN",
    },
  ],
  rss: true,
  navigation: {
    home: true,
    archive: true,
    tags: true,
    about: true,
    custom: [
      {
        label: "影集",
        link: "https://camlife.cn",
      },
    ],
  },
  intro: `🖥️ 前端小学生｜📸 摄影爱好者｜🛸 旅行探索家｜🚴 骑行蹭风选手｜🍎 科技产品发烧友`,
  latestPosts: 8,
}
