export const OPEN_DATA_SOURCES = [
  {
    name: "Espaces verts",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records",
    adapter: (record) => ({
      id: record.identifiant ?? crypto.randomUUID(),
      tag: 'espaces_verts',
      name: record.nom?.toLowerCase() || "(sans nom)",
      kind: record.type || "Espace vert",
      payant: "Non", 
      address: record.adresse?.toLowerCase() || "Paris",
      arrondissement: record.arrondissement || "?",

      openDays:
        record.horaires_periode ||
        [
          record.horaires_lundi,
          record.horaires_mardi,
          record.horaires_mercredi,
          record.horaires_jeudi,
          record.horaires_vendredi,
          record.horaires_samedi,
          record.horaires_dimanche,
        ]
          .filter(Boolean)
          .join(", ") ||
        record.statut_ouverture ||
        "Voir site",
      dataset: "Espaces verts",
    }),
  },
  {
    name: "Équipements",
    
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records",
    adapter: (record) => ({
      id: record.identifiant ?? crypto.randomUUID(),
      tag: 'equipements',
      name: record.nom?.toLowerCase() || "(sans nom)",
      kind: record.type || "Équipement",
      payant: record.payant === "Oui" ? "Oui" : "Non",
      address: record.adresse?.toLowerCase() || "Paris",
      arrondissement: record.arrondissement || "?",
      openDays:
        record.horaires_periode ||
        [
          record.horaires_lundi,
          record.horaires_mardi,
          record.horaires_mercredi,
          record.horaires_jeudi,
          record.horaires_vendredi,
          record.horaires_samedi,
          record.horaires_dimanche,
        ]
          .filter(Boolean)
          .join(", ") ||
        record.statut_ouverture ||
        "voir site",
      dataset: "Équipements",
    }),
  },
];
