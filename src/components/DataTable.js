import './css/DataTable.css';

function DataTable({ rows, loading }) {


    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th><span>Nom</span></th>
                        <th><span><ion-icon name="leaf-outline"></ion-icon>Type</span></th>
                        {/* <th>Dataset</th> */}
                        <th><span><ion-icon name="cash-outline"></ion-icon>Payant</span></th>
                        <th><span>Arr.</span></th>
                        {/* <th>Ouverture</th> */}
                        <th><span><ion-icon name="location-outline"></ion-icon>Adresse</span></th>
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