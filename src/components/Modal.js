import { useState } from 'react';

import './css/Modal.css';

function Modal({ isOpen, onClose, content }) {
    const [isCopied, setIsCopied] = useState(false);


    if (!isOpen || !content) return null;



    function copie(text) {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    }

    return (
        <div className="modal-overlay" onClick={onClose}>

        <div className="modal-content " onClick={(e) => e.stopPropagation()}>

            <div className='badge-container'>
                <div className={`badge ${content.tag}`}>
                    <p>{content.dataset}</p>
                </div>
                <div className={`badge ${content.payant}`}>
                    { content.payant === "Oui" ? (
                        <p>Payant</p>
                    ) : (
                        <p>Gratuit</p>
                    )}
                </div>
            </div>

            <button className="modal-close" onClick={onClose}>
                <ion-icon name="close-outline"></ion-icon>
            </button>

            <div className="modal-body">
                <h2>{content.name}</h2>
            
                <div className='info'>
                    <div className='label'><span>Type</span></div>
                    
                    <p className='value'>{content.kind}</p>
                </div>
                <div className='info'>
                    <div className='label'><span>Adresse</span></div>
                    <p className='value'>{content.address}</p>

                    <button className='copy-button' onClick={() => copie(content.address)}>
                        {isCopied ? (
                            <>
                                <ion-icon name="checkmark-outline"></ion-icon> 
                            </>
                        ) : (
                            <>
                                <ion-icon name="copy-outline"></ion-icon>
                            </>
                        )}
                    </button>
                </div>
                <div className='info'>
                    <div className='label'><span>Arrondissement</span></div>
                    <p className='value'>{content.arrondissement}</p>
                </div>
                
                <div className='info'>
                    <div className='label'><span>Horaires d'ouvertures</span></div>
                    <p className='value'>
                    {content.openDays.split("\n").map((line, idx) => (
                        <span key={idx}>
                        {line}
                        <br />
                        </span>
                    ))}
                    </p>

                </div>

            {/* <p><strong>Type :</strong> </p>
            <p><strong>Arrondissement :</strong> {content.arrondissement}</p>
            <p><strong>Adresse :</strong> {content.address}</p>
            <p><strong>Payant :</strong> {content.payant}</p> */}
            </div>
        </div>
        </div>
    );
}

export default Modal;
