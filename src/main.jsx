import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import { CartProvider } from "./components/contexts/CartContext";
import { DateProvider } from "./components/contexts/DateContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <DateProvider>
            <CartProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </CartProvider>
        </DateProvider>
    </BrowserRouter>
);
