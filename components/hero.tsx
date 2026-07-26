import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import {
  Building2,
  CheckCircle2,
  BarChart3,
  FileText,
  Bell,
  Users,
  MessageSquare,
  Mail,
  BookOpen,
  Bot,
  Network,
  Cloud,
  Shield,
  Zap,
  Handshake
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 size={20} />,
    title: "Vote en ligne",
    description: "Organisez des votes sécurisés pour les décisions importantes"
  },
  {
    icon: <FileText size={20} />,
    title: "Gestion financière",
    description: "Suivi complet des charges, comptabilité automatisée"
  },
  {
    icon: <Bell size={20} />,
    title: "Rappels intelligents",
    description: "Automatisation des relances et appels de fonds"
  },
  {
    icon: <Bot size={20} />,
    title: "Assistants IA",
    description: "Modèles dédiés pour optimiser votre gestion"
  },
  {
    icon: <Network size={20} />,
    title: "Réseau solidaire",
    description: "Bénéficiez de l'entraide entre copropriétés"
  },
  {
    icon: <BookOpen size={20} />,
    title: "Centre de formation",
    description: "Documentation et ressources pour maîtriser la gestion"
  },
];

const quickActions = [
  { icon: <Cloud size={16} />, text: "Hébergement gratuit" },
  { icon: <Shield size={16} />, text: "Sécurité RGPD" },
  { icon: <Zap size={16} />, text: "Déploiement instantané" },
];

// Partenaires avec leurs logos (à remplacer par les vrais composants/images)
const partners = [
  {
    name: "ANIL",
    logo: (
      <img 
        className="font-bold text-lg"
        src="https://www.anil.org/_assets/2cdbe9cb694b7570aa05b07b14d5f82a/Sources/img/logo-anil.svg"
      />
    ),
    url: "https://www.anil.org/qui-sommes-nous/reseau-des-adil/",
    description: "Agence National pour l'information sur le logement"
  },
  {
    name: "CLCV",
    logo: (
      <img 
        className="font-bold text-lg"
        src="https://www.clcv.org/themes/clcv/assets/images/logo-clcv.svg"
      />
    ),
    url: "https://www.clcv.org",
    description: "Consommation, Logement et Cadres de Vie"
  },
  {
    name: "LOUTRE",
    logo: (
      <img 
        className="font-bold text-lg"
        src="https://amp.loutre-renovation.fr/build/images/logo.svg"
      />
    ),
    url: "https://amp.loutre-renovation.fr/",
    description: "Plateforme de rénovation Marseille"
  },
  {
    name: "Service Public",
    logo: (
      <img 
        className="font-bold text-lg"
        src="https://www.ademe.fr/wp-content/uploads/2022/03/logorf.svg"
      />
    ),
    url: "https://www.clcv.org",
    description: "Consommation, Logement et Cadres de Vie"
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">CoprOS</h2>
              <p className="text-sm text-muted-foreground">Solution open source de gestion</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Gérez votre copropriété
            <span className="block text-primary">sans intermédiaire</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            La plateforme tout-en-un développée par pour moderniser la gestion de copropriété et reprendre le contrôle de sa copropriété.
          </p>

          {/* Quick actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium"
              >
                {action.icon}
                {action.text}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Zap size={20} />
              Découvrir la démo
            </a>
            <a
              href="https://github.com/hdavid-13/CoprOS"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-background text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-colors"
              rel="noreferrer"
            >
              <BookOpen size={20} />
              Voir le code
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 border border-transparent hover:border-border/50"
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-20 pt-12 border-t border-border/20">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-2 text-center">
              <Handshake size={20} className="text-primary" />
              <h3 className="text-xl font-semibold">Partenariat</h3>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                  title={partner.description}
                >
                  <div className="flex items-center justify-center w-20 h-20 bg-secondary/30 rounded-xl group-hover:bg-secondary/50 transition-colors">
                    {partner.logo}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {partner.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Technology logos */}
        <div className="flex justify-center items-center gap-8 opacity-40 mt-12 pt-8 border-t border-border/20">
          <p className="text-sm text-muted-foreground hidden sm:block">Propulsé par</p>
          <a
            href="https://supabase.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-100"
          >
            <SupabaseLogo />
          </a>
          <span className="text-muted-foreground">x</span>
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-100"
          >
            <NextLogo />
          </a>
        </div>
      </div>
    </section>
  );
}