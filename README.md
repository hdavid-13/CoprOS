# CoprOS

**La solution open source complète pour la gestion de copropriété**

[License: MIT](https://opensource.org/licenses/MIT)  
[Next.js](https://nextjs.org/)  
[Supabase](https://supabase.com/)  
[GitHub Stars](https://github.com/hdavid-13/CoprOS)

---

## 📌 À propos de CoprOS

**CoprOS** est une plateforme **open source** conçue pour moderniser et simplifier la gestion des copropriétés. Développée par [Hugo DAVID](https://github.com/hdavid-13), elle offre une solution tout-en-un pour les syndicats de copropriétaires, avec des fonctionnalités avancées comme le vote en ligne, la gestion financière, l'automatisation des rappels, et bien plus.

✅ **100% Open Source** – Code transparent et modifiable.  
✅ **Hébergement gratuit** – Déployez votre propre instance ou rejoignez notre réseau bénévole.  
✅ **Conforme RGPD** – Sécurité et respect des données garantis.  
✅ **Modulaire** – Activez uniquement les fonctionnalités dont vous avez besoin.

---

## 🚀 Fonctionnalités

### 🗳️ **Gouvernance**

- **Vote en ligne** : Organisez des votes sécurisés pour les décisions importantes (travaux, budget, etc.).
- **Assemblées générales** : Planification et gestion des AG avec historique des décisions.

### 💰 **Gestion financière**

- **Comptabilité automatisée** : Suivi des charges, des paiements et des dettes.
- **Appels de fonds** : Génération et envoi automatique des appels de charges.
- **Rappels intelligents** : Automatisation des relances pour les copropriétaires en retard.

### 📄 **Documentation &amp; Transparence**

- **Espace documentaire** : Centralisation des procès-verbaux, règlements, et contrats.
- **Forum communautaire** : Échange entre copropriétaires et partage de bonnes pratiques.
- **Newsletter** : Envoi régulier d’informations importantes (travaux, deadlines, etc.).

### 🤖 **Automatisation &amp; IA**

- **Assistants IA** : Modèles dédiés pour optimiser la gestion (classification de documents, réponses aux questions fréquentes).
- **Automatisation des tâches** : Réduction des tâches manuelles répétitives.

### 🌐 **Réseau &amp; Collaboration**

- **Réseau solidaire** : Rejoignez une communauté de copropriétés pour partager des ressources et des conseils.
- **Connexion aux services d’aides** : Intégration avec les associations (ANCC, CLCV, ADIL) et les services publics.

---

## 🛠️ Technologies


| Technologie      | Usage                      | Lien                                        |
| ---------------- | -------------------------- | ------------------------------------------- |
| **Next.js**      | Framework front-end        | [nextjs.org](https://nextjs.org/)           |
| **Supabase**     | Base de données &amp; Auth | [supabase.com](https://supabase.com/)       |
| **Tailwind CSS** | Styling                    | [tailwindcss.com](https://tailwindcss.com/) |
| **Lucide React** | Icônes                     | [lucide.dev](https://lucide.dev/)           |
| **Vercel**       | Hébergement (optionnel)    | [vercel.com](https://vercel.com/)           |


---

## 📥 Installation

### Prérequis

- Node.js (v18+)
- npm ou yarn
- Un compte [Supabase](https://supabase.com/) (pour la base de données)

### Étapes

1. **Cloner le dépôt** :
  ```bash
   git clone https://github.com/hdavid-13/CoprOS.git
   cd CoprOS
  ```
2. **Installer les dépendances** :
  ```bash
   npm install
   # ou
   yarn install
  ```
3. **Configurer les variables d’environnement** :
  - Copiez le fichier `.env.example` en `.env.local`.
  - Remplissez les clés **Supabase** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
  - Ajoutez d’autres variables si nécessaire (ex: clés API pour les services externes).
4. **Lancer l’application** :
  ```bash
   npm run dev
   # ou
   yarn dev
  ```

   L’application sera accessible à [http://localhost:3000](http://localhost:3000).

---

## 🌍 Déploiement

### Option 1 : Hébergement gratuit sur Vercel

1. Poussez votre code sur un dépôt GitHub/GitLab.
2. Connectez-vous à [Vercel](https://vercel.com/) et importez le dépôt.
3. Configurez les variables d’environnement dans les paramètres du projet.
4. Déployez !

### Option 2 : Auto-hébergement

- **Docker** : Un `Dockerfile` est fourni pour faciliter le déploiement.
- **Autres plateformes** : CoprOS est compatible avec Netlify, Railway, ou tout service supportant Next.js.

### Option 3 : Rejoindre le réseau CoprOS

- Hébergez votre copropriété sur notre instance partagée (gratuit pour les copropriétés bénévoles).
- Contactez-nous via [GitHub Discussions](https://github.com/hdavid-13/CoprOS/discussions) pour plus d’informations.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment aider :

1. **Signaler un bug** : Ouvrez une [issue](https://github.com/hdavid-13/CoprOS/issues) avec une description claire.
2. **Proposer une fonctionnalité** : Partagez vos idées dans les [discussions](https://github.com/hdavid-13/CoprOS/discussions).
3. **Contribuer au code** :
  - Forkez le dépôt.
  - Créez une branche (`git checkout -b feature/ma-fonctionnalité`).
  - Commitez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`).
  - Poussez vers la branche (`git push origin feature/ma-fonctionnalité`).
  - Ouvrez une [Pull Request](https://github.com/hdavid-13/CoprOS/pulls).

