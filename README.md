## Les membres du groupe:
### RAZAIARIMIHAJASOA Tsantaniony Fankasitrahana       ESIIA     numero 11
### RANDRIAMIARISOA Henintsoa Lucas                    ESIIA     numero 17
  #### Rôles: Recherche et analyse des racines (fototeny) malgaches et de leurs dérivés pour une lemmatisation précise. Classification automatique de la tonalité des textes (Positif/Négatif) adaptée aux spécificités linguistiques locales


### RAKOTOHARIMALALA Ny Hasina Sedera                  ESIIA      numero 24
### RASOLONJATOVO Soatina Andrianina                   IMTICIA    numero 08
  ### Rôles: Analyse morphologique permettant de réduire les mots dérivés à leur racine commune (fototeny) pour optimiser la recherche et la traduction. Module de conversion de texte en parole permettant une lecture audio fluide des phrases rédigées en malgache


### RABEANTOANDRO Mirantsoa Adrianna                   ESIIA      numero 08
   ### Rôles :Création d'un serveur performant capable de centraliser les modules d'IA (Autocomplétion, Traduction, Sentiment) et de répondre aux requêtes du Frontend. Mise en place d'un pipeline d'automatisation pour le déploiement du projet (sur Hugging Face Spaces ou serveur local.

### RAKOTOMALALA Nirinifitiavana Sarobidy              ESIIA      numero 21
  ### Rôles : Extraction du corpus Wikipedia Malagasy (via Hugging Face Datasets. Nettoyage approfondi. Sélection du modèle DistilGPT2 pour son équilibre entre performance linguistique et légèreté. Entraînement par transfert (Fine-tuning) sur le corpus malgache pour capturer les nu


## Documentation Technique
  ### Dataset 
     #### [teny_malagasy.org](https://fr.scribd.com/document/687960505/04-Lesona-Malagasy-3eme-Sujets-Types-Corriges)

## Liste et breve description des fonctionnalite IA 
  ### Module de Lemmatisation
   #### Description :
  Analyse la structure des mots malgaches pour extraire leur racine (Lema) en supprimant les affixes (préfixes, suffixes, infixes).

   #### Technologie :
 Algorithme basé sur des règles morphologiques spécifiques à la langue malgache (gestion des préfixes courants comme mi-, man-, maha-).

   #### Rôle dans le projet : * Normalisation : Transforme les verbes conjugués ou les noms dérivés en une forme de base unique.

  ### Analyse de Sentiment (Sentiment Analysis)
   #### Description : 
   Évalue la tonalité émotionnelle du texte saisi (Positif, Négatif ou Neutre).

   #### Technologie : 
   Approche Bag of Words (Sac de mots) utilisant un lexique de polarité malgache. Le système détecte les mots-clés émotionnels et gère les inversions de sens (ex: gestion de la négation "tsy").

   #### Avantage : 
 Aide le rédacteur à adapter son ton en fonction de l'objectif de son message.

  ### Autocomplétion Prédictive (Next Word Prediction)
    #### Description : Suggère les trois mots les plus probables pour la suite de la phrase en temps réel.

   #### Technologie : 
   Basée sur le modèle DistilGPT2, un réseau de neurones de type Transformer entraîné sur le corpus Wikipedia Malagasy.

  #### Avantage : 
  Accélère la saisie et aide à respecter la structure grammaticale de la langue

## Bibliographie
 ### Dataset 
     #### teny_malagasy.org
     ### Hugging Face - Wikimedia/Wikipedia
