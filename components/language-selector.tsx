"use client"

import { Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage, type Language } from "@/contexts/language-context"

const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  zh: { name: "中文", flag: "🇨🇳" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  ko: { name: "한국어", flag: "🇰🇷" },
  ja: { name: "日本語", flag: "🇯🇵" },
}

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span>{languages[language].flag}</span>
              <span className="text-sm">{languages[language].name}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <span>{flag}</span>
                <span>{name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
