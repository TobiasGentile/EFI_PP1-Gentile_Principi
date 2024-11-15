import { Fragment } from "react";

const Home = () => {
    return (
        <Fragment>
            <div className="home-container" style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Bienvenidos a TecnoStore</h1>
                <h2>La mejor tienda de celulares y accesorios</h2>
                <p style={{ marginTop: '10px', color: '#555' }}>
                    Encuentra los últimos modelos de smartphones y todo lo que necesitas para tu dispositivo móvil.
                </p>
                <p className="read-the-docs" style={{ marginTop: '20px' }}>
                    Explora nuestras categorías y descubre ofertas exclusivas.
                </p>
            </div>
        </Fragment>
    );
}

export default Home;
