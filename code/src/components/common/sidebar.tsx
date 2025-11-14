"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSelector } from "./language-selector"
import { Home, BookOpen, FileText, Calendar, Mail, User } from "lucide-react"

const navigation = [
  { key: "home", href: "/", icon: Home },
  { key: "disciplines", href: "/disciplinas", icon: BookOpen },
  { key: "publications", href: "/publicacoes", icon: FileText },
  { key: "blog", href: "/blog", icon: Calendar },
  { key: "contact", href: "/contato", icon: Mail },
]

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-8 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-sidebar-primary flex items-center justify-center">
              <User className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-sidebar-foreground">Mariana Sombrio</h1>
              <p className="text-sm text-sidebar-foreground/70">Historiadora</p>
            </div>
          </div>
          <LanguageSelector />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {t(item.key as any)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 text-center">© 2025 Mariana Sombrio</p>
        </div>
      </div>
    </div>
  )
}
