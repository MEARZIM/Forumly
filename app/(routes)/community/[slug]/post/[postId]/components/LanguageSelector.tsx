'use client'

import * as React from "react"
import { Check, Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
] as const

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void // Notify parent on language change
}

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [language, setLanguage] = React.useState('en')

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang)
    onLanguageChange(lang) // Notify the parent about the selected language
  }

  return (
    <Select value={language} onValueChange={handleLanguageSelect}>
      <SelectTrigger
        className="w-[180px] bg-background/50 backdrop-blur-sm border-muted"
      >
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Select language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs text-muted-foreground">
            Choose Language
          </SelectLabel>
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-between flex-1">
                <span>{lang.name}</span>
                {language === lang.code && (
                  <Check className="h-4 w-4 text-primary ml-2" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
