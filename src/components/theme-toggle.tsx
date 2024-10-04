import { Sun, Moon } from "lucide-react"
import { useState } from "react"

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    )
  })

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    if (!document.startViewTransition) {
      setTheme(newTheme)
    } else {
      document.startViewTransition(() => setTheme(newTheme))
    }
  }

  const setTheme = (newTheme: string) => {
    document.documentElement.classList.remove(currentTheme)
    document.documentElement.classList.add(newTheme)
    document.documentElement.style.setProperty("color-scheme", newTheme)
    localStorage.setItem("theme", newTheme)
    setCurrentTheme(newTheme)
  }

  return (
    <div className="inline-flex items-center">
      <button id="themeToggleButton" onClick={toggleTheme}>
        {currentTheme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}

export default ThemeToggle
