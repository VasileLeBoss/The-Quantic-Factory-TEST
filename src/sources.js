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
          record.horaires_lundi?.trim() ? `Lundi: ${record.horaires_lundi}` : null,
          record.horaires_mardi?.trim() ? `Mardi: ${record.horaires_mardi}` : null,
          record.horaires_mercredi?.trim() ? `Mercredi: ${record.horaires_mercredi}` : null,
          record.horaires_jeudi?.trim() ? `Jeudi: ${record.horaires_jeudi}` : null,
          record.horaires_vendredi?.trim() ? `Vendredi: ${record.horaires_vendredi}` : null,
          record.horaires_samedi?.trim() ? `Samedi: ${record.horaires_samedi}` : null,
          record.horaires_dimanche?.trim() ? `Dimanche: ${record.horaires_dimanche}` : null,
        ]
          .filter(Boolean)
          .join("\n") ||
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
          record.horaires_lundi?.trim() ? `Lundi: ${record.horaires_lundi}` : null,
          record.horaires_mardi?.trim() ? `Mardi: ${record.horaires_mardi}` : null,
          record.horaires_mercredi?.trim() ? `Mercredi: ${record.horaires_mercredi}` : null,
          record.horaires_jeudi?.trim() ? `Jeudi: ${record.horaires_jeudi}` : null,
          record.horaires_vendredi?.trim() ? `Vendredi: ${record.horaires_vendredi}` : null,
          record.horaires_samedi?.trim() ? `Samedi: ${record.horaires_samedi}` : null,
          record.horaires_dimanche?.trim() ? `Dimanche: ${record.horaires_dimanche}` : null,
        ]
          .filter(Boolean)
          .join("\n") ||
        record.statut_ouverture ||
        "voir site",
      dataset: "Équipements",
    }),
  },
];
