import './css/DataTable.css';

function DataTable({ rows, loading }) {


    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Type</th>
                        {/* <th>Dataset</th> */}
                        <th>Payant</th>
                        <th>Arr.</th>
                        {/* <th>Ouverture</th> */}
                        <th>Adresse</th>
                        <th>[dataset]</th>
                    </tr>
                </thead>
                {loading ? (
                    <tbody className="animate-pulse">
                        {[...Array(12)].map((_, i) => (
                            <tr key={i}>
                                {[...Array(6)].map((_, j) => (
                                    <td key={j}><span></span></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className='loaded-data'>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={6}>Aucune donnée disponible</td>
                            </tr>
                        ) : (
                            rows.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.name}</td>
                                    <td>{r.kind}</td>
                                    {/* <td>{r.dataset}</td> */}
                                    <td>{r.payant}</td>
                                    <td>{r.arrondissement}</td>
                                    {/* <td>{r.openDays}</td> */}
                                    <td>{r.address}</td>
                                    <td>{r.dataset}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default DataTable;