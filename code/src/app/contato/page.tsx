"use client"

import { MainLayout } from "@/components/common/main-layout"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Clock, Phone, ExternalLink } from "lucide-react"

export default function ContatoPage() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: Mail,
      label: "E-mail Institucional",
      value: "mariana.sombrio@ufabc.edu.br",
      href: "mailto:mariana.sombrio@ufabc.edu.br",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "UFABC - Campus Santo André\nAv. dos Estados, 5001 - Santo André, SP",
      href: null,
    },
    {
      icon: Clock,
      label: "Horário de Atendimento",
      value: "Terças e Quintas: 14h às 17h\n(Mediante agendamento)",
      href: null,
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+55 (11) 4996-8300",
      href: "tel:+551149968300",
    },
  ]

  const academicLinks = [
    {
      name: "Currículo Lattes",
      url: "http://lattes.cnpq.br/",
      description: "Currículo acadêmico completo na Plataforma Lattes",
    },
    {
      name: "ORCID",
      url: "https://orcid.org/",
      description: "Identificador digital para pesquisadores",
    },
    {
      name: "ResearchGate",
      url: "https://www.researchgate.net/",
      description: "Rede social acadêmica e publicações",
    },
    {
      name: "Academia.edu",
      url: "https://ufabc.academia.edu/",
      description: "Plataforma acadêmica com artigos e pesquisas",
    },
  ]

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{t("contactTitle")}</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Entre em contato para discussões acadêmicas, orientações ou colaborações de pesquisa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>Como entrar em contato comigo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{info.label}</h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{info.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Links Acadêmicos */}
            <Card>
              <CardHeader>
                <CardTitle>Perfis Acadêmicos</CardTitle>
                <CardDescription>Encontre-me nas principais plataformas acadêmicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {academicLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{link.name}</h3>
                      <p className="text-xs text-muted-foreground text-pretty">{link.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envie uma Mensagem</CardTitle>
                <CardDescription>Use o formulário abaixo para entrar em contato</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input id="lastName" placeholder="Seu sobrenome" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Instituição (opcional)</Label>
                    <Input id="institution" placeholder="Sua instituição de ensino ou pesquisa" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Assunto da sua mensagem" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Escreva sua mensagem aqui..." className="min-h-[120px]" />
                  </div>

                  <Button type="submit" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Informações Importantes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Respondo e-mails em até 48 horas úteis</li>
                  <li>• Para orientações acadêmicas, agende horário previamente</li>
                  <li>• Colaborações de pesquisa são sempre bem-vindas</li>
                  <li>• Disponível para palestras e eventos acadêmicos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
