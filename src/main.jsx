import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { CartProvider } from "./components/contexts/CartContext";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </BrowserRouter>
);
