
import './App.css';
import Header from './components/Header';
// import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import DataTable from './components/DataTable';

const OPEN_DATA_SOURCES = [
   {
    key: "espaces_verts",
    label: "Espaces verts",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=20",
    adapter: (record) => ({
      id: record.identifiant ?? crypto.randomUUID(),
      name: record.nom.toLowerCase() || "(sans nom)",
      kind: record.categorie || record.type || "Espace vert",
      price: "Gratuit",
      address: record.adresse || "Paris",
      arrondissement: record.arrondissement || "?",
      openDays: record.horaires_periode || "tous les jours",
      dataset: "Espaces verts",
      geo: record.geo_point_2d
    })
  }, {
        key: "equipements",
        label: "Équipements & activités",
        url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=20",
        adapter: (record) => ({
            id: record.id ?? record.objectid ?? crypto.randomUUID(),
            name: record.nom.toLowerCase() || "(sans nom)",
            kind: record.kind || record.categorie || record.type || record.discipline || "Équipement",
            price: record.gratuit,
            address: record.address || record.adresse || record.lieu || "Paris",
            arrondissement: record.arrondissement || "?",
            openDays: record.openDays || record.horaires || record.ouverture || record.plages_horaires || "voir site",
            dataset: "Équipements"
        })
    }, 
  //   {
  //   key: "fontaines",
  //   label: "Fontaines à boire",
  //   url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=20",
  //   adapter: (record) => ({
  //     id: record.gid ?? crypto.randomUUID(),
  //     name: record.type_objet.toLowerCase() || "Fontaine",
  //     kind: record.modele || "Fontaine",
  //     price: "Gratuit",
  //     address: record.voie.toLowerCase() || "inconnue",
  //     arrondissement: record.commune.toLowerCase() || "?",
  //     openDays: "24/7",
  //     dataset: "Fontaines",
  //     geo: record.geo_point_2d
  //   })
  // }
];


function App() {
  return (
    <div className="App">
        <Header />
        <DataTable OPEN_DATA_SOURCES={OPEN_DATA_SOURCES} />
    </div>
  );
}

export default App;
