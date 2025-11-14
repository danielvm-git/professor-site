"use client"

import { MainLayout } from "@/components/common/main-layout"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, Target, MapPin, Calendar, Download } from "lucide-react"

export default function DisciplinasPage() {
  const { t } = useLanguage()

  const disciplines = [
    {
      title: "História da Educação",
      code: "HIST001",
      hours: "60h",
      level: "Graduação",
      schedule: {
        days: "Terças e Quintas",
        time: "14:00 - 16:00",
        location: "Sala 204 - Bloco A",
        semester: "2024.2",
      },
      description:
        "Estudo das transformações históricas dos sistemas educacionais, com foco nas políticas públicas e práticas pedagógicas ao longo do tempo.",
      objectives: [
        "Compreender a evolução histórica da educação no Brasil",
        "Analisar as políticas educacionais em diferentes períodos",
        "Relacionar educação e sociedade em perspectiva histórica",
      ],
      methodology: "Aulas expositivas, seminários, análise de fontes históricas e discussões em grupo.",
      evaluation: "Provas, seminários, resenhas críticas e participação em aula.",
      materials: [
        { name: "Plano de Ensino - História da Educação", file: "plano-historia-educacao.pdf" },
        { name: "Bibliografia Complementar", file: "bibliografia-historia-educacao.pdf" },
        { name: "Cronograma de Aulas", file: "cronograma-historia-educacao.pdf" },
      ],
      bibliography: [
        "SAVIANI, Dermeval. História das ideias pedagógicas no Brasil.",
        "ROMANELLI, Otaíza. História da educação no Brasil.",
        "GHIRALDELLI Jr., Paulo. História da educação brasileira.",
      ],
    },
    {
      title: "Teoria da História",
      code: "HIST002",
      hours: "60h",
      level: "Graduação/Pós",
      schedule: {
        days: "Segundas e Quartas",
        time: "16:00 - 18:00",
        location: "Sala 301 - Bloco B",
        semester: "2024.2",
      },
      description:
        "Introdução aos principais debates teóricos e metodológicos da disciplina histórica, abordando diferentes correntes historiográficas.",
      objectives: [
        "Conhecer as principais correntes teóricas da História",
        "Desenvolver senso crítico sobre a produção historiográfica",
        "Compreender os métodos de pesquisa histórica",
      ],
      methodology: "Leituras dirigidas, debates teóricos, análise de textos historiográficos.",
      evaluation: "Ensaios teóricos, apresentações orais e prova final.",
      materials: [
        { name: "Plano de Ensino - Teoria da História", file: "plano-teoria-historia.pdf" },
        { name: "Textos Fundamentais", file: "textos-teoria-historia.pdf" },
      ],
      bibliography: [
        "CHARTIER, Roger. A história cultural: entre práticas e representações.",
        "BURKE, Peter. A escrita da história: novas perspectivas.",
        "LE GOFF, Jacques. História e memória.",
      ],
    },
    {
      title: "Políticas Educacionais",
      code: "HIST003",
      hours: "60h",
      level: "Graduação",
      schedule: {
        days: "Sextas",
        time: "08:00 - 12:00",
        location: "Sala 105 - Bloco C",
        semester: "2024.2",
      },
      description:
        "Análise das políticas públicas educacionais no Brasil, desde o período colonial até a contemporaneidade.",
      objectives: [
        "Analisar a formação das políticas educacionais brasileiras",
        "Compreender os debates contemporâneos sobre educação",
        "Relacionar políticas educacionais e transformações sociais",
      ],
      methodology: "Estudos de caso, análise documental, seminários temáticos.",
      evaluation: "Projeto de pesquisa, apresentações e avaliação escrita.",
      materials: [
        { name: "Plano de Ensino - Políticas Educacionais", file: "plano-politicas-educacionais.pdf" },
        { name: "Legislação Educacional Brasileira", file: "legislacao-educacional.pdf" },
        { name: "Estudos de Caso", file: "estudos-caso-politicas.pdf" },
      ],
      bibliography: [
        "SHIROMA, Eneida Oto. Política educacional.",
        "AZEVEDO, Janete M. Lins de. A educação como política pública.",
        "VIEIRA, Sofia Lerche. Política educacional, educação e gestão.",
      ],
    },
  ]

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("disciplinesTitle")}</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Disciplinas ministradas na UFABC com foco em História da Educação, Teoria da História e Políticas
            Educacionais.
          </p>
        </div>

        <div className="grid gap-8">
          {disciplines.map((discipline, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-accent/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{discipline.title}</CardTitle>
                    <CardDescription className="text-base text-pretty">{discipline.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Badge variant="secondary">{discipline.code}</Badge>
                    <Badge variant="outline">{discipline.level}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {discipline.hours}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {discipline.level}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Informações da Disciplina
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Dias:</strong> {discipline.schedule.days}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Horário:</strong> {discipline.schedule.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <strong>Local:</strong> {discipline.schedule.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {discipline.schedule.semester}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Objetivos */}
                <div>
                  <h3 className="flex items-center gap-2 font-semibold mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    Objetivos de Aprendizagem
                  </h3>
                  <ul className="space-y-2">
                    {discipline.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-pretty">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metodologia */}
                <div>
                  <h3 className="flex items-center gap-2 font-semibold mb-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Metodologia
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty">{discipline.methodology}</p>
                </div>

                {/* Avaliação */}
                <div>
                  <h3 className="font-semibold mb-2">Critérios de Avaliação</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{discipline.evaluation}</p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Materiais e Bibliografia</h3>

                  {/* PDF Materials */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Download className="w-4 h-4 text-primary" />
                      Materiais para Download
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {discipline.materials.map((material, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 bg-transparent"
                          onClick={() => {
                            // Simulate PDF download
                            console.log(`Downloading ${material.file}`)
                          }}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {material.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bibliography */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bibliografia Básica</h4>
                    <ul className="space-y-1">
                      {discipline.bibliography.map((book, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground">
                          • {book}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
