import { useContext } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import { CartContext } from "./contexts/CartContext";
import { getProducts } from "./ApiRequests";
import { useEffect, useState } from "react";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los productos.");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="container mt-3"><p>Cargando productos...</p></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <h1 className="mt-3"><strong>Catálogo</strong></h1>
            <p>En esta sección podrás encontrar todos los productos disponibles en nuestra tienda.</p>

            <div className="row">
                {products.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <div className="d-flex justify-content-center">
                                    <button 
                                        className="btn btn-primary rounded-pill"
                                        onClick={() => addToCart(product)} // Agrega el producto al carrito
                                    >
                                        <PiShoppingCartThin style={{ fontSize: '1.5em' }} /> Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;
