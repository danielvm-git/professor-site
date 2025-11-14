"use client"

import { MainLayout } from "@/components/common/main-layout"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: BookOpen,
      title: t("disciplines"),
      description: "História da Educação, Teoria da História, Políticas Educacionais",
      href: "/disciplinas",
      color: "text-blue-600",
    },
    {
      icon: FileText,
      title: t("publications"),
      description: "Artigos, tese de doutorado e pesquisas acadêmicas",
      href: "/publicacoes",
      color: "text-purple-600",
    },
    {
      icon: Calendar,
      title: t("blog"),
      description: "Eventos acadêmicos, palestras e reflexões",
      href: "/blog",
      color: "text-green-600",
    },
  ]

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-start gap-8 mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl font-bold text-primary">
              MS
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">{t("welcomeTitle")}</h1>
              <p className="text-xl text-muted-foreground mb-4 text-pretty">{t("welcomeSubtitle")}</p>
              <p className="text-lg text-foreground/80 leading-relaxed text-pretty">{t("aboutText")}</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-pretty">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <Link href={feature.href}>
                      Explorar
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Academic Info */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl">{t("academicFormation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{t("phdDegree")}</h3>
              <p className="text-muted-foreground">Universidade Estadual de Campinas (Unicamp)</p>
              <p className="text-sm text-muted-foreground mt-1">{t("advisor")} Maria Margaret Lopes</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t("bachelorDegree")}</h3>
              <p className="text-muted-foreground">Universidade Estadual de Campinas (Unicamp)</p>
            </div>
            <div className="pt-4 border-t border-accent/20">
              <h4 className="font-medium mb-2">{t("phdThesisLabel")}</h4>
              <p className="text-sm italic text-pretty">
                "Em busca pelo campo: ciências, coleções, gênero e outras histórias sobre mulheres viajantes no Brasil
                em meados do século XX"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
