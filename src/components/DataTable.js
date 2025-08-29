import './css/DataTable.css';
import { useEffect, useState } from "react";


function DataTable({OPEN_DATA_SOURCES}) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const all = [];
        for (const src of OPEN_DATA_SOURCES) {

            // recuperation des données
            const res = await fetch(src.url); // fetch avec l'url du dataset
            const json = await res.json();

            const records = Array.isArray(json.results) ? json.results : [];

            // adaptation des données
            const adapted = records.map(src.adapter).filter(r => !!r.name);
            all.push(...adapted);

            // debug
            console.log(`Fetched ${records.length} records from ${src.label}`);
        }
        // on affect les données
        setRows(all);
        }

        fetchData();
    }, [OPEN_DATA_SOURCES]);

    return (
        <table className="data-table">
        <thead>
            <tr className="bg-gray-100">
            <th>Nom</th>
            <th>Type</th>
            {/* <th>Dataset</th> */}
            <th>Prix</th>
            <th>Arr.</th>
            <th>Ouverture</th>
            <th>Adresse</th>
            </tr>
        </thead>
        <tbody>
            {rows.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
                <td>{r.name}</td>
                <td>{r.kind}</td>
                {/* <td>{r.dataset}</td> */}
                <td>{r.price}</td>
                <td>{r.arrondissement !== "?" ? `${r.arrondissement}` : "—"}</td>
                <td>{r.openDays}</td>
                <td>{r.address}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}

export default DataTable;