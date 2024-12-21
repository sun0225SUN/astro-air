import { useEffect, useState } from "react"

export function CodeBackground() {
  const charGroups = {
    brackets: {
      chars: ["{", "}", "(", ")", "[", "]", "<", ">"],
      weight: 3,
    },
    operators: {
      chars: ["=", "+", "-", "*", "/", "%", "=>", "&&", "||", "|", "&", "..."],
      weight: 2,
    },
    punctuation: {
      chars: [".", ";", ":", ","],
      weight: 4,
    },
    keywords: {
      chars: [
        "const",
        "let",
        "var",
        "function",
        "if",
        "else",
        "return",
        "class",
        "import",
        "export",
        "from",
        "async",
        "await",
        "try",
        "catch",
        "interface",
        "type",
        "extends",
        "implements",
      ],
      weight: 1,
    },
    values: {
      chars: ["null", "undefined", "true", "false", "void", "any", "never"],
      weight: 1,
    },
  }

  const [backgroundChars, setBackgroundChars] = useState<string[]>([])

  useEffect(() => {
    const getWeightedRandomChar = () => {
      const weightedChars = Object.values(charGroups).reduce((acc, group) => {
        const chars = Array(group.weight).fill(group.chars).flat()
        return [...acc, ...chars]
      }, [] as string[])
      return weightedChars[Math.floor(Math.random() * weightedChars.length)]
    }

    const chars = new Array(2000).fill(null).map(() => getWeightedRandomChar())
    setBackgroundChars(chars)
  }, [])

  return (
    <div className="fixed inset-0 z-0 flex h-screen w-screen select-none flex-wrap overflow-hidden">
      {backgroundChars.map((char, index) => (
        <span
          key={index}
          className="px-1 text-sm text-transparent duration-[0.8s] hover:text-black/50 hover:duration-0 dark:hover:text-white/50"
        >
          {char}
        </span>
      ))}
    </div>
  )
}
