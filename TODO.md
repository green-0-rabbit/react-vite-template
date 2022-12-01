# Problématique

- Récupérer des informations de différentes sources;
- Editer ces informations;
- Personnaliser le format d'affichage et d'édition des inputs lors de l'utisation du formulaire
- Rajouter des fenêtres modales pour l'édition de certains inputs
- Lier sous forme de sous groupe les données du même contexte
- Rendre l'ensemble ou une partie des inputs du formulaire éditable en fonction d'un rôle basé sur les accès utilisateurs (rbac)
- Proposer des autocomplete pour certains types de données référencées dans la base de données;
- Sauvégarder les données vers une source de données (serveur, localestorage, sessionstorage, cookie, cache, state management)

# Requis

## Récupérer des informations de types:

- string;
- number;
- boolean;
- array<any>;
- object;

## Afficher et editer des informations sous forme de: [pending]

- text field (register, setValue);
- checkbox (register, setValue);
- radio button (register, setValue)
- select (register, setValue);
- range (register, setValue);
- switch (register, setValue);
- text field with increment button (register, setValue);
- text fields lists (register, setValue, useFields)

## Affichage et édition conditionnelle (avec stockage de la condition): useFormContext => composant imbriqué | control as prop => composant non imbriqué

### Même groupe:

    - select (Debut/en cours/Terminé) : (register name structure ,option: onChange()),(usewatch(), getValues(), setValue())
        - En cours -> text field est masqué
        - Terminé -> text field est affiché

### Groupe différent:

- checkbox button (is Template ? Oui/Non) dans le groupe A : (register name structure ,option: onChange()), (usewatch(), getValues(), setValue()) 
   - Oui -> text fields Durée et Commencer sont affichés dans le groupe B  
   - Non -> text fields Durée et Commencer sont cachés dans le groupe B

## Affichage conditionnelle (sans stockage de la condition): useFormContext => composant imbriqué | control as prop => composant non imbriqué

### Même groupe:

    - radio button (choix A/B/C) : (register name structure ,option: onChange()), (usewatch(), getValues(), setValue())
        - A -> text field est activé et de type text
        - B -> text field est activé et de type number
        - C -> text field est désactivé
    - checkbox button (date de fin ? Oui/Non) : (register name structure ,option: onChange() ), (usewatch(), getValues(), setValue())
        - Oui -> text field (Date de fin es activé)
        - Non -> text field est caché

## Validation indépendante (pendant le remplissage): [pending]

- text field (register options: required, minLength & maxLength...); 
- range (register options: required, min & max...);

## Validation indépendante (lors de la soumission): [pending]

- text field (register options: required, minLength & maxLength...); [done]
- range (register options: required, min & max...);

## Validation conditionnelle (pendant le remplissage):

### Même groupe:

- checkbox button (Majeur ? Oui/Non) dans le groupe A : (register name structure ,option: onChange(), validate), (getValues()) - Oui -> text field (min <= 18) dans le groupe B - Non -> text field (max = 17) dans le groupe B

### Groupe différent: useFormContext => composant imbriqué | control as prop => composant non imbriqué

- checkbox button (Majeur ? Oui/Non) : (register name structure ,option: onChange(), validate), (getValues()) - Oui -> text field (min <= 18) - Non -> text field (max = 17)

## Validation conditionnelle (lors de la soumission):

- fields required vide:
  - un message d'erreur est affiché
- temps de remplissage dépassé
  - un message d'erreur est affiché
- email non valide:
  - un message d'erreur est affiché
- mot de passe ne respectant pas la casse
  - un message d'erreur est affiché
