import { useEffect } from "react"
// @ts-ignore
import twikoo from "twikoo"
import { common, defaultLanguage } from "~/config"

const Twikoo = () => {
  useEffect(() => {
    twikoo({
      envId: common.comments.twikoo.envId,
      el: "#tcomment",
      lang: defaultLanguage === "zh" ? "zh-CN" : "en-GB",
    }).then(() => {
      console.log("comment loading success")
    })
  }, [])

  return <div id="tcomment" />
}

export default Twikoo
