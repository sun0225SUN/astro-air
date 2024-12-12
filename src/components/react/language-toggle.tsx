import { Languages } from "lucide-react"
import { defaultLanguage } from "~/config"

interface LanguageToggleProps {
  currentLocale: string
}

export function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const getNewPath = (path: string): string => {
    if (path === "/" || path === "") {
      return defaultLanguage === "zh" ? "/en" : "/zh"
    }

    if (path === "/en" || path === "/zh") {
      return "/"
    }

    return defaultLanguage === "zh"
      ? currentLocale === "zh"
        ? `/en${path}`
        : path.replace("/en", "")
      : currentLocale === "en"
        ? `/zh${path}`
        : path.replace("/zh", "")
  }

  const handleLanguageToggle = () => {
    const currentPath = window.location.pathname
    const newPath = getNewPath(currentPath)
    window.location.href = newPath
  }

  return <Languages className="cursor-pointer" onClick={handleLanguageToggle} />
}
