// src/components/Filter.jsx
import { useState } from "react";
import './css/Filter.css';

function Filter({ totalCount = 0, onFilterChange = () => {}}) {
  const [kind, setKind] = useState("");
  const [arrondissement, setArrondissement] = useState("");
  const [payant, setPayant] = useState("");

  const TYPES = [
    'Promenades ouvertes','Décorations sur la voie publique','Bois','Jardins grandes institutions',"Jardins d'Etat","Jardinets décoratifs","Cimetières",
    "Cimetières non parisiens","Ephémères, partagés, pédagogiques","Jardins privatifs","Baignade extérieure","Bains-douches","Bibliothèque","Brumisateur",
    "Découverte et Initiation","Lieux de culte","Mairie d'arrondissement","Musée","Ombrière pérenne","Ombrière temporaire","Piscine","Terrain de boules"
  ];


  const send = (next) => {
    onFilterChange({
      kind: next?.kind ?? kind,
      arrondissement: next?.arrondissement ?? arrondissement,
      payant: next?.payant ?? payant
    });
  };

  return (
    <div className="filter">
      <h3 className="total-count">{totalCount} enregistrements</h3>
      <h2>Filtres</h2>



       <div className="filter-item">
        <label>Type</label>
        <select value={kind} onChange={(e) => { const v = e.target.value; setKind(v); send({ kind: v }); }} >
          <option value="">Tous</option>
          {TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

      </div>

      <div className="filter-item">
        <label>Arrondissement</label>
        <select 
          value={arrondissement}
          onChange={(e) => { 
            const v = e.target.value; 
            setArrondissement(v); 
            send({ arrondissement: v }); 
          }}
        >
          <option value="">Tous</option>
          {[...Array(20)].map((_, i) => {
            const val = i + 1;
            const formatted = val < 10 ? `7500${val}` : `750${val}`;
            return <option key={val} value={formatted}>{formatted}</option>;
          })}
        </select>
      </div>


      <div className="filter-item">
        <label>Payant</label>
        <select
          value={payant}
          onChange={(e) => { const v = e.target.value; setPayant(v); send({ payant: v }); }}
        >
          <option value="">Tous</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>

        </select>
      </div>

      <div>
        <button onClick={() => {  setKind(""); setArrondissement(""); setPayant(""); send({ search: "", kind: "", arrondissement: "", payant: "" }); }}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
}

export default Filter;
