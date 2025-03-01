# Projet Next.js avec CI/CD complet
![CircleCI](https://img.shields.io/badge/CI-%23161616.svg?style=for-the-badge&logo=CircleCI&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

Ce projet implémente une application de calculatrice basée sur Next.js avec un pipeline CI/CD complet utilisant CircleCI et Vercel. La configuration suit la méthodologie GitFlow et automatise les processus de build, test et déploiement.

## 📋 Table des matières

- [Architecture du projet](#architecture-du-projet)
- [Stratégie de branchage GitFlow](#stratégie-de-branchage-gitflow)
- [Pipeline CI/CD](#pipeline-cicd)
- [Configuration CircleCI](#configuration-circleci)
- [Environnements de déploiement](#environnements-de-déploiement)
- [Guide pour les développeurs](#guide-pour-les-développeurs)
- [Variables d'environnement](#variables-denvironnement)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Troubleshooting](#troubleshooting)

## 🏗️ Architecture du projet

Le projet utilise les technologies suivantes :

- **Frontend** : Next.js avec TypeScript
- **Tests** : Jest et React Testing Library
- **CI/CD** : CircleCI
- **Déploiement** : Vercel
- **Qualité de code** : ESLint, Prettier

```
projet/
├── .circleci/               # Configuration CircleCI
│   └── config.yml           # Fichier de configuration principal
├── __tests__/               # Tests unitaires et d'intégration
├── components/              # Composants React réutilisables
├── pages/                   # Pages Next.js
├── public/                  # Fichiers statiques
├── styles/                  # Styles CSS/SCSS
└── package.json             # Dépendances et scripts
```

## 🌿 Stratégie de branchage GitFlow

Notre workflow GitFlow se compose des branches suivantes :

### Branches principales
- **`master`** : Code en production, toujours stable
- **`develop`** : Branche principale de développement
- **`integration`** : Branche intermédiaire pour l'intégration et les tests avant production

### Branches temporaires
- **`feature/*`** : Nouvelles fonctionnalités (ex: `feature/login`)
- **`hotfix/*`** : Corrections urgentes pour la production (ex: `hotfix/critical-bug`)

### Flux de travail

```
                         développement
                               ↓
feature/login → develop → integration → master
                   ↑                     ↑
                   └── hotfix/bug ───────┘
```

1. Les développeurs créent des branches `feature/*` à partir de `develop`
2. Les features terminées sont mergées dans `develop`
3. Lorsque plusieurs features sont prêtes, `develop` est mergée dans `integration`
4. Après validation en environnement d'intégration, `integration` est mergée dans `master`
5. Pour les bugs critiques, une branche `hotfix/*` est créée à partir de `master` et mergée dans `master` et `develop`

## 🔄 Pipeline CI/CD

Notre pipeline CI/CD est organisé en trois étapes principales :

### 1. Build
- **Installation des dépendances** : Préparation de l'environnement
- **Analyse de code** : Vérification de la qualité du code
- **Build** : Compilation et construction des artefacts

### 2. Tests
- **Tests unitaires** : Validation des composants individuels
- **Tests d'intégration** : Vérification des interactions entre composants
- **Tests de régression** : Vérification de la non-régression des fonctionnalités
- **Tests d'accessibilité** : Conformité aux normes d'accessibilité
- **Tests de sécurité** : Analyse des vulnérabilités

### 3. Déploiement
- **Déploiement en développement** : Pour la branche `develop`
- **Déploiement en intégration** : Pour la branche `integration`
- **Déploiement en production** : Pour la branche `master` (avec approbation manuelle)
- **Déploiement de prévisualisation de hotfix** : Pour les branches `hotfix/*`

Voici la représentation visuelle du pipeline :

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│    Build    │────▶│    Lint     │────▶│ Unit Tests  │────▶│ Integration │
│             │     │             │     │             │     │    Tests    │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                      ┌────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│                                 │     │                                 │
│       Feature Branch?           │     │          Master Branch?         │
│                                 │     │                                 │
└──────────────┬──────────────────┘     └──────────────┬──────────────────┘
               │                                       │
               ▼                                       ▼
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│                                 │     │                                 │
│     Deploy Preview Environment  │     │      Deploy to Staging          │
│                                 │     │                                 │
└─────────────────────────────────┘     └──────────────┬──────────────────┘
                                                       │
                                                       ▼
                                        ┌─────────────────────────────────┐
                                        │                                 │
                                        │       Manual Approval           │
                                        │                                 │
                                        └──────────────┬──────────────────┘
                                                       │
                                                       ▼
                                        ┌─────────────────────────────────┐
                                        │                                 │
                                        │     Deploy to Production        │
                                        │                                 │
                                        └─────────────────────────────────┘
```

## ⚙️ Configuration CircleCI

Le fichier `.circleci/config.yml` définit l'ensemble du pipeline CI/CD et est structuré comme suit :

### Commandes réutilisables

Des commandes standardisées pour :
- `setup_environment` : Préparation de l'environnement Node.js
- `install_vercel_cli` : Installation de l'outil CLI Vercel
- `save_test_results` : Sauvegarde des résultats des tests
- `cache_next_build` et `restore_next_build` : Gestion du cache pour optimiser les builds

### Jobs

Des tâches spécifiques pour :
- Phase de build : `install_dependencies`, `code_analysis`, `build_application`  
- Phase de tests : `unit_tests`, `integration_tests`, `regression_tests`, etc.
- Phase de déploiement : `deploy_development`, `deploy_integration`, `deploy_production`

### Workflows

Deux workflows principaux :
- `gitflow_pipeline` : Workflow standard pour le développement
- `hotfix_pipeline` : Workflow accéléré pour les correctifs urgents

### Optimisations

- **Mise en cache** : Pour les dépendances npm, les builds Next.js, ESLint, etc.
- **Filtrage par branche** : Exécution conditionnelle des jobs selon le type de branche
- **Parallélisation** : Exécution simultanée des jobs indépendants
- **Persistance des artefacts** : Conservation des résultats entre les jobs

## 🌐 Environnements de déploiement

Le projet utilise trois environnements distincts :

### Environnement de développement
- **URL** : `https://nextjs-calculator-dev-{branch-name}.vercel.app`
- **Branche source** : `develop` et `hotfix/*`
- **Objectif** : Test des nouvelles fonctionnalités

### Environnement d'intégration
- **URL** : `https://nextjs-calculator-integration.vercel.app`
- **Branche source** : `integration`
- **Objectif** : Validation avant production

### Environnement de production
- **URL** : `https://nextjs-calculator-{CIRCLE_PROJECT_USERNAME}.vercel.app`
- **Branche source** : `master`
- **Objectif** : Application en production

## 👨‍💻 Guide pour les développeurs

### Commencer à développer

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-organisation/nextjs-calculator.git
   cd nextjs-calculator
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Créer une nouvelle branche feature :
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```

4. Développer et tester localement :
   ```bash
   npm run dev     # Lancer le serveur de développement
   npm run test    # Exécuter les tests
   npm run lint    # Vérifier la qualité du code
   ```

5. Soumettre les modifications :
   ```bash
   git add .
   git commit -m "feat: ajouter ma nouvelle fonctionnalité"
   git push -u origin feature/ma-nouvelle-fonctionnalite
   ```

6. Créer une Pull Request vers `develop`

### Créer un hotfix

1. Créer une branche hotfix à partir de master :
   ```bash
   git checkout master
   git pull
   git checkout -b hotfix/bug-critique
   ```

2. Corriger le bug, tester et soumettre :
   ```bash
   # Après correction
   git add .
   git commit -m "fix: corriger le bug critique"
   git push -u origin hotfix/bug-critique
   ```

3. Créer une Pull Request vers `master`

## 🔑 Variables d'environnement

Les variables d'environnement suivantes doivent être configurées dans CircleCI :

| Variable | Description |
|----------|-------------|
| `VERCEL_TOKEN` | Token d'API Vercel pour le déploiement |
| `VERCEL_ORG_ID` | ID de l'organisation Vercel |
| `VERCEL_PROJECT_ID` | ID du projet Vercel |
| `GITHUB_TOKEN` | Token d'API GitHub pour commenter les PR |

Pour configurer ces variables :
1. Aller dans CircleCI > Projet > Project Settings > Environment Variables
2. Ajouter chaque variable avec sa valeur
3. S'assurer que les variables sensibles sont marquées comme protégées

## 🧪 Tests

### Types de tests

- **Tests unitaires** : Tester les composants individuellement
- **Tests d'intégration** : Tester les interactions entre composants
- **Tests de snapshot** : Vérifier la cohérence du rendu des composants
- **Tests end-to-end** : Simuler l'interaction utilisateur

### Exécuter les tests

```bash
# Exécuter tous les tests
npm test

# Exécuter les tests en mode watch
npm run test:watch

# Exécuter les tests avec couverture de code
npm run test:coverage

# Exécuter les tests pour CI (avec JUnit reporter)
npm run test:ci
```

## 🚀 Déploiement

### Déploiement manuel

En cas de besoin, vous pouvez déployer manuellement sur Vercel :

```bash
# Installer Vercel CLI
npm install -g vercel

# Authentification
vercel login

# Déploiement en preview
vercel

# Déploiement en production
vercel --prod
```

### Promotion entre environnements

1. Pour promouvoir du développement à l'intégration :
   ```bash
   git checkout integration
   git merge develop
   git push origin integration
   ```

2. Pour promouvoir de l'intégration à la production :
   ```bash
   git checkout master
   git merge integration
   git push origin master
   ```

## 🔧 Troubleshooting

### Problèmes courants

#### Le build échoue dans CircleCI
- Vérifier les logs d'erreur
- S'assurer que toutes les dépendances sont à jour
- Vérifier que les tests passent localement

#### Problèmes de déploiement Vercel
- Vérifier que les variables d'environnement sont correctement configurées
- S'assurer que le token Vercel est valide
- Consulter les logs de déploiement dans l'interface Vercel

#### Tests qui échouent
- Exécuter les tests localement pour reproduire le problème
- Vérifier les snapshots pour les éventuelles mises à jour nécessaires
- S'assurer que l'environnement de test correspond à celui de CI

#### Problèmes de cache
- Effacer le cache dans CircleCI si nécessaire
- Reconstruire complètement l'application localement

## 📊 Métriques et surveillance

Le projet utilise plusieurs métriques pour surveiller la qualité et les performances :

- **Couverture de code** : Pourcentage du code couvert par les tests
- **Temps de build** : Durée des builds CI/CD
- **Vulnérabilités** : Nombre de vulnérabilités détectées dans les dépendances
- **Performance** : Métriques de performance de l'