# webapp-guides

Les Apprentis Voyageurs — Compagnon Moto (PWA)

Application web progressive (PWA) pensée pour accompagner les motards sur la route sans rien avoir à installer depuis un store, même sans réseau au fond d'un col.

À quoi sert l'application ?

Accès rapide à vos guides : retrouvez vos guides achetés (Le Vercors, La RGA Aller-Retour, Ardèche, Cévennes dans la démo) et parcourez l'ensemble des 28 guides renvoyant directement vers la boutique officielle lesapprentisvoyageurs.fr.

Lecteur étape par étape (J0 à J6) :

Resto : filtre Tout / Midi / Soir, choix mis en avant, téléphone en 1 tap et signalement rapide.

Logement : hébergements conseillés et contacts directs.

Carburant : calcul de marge d'autonomie selon la moto (200 / 250 / 300 / 350 km), stations repérées et suivi du dernier plein.

Étapes : déroulé de la journée, raccourci d'étape (pluie ou fatigue) et suivi du budget (Solo ou Duo ÷2, avec cumul J0–J6).

Mode « En roulant » : accessible via le bouton dédié ou en swippant vers le bas depuis la poignée au-dessus des onglets. Il affiche la prochaine étape, trois gros boutons (Manger, Dormir, Plein) et l'envoi vers DMD2.

Export GPX & DMD2 : génère le fichier .gpx (trace + points d'intérêt) du jour pour l'ouvrir dans DMD2, ou le GPX complet avec rappel d'usage personnel.

Confort de lecture : bouton « A / A+ » (gros textes et touches élargies) et mode Nuit (☾ / ☀) aux couleurs de l'univers Greg.

Comment l'installer sur téléphone (sans barre d'adresse)

Ouvrez la page dans Chrome ou Firefox sur Android.

Touchez le menu ⋮ puis choisissez « Installer l'application » (ou « Ajouter à l'écran d'accueil »).

Lancez l'appli depuis l'icône sur l'écran d'accueil : elle s'ouvre en plein écran et garde les données en mémoire hors-ligne.

Fichiers sur le dépôt GitHub

index.html : l'application complète.

logo-greg.webp : le logo officiel Testé et approuvé par Greg.

manifest.json : configuration PWA (nom, icône, affichage standalone).

sw.js : Service Worker en mode réseau d'abord, cache si hors-ligne.

Mises à jour futures

Une fois manifest.json, sw.js et logo-greg.webp en place, seul index.html a besoin d'être remplacé lors des prochaines modifications. Grâce au cache réseau d'abord, l'application récupère la nouvelle version dès la prochaine ouverture avec du réseau, tout en restant utilisable hors-ligne.
