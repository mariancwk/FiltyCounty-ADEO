# FiltyCounty-ADEO

Pour lancer les test unitaires :

```
npm run test
```

Commandes disponibles :

```
node app.js --filter=xx
node app.js --count
```

## Architecture

L'application repose sur plusieurs principes et patterns.

```
┌──────────────────────────────────────────┐
│                   CLI                    │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│             Argument Parser              │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│            Command Dispatcher            │
│                                          │
│                Registry                  │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│                Commands                  │
│                                          │
│        ┌──────────┬──────────┐           │
│        │          │          │           │
│      Count      Import     ...           │
│                                          │
│              Business Logic              │
└───────────────────┬──────────────────────┘
                    │
                    │
                    ▼
           ┌──────────────────┐
           │    Data Source   │
           └──────────────────┘
```

## Command Pattern & Dispatcher

Les commandes sont regroupées dans un registry.

Le dispatcher n'a pas besoin de connaître la logique interne de chaque commande : il se contente de trouver la commande correspondant à l'argument fourni et de l'exécuter.
Cela facilite l'ajout de nouvelles commandes sans modifier le mécanisme de dispatch, tout en rendant le code plus modulaire et plus facile à maintenir.

```
      CLI
       │
       │ "--count"
       ▼
┌──────────────┐
│  Dispatcher  │
└──────┬───────┘
       │
       │ recherche "count"
       ▼
┌──────────────┐
│   Registry   │
└──────┬───────┘
       │
       │ retourne
       ▼
┌──────────────┐
│ImportCommand │
└──────┬───────┘
       │
       │ execute
       ▼
    Résultat
```

## Injection de dépendance

L'injection de dépendance permet de séparer la logique métier de la source de données utilisée. La logique métier travaille avec une abstraction plutôt qu'avec directement les données de production.

Cela permet notamment de remplacer facilement la source de données selon le contexte :

- production
- développement
- tests

Dans le cas des tests unitaires, les commandes sont donc exécutées réellement, mais utilisent des données mockées. Les tests vérifient ainsi le comportement réel des commandes sans dépendre du jeu de données de production.

## Tests

Les tests sont réalisés avec Jest.
La méthodologie utilisée est TDD (Test-Driven Development), avec une écriture des scénarios inspirée du BDD (Behavior-Driven Development).

Les tests suivent une structure lisible :

- Given → préparation du contexte (ARRANGE)
- When → exécution du comportement (ACT)
- Then → vérification du résultat (ASSERT)

L'objectif est de rendre les tests compréhensibles comme des scénarios métier, y compris pour une personne qui ne connaît pas nécessairement l'implémentation.

### Data Builder

Les jeux de données de test sont construits grâce à un Test Data Builder.

Ce pattern permet de :

- rendre les fixtures lisibles
- éviter de répéter la structure complète des objets
- simplifier la création de scénarios
- faciliter l'ajout de nouveaux cas de test
- masquer les détails techniques de construction des données

## Evolutions

L'architecture cherche à favoriser l'extension par ajout plutôt que la modification de composants existants.
L'objectif n'est pas de sur-architecturer une CLI de petite taille, mais de travailler sur des points d'évolution identifiés lorsque la complexité du projet augmenterait.

### Command loader

Une piste d'évolution serait de mettre en place un command loader chargé de parcourir automatiquement le dossier commands et de construire le registry.
Le loader pourrait alors découvrir automatiquement les commandes disponibles.

### Data source

Comme les données sont actuellement chargées depuis un fichier local, une piste d'évolution serait d'introduire un service dédié à la récupération des données.

Ce service pourrait implémenter une interface TypeScript commune, par exemple DataSource, permettant à la logique métier de rester indépendante de la provenance des données.

On pourrait ainsi avoir plusieurs implémentations, comme FileDataSource pour les données locales, ApiDataSource pour une API externe ou encore MockDataSource pour les tests.
Cette approche permettrait d'ajouter une nouvelle source de données sans modifier la logique métier existante.

## IA

L'IA a été utilisée comme outil d'assistance au développement, notamment pour :

- accélérer la création de certains utilitaires
- explorer différentes solutions d'implémentation
- effectuer des reviews de code
- identifier des possibilités de refactoring
- challenger certains choix techniques

Les propositions générées ont ensuite été analysées, testées et adaptées afin de respecter les contraintes et les choix architecturaux du projet.
L'IA est donc utilisée comme un outil d'accélération et de réflexion, et non comme un substitut à la conception ou à la validation du code.
