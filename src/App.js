import { useEffect, useState } from "react";
import './App.css';
import Header from './components/Header';
import DataTable from './components/DataTable';
import Filter from './components/Filter';
import { OPEN_DATA_SOURCES } from './sources';

function App() {
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 100;

function buildRefineQuery(filters, src) {
  const refinements = [];

  // Champs disponibles par dataset fait parce que les API sont différentes
  // et n'ont pas les mêmes champs pour les filtres
  const datasetFields = {
    // payant n'existe pas mais pour uniformiser le code et éviter d'avoir des 
    // enregistrements payant d'espaces verts quand on filtre sur payant OUi
    "Espaces verts": ["type", "arrondissement"], 
    "Équipements": ["type", "arrondissement", "payant"]
  };

  // Récupérer les champs disponibles pour la source actuelle
  const fields = datasetFields[src.name] || [];

  // Fonction utilitaire pour encoder les valeurs car l'API attend un format spécifique pour les espaces et caractères spéciaux
  // Exemple : "Espace vert" doit devenir "Espace%20vert" :( 
  const encodeValue = (val) => {
    if (!val) return "";
    const str = /\s|[^\w]/.test(val) ? `"${val}"` : val;
    return encodeURIComponent(str);
  };

  // Filtre type 
  if (filters.kind && fields.includes("type")) {
    refinements.push(`refine=type:${encodeValue(filters.kind)}`);
  }

  // Filtre arrondissement
  if (filters.arrondissement && fields.includes("arrondissement")) {
    refinements.push(`refine=arrondissement:${encodeValue(filters.arrondissement)}`);
  }

  // Filtre payant
  if (filters.payant && fields.includes("payant")) {
    refinements.push(`refine=payant:${encodeValue(filters.payant)}`);
  }

  return refinements.join("&");
}




  useEffect(() => {

    async function fetchData( filters = {}) {
    setLoading(true);
    try {
      const results = await Promise.all(
        OPEN_DATA_SOURCES.map(async (src) => {

          // Cas particulier : si on filtre sur payant = Oui, on ne doit pas
          // récupérer des espaces verts car ils sont tous gratuits
          if (filters.payant==="Oui" && src.name === "Espaces verts") {
            return { count: 0, rows: [] }; 
          }

          // Construire l'URL + et filtres
          let url = `${src.url}?limit=${PAGE_SIZE}`;
          const refineQuery = buildRefineQuery(filters, src);
          if (refineQuery) url += `&${refineQuery}`;

          //debug
          console.log("[DEBUG] Fetching URL:", url);

          const res = await fetch(url);
          const json = await res.json();
          const records = Array.isArray(json.results) ? json.results : [];

          return {
            count: json.total_count ?? records.length,
            // adapter les données au format interne et filtrer les enregistrements sans nom
            rows: records.map(src.adapter).filter(r => !!r.name),
          };
        })
      );

      // Fusionner tous les résultats (all datasets)
      let allRows = results.flatMap(r => r.rows);

      // affecter les données
      setRows(allRows);
      // calculer le total des enregistrements
      setTotalCount(results.reduce((sum, r) => sum + r.count, 0));
    } catch (err) {
      console.error("Erreur fetchData:", err);
    } finally {
      setLoading(false);
    }
  }

    fetchData( filters);
  }, [filters]);

  return (
    <div className="App">
      <Header />
      <div className='data-container'>
          <Filter onFilterChange={setFilters} totalCount={totalCount} rows={rows} />        
          <DataTable rows={rows} loading={loading} />
      </div>
    </div>
  );
}

export default App;
