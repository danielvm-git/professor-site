"use client"

import { MainLayout } from "@/components/common/main-layout"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react"

export default function BlogPage() {
  const { t } = useLanguage()

  const blogPosts = [
    {
      title: "Reflexões sobre o ensino de História na era digital",
      excerpt:
        "Como as tecnologias digitais estão transformando o ensino de História e quais são os desafios e oportunidades que surgem neste novo contexto.",
      date: "2024-01-15",
      category: "Educação",
      readTime: "5 min",
    },
    {
      title: "Mulheres cientistas invisibilizadas: um olhar histórico",
      excerpt:
        "Análise sobre como a historiografia tradicional invisibilizou as contribuições de mulheres para o desenvolvimento científico no Brasil.",
      date: "2023-12-10",
      category: "Pesquisa",
      readTime: "8 min",
    },
    {
      title: "A importância dos arquivos pessoais para a pesquisa histórica",
      excerpt:
        "Reflexões sobre o valor dos arquivos pessoais como fontes primárias e sua contribuição para a construção do conhecimento histórico.",
      date: "2023-11-22",
      category: "Metodologia",
      readTime: "6 min",
    },
  ]

  const upcomingEvents = [
    {
      title: 'Palestra: "Gênero e Ciência no Brasil"',
      date: "2024-02-15",
      time: "14:00",
      location: "Auditório Central - UFABC",
      description: "Discussão sobre as relações entre gênero e produção científica no contexto brasileiro.",
      type: "Palestra",
    },
    {
      title: 'Mesa Redonda: "Ensino de História: Desafios Contemporâneos"',
      date: "2024-03-08",
      time: "19:00",
      location: "Centro de Convenções - São Paulo",
      description: "Debate sobre os desafios do ensino de História na atualidade.",
      type: "Mesa Redonda",
    },
    {
      title: 'Workshop: "Metodologias de Pesquisa em História das Ciências"',
      date: "2024-03-20",
      time: "09:00",
      location: "Laboratório de Ensino - UFABC",
      description: "Workshop prático sobre metodologias de pesquisa na área de História das Ciências.",
      type: "Workshop",
    },
  ]

  const pastEvents = [
    {
      title: "Congresso Brasileiro de História da Educação",
      date: "2023-10-15",
      location: "Universidade Federal de Minas Gerais",
      participation: "Apresentação de trabalho",
    },
    {
      title: "Seminário Internacional de História das Ciências",
      date: "2023-09-08",
      location: "Museu Nacional - Rio de Janeiro",
      participation: "Mesa redonda",
    },
  ]

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("blogTitle")}</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Reflexões acadêmicas, eventos e discussões sobre História, Educação e Pesquisa.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Artigos e Reflexões</h2>
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base text-pretty">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      Ler mais
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Próximos Eventos */}
            <div>
              <h2 className="text-xl font-bold mb-4">{t("eventsTitle")}</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <Badge variant="default" className="mb-2">
                        {event.type}
                      </Badge>
                      <h3 className="font-semibold mb-2 text-sm text-balance">{event.title}</h3>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-pretty">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Eventos Passados */}
            <div>
              <h2 className="text-xl font-bold mb-4">Participações Recentes</h2>
              <div className="space-y-3">
                {pastEvents.map((event, index) => (
                  <Card key={index} className="border-muted">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm mb-1 text-balance">{event.title}</h3>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                        <div className="text-primary text-xs font-medium">{event.participation}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
