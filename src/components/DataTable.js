import './css/DataTable.css';
import Modal from './Modal'; 
import { useState } from 'react';

function DataTable({ rows, loading }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th><span>Nom</span></th>
                        
                        <th><span><ion-icon name="location-outline"></ion-icon>Adresse</span></th>
                        <th><span>Arr.</span></th>
                        <th><span><ion-icon name="leaf-outline"></ion-icon>Type</span></th>
                        {/* <th>Dataset</th> */}
                        <th><span><ion-icon name="cash-outline"></ion-icon>Payant</span></th>
                        
                        {/* <th>Ouverture</th> */}
                        
                        {/* <th>[dataset]</th> */}
                    </tr>
                </thead>
                {loading ? (
                    <tbody className="animate-pulse">
                        {[...Array(14)].map((_, i) => (
                            <tr key={i}>
                                {[...Array(5)].map((_, j) => (
                                    <td key={j}><span></span></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody className='loaded-data'>
                        {rows.length === 0 ? (
                            <tr className="no-data">
                                <td colSpan={5}>Aucune donnée disponible</td>
                            </tr>
                        ) : (
                            rows.map((r, idx) => (
                                <tr key={`${r.id || r.name}-${r.type}-${r.arrondissement}-${idx}`} 
                                    onClick={() => {
                                        setModalContent(r);
                                        setIsModalOpen(true);
                                        }}
                                    >
                                        
                                    <td>{r.name}</td>
                                    <td>{r.address}</td>
                                    <td>{r.arrondissement}</td>
                                    <td>{r.kind}</td>
                                    {/* <td>{r.dataset}</td> */}
                                    <td>{r.payant}</td>
                                    
                                    {/* <td>{r.openDays}</td> */}
                                    {/* <td>{r.dataset}</td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                )}
            </table>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false)
                    setModalContent(null);
                }} 
                content={modalContent} 
            />
        </div>
    );
}

export default DataTable;