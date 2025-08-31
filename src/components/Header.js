import './css/Header.css';

function Header() {
    return(
        <header className='main-header'>
            <h1>The Quantic Factory</h1>
            <p>Exploration des espaces verts et équipements parisiens</p>
            <p >Données issues de <a href="https://opendata.paris.fr/explore/?sort=modified" target="_blank" rel="noreferrer">Open Data Paris</a></p>
        </header>
    );
}

export default Header;