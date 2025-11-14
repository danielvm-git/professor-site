"use client"

import { MainLayout } from "@/components/common/main-layout"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User } from "lucide-react"

export default function PublicacoesPage() {
  const { t } = useLanguage()

  const thesis = {
    title:
      "Em busca pelo campo: ciências, coleções, gênero e outras histórias sobre mulheres viajantes no Brasil em meados do século XX",
    year: "2014",
    advisor: "Maria Margaret Lopes",
    university: "Universidade Estadual de Campinas (Unicamp)",
    department: "Instituto de Geociências",
    abstract:
      "Esta tese investiga as trajetórias de mulheres viajantes no Brasil durante o século XX, analisando suas contribuições para as ciências naturais e a formação de coleções científicas. O trabalho examina como questões de gênero influenciaram a participação feminina em expedições científicas e a construção do conhecimento científico no período.",
    keywords: ["História das Ciências", "Gênero", "Mulheres Viajantes", "Coleções Científicas", "Brasil Século XX"],
  }

  const publications = [
    {
      title: "Mulheres nas ciências: trajetórias e desafios no século XX",
      journal: "Revista Brasileira de História da Ciência",
      year: "2021",
      type: "Artigo",
      coauthors: ["Maria Margaret Lopes"],
      abstract: "Análise das trajetórias de mulheres cientistas no Brasil durante o século XX...",
    },
    {
      title: "Coleções científicas e expedições: o papel feminino na construção do conhecimento",
      journal: "História, Ciências, Saúde-Manguinhos",
      year: "2020",
      type: "Artigo",
      coauthors: [],
      abstract: "Investigação sobre a participação de mulheres em expedições científicas...",
    },
    {
      title: "Gênero e ciência no Brasil: perspectivas históricas",
      journal: "Cadernos Pagu",
      year: "2019",
      type: "Artigo",
      coauthors: ["Ana Paula Silva"],
      abstract: "Reflexões sobre as relações entre gênero e produção científica...",
    },
  ]

  const presentations = [
    {
      title: "Mulheres viajantes e a construção do conhecimento científico",
      event: "Congresso Brasileiro de História da Ciência",
      year: "2021",
      location: "São Paulo, SP",
    },
    {
      title: "Gênero e expedições científicas no século XX",
      event: "Seminário Nacional de História da Ciência",
      year: "2020",
      location: "Rio de Janeiro, RJ",
    },
  ]

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("publicationsTitle")}</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Pesquisas acadêmicas, publicações e apresentações sobre história das ciências, gênero e mulheres viajantes
            no Brasil.
          </p>
        </div>

        {/* Tese de Doutorado */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2 text-balance">{thesis.title}</CardTitle>
                <CardDescription className="text-base">Tese de Doutorado • {thesis.year}</CardDescription>
              </div>
              <Badge variant="default" className="ml-4">
                Tese
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>
                    <strong>Orientadora:</strong> {thesis.advisor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    <strong>Ano:</strong> {thesis.year}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <strong>Universidade:</strong> {thesis.university}
                </div>
                <div>
                  <strong>Instituto:</strong> {thesis.department}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Resumo</h3>
              <p className="text-sm text-muted-foreground text-pretty">{thesis.abstract}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Palavras-chave</h3>
              <div className="flex flex-wrap gap-2">
                {thesis.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artigos Publicados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Artigos Publicados</h2>
          <div className="grid gap-6">
            {publications.map((pub, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 text-balance">{pub.title}</CardTitle>
                      <CardDescription>
                        {pub.journal} • {pub.year}
                        {pub.coauthors.length > 0 && <span> • Co-autores: {pub.coauthors.join(", ")}</span>}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{pub.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 text-pretty">{pub.abstract}</p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acessar Publicação
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Apresentações */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Apresentações em Eventos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {presentations.map((presentation, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-balance">{presentation.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {presentation.event}
                    </div>
                    <div>
                      {presentation.year} • {presentation.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Links Acadêmicos */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Perfis Acadêmicos</CardTitle>
            <CardDescription>Links para perfis e redes acadêmicas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                Currículo Lattes
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                ORCID
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                ResearchGate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
