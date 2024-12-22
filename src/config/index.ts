import { Github, Twitter } from "lucide-react"

export const defaultLanguage: string = "en"

export const common = {
  meta: {
    favicon: "/avatar.png",
    url: "https://blog.sunguoqi.com",
  },
  googleAnalyticsId: "",
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
    custom: [
      {
        label: "CamLife",
        link: "https://camlife.cn",
      },
    ],
    about: true,
  },
  latestPosts: 8,
}

export const zh = {
  ...common,
  siteName: "小孙同学",
  meta: {
    ...common.meta,
    title: "小孙同学",
    slogan: "一个浪漫的理性主义者",
    description: "读书、摄影、编程、旅行",
  },
  navigation: {
    ...common.navigation,
    custom: [
      {
        label: "影集",
        link: "https://camlife.cn",
      },
    ],
  },
}

export const en = {
  ...common,
  siteName: "Guoqi Sun",
  meta: {
    ...common.meta,
    title: "Guoqi Sun",
    slogan: "A Romantic Rationalist",
    description: "Reading, Photography, Programming, Traveling",
  },
  navigation: {
    ...common.navigation,
    custom: [
      {
        label: "CamLife",
        link: "https://camlife.cn",
      },
    ],
  },
}
