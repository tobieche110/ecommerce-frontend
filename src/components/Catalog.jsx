import CustomNavbar from "./CustomNavbar";
import { PiShoppingCartThin } from "react-icons/pi";

const Catalog = () => {
    return (  
        <>
            <div className="container">
            
                <h1 className="mt-3"><strong>Catálogo</strong></h1>
                <p>En esta sección podrás encontrar todos los productos disponibles en nuestra tienda.</p>

                <div className="row">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Nombre del producto</h5>
                                    <p className="card-text">Precio</p>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-primary rounded-pill"><PiShoppingCartThin style={{ fontSize: '1.5em' }} /> Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
 
export default Catalog;