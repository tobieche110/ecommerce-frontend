import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Catalog from "./components/Catalog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cart from "./components/Cart";
import CustomNavbar from "./components/CustomNavbar";
import { useAuth } from "./components/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ChangeDate from "./components/ChangeDate";
import Logout from "./components/Logout";
import Products from "./components/Products";
import ClientList from "./components/ClientList";

function App() {
    const { isLogged, userRole } = useAuth();

    return (
        <>
            {isLogged && <CustomNavbar />}
            <Routes>
                <Route
                    path="/login"
                    element={isLogged ? <Navigate to="/catalog" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={
                        isLogged ? <Navigate to="/catalog" /> : <Register />
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <ProtectedRoute>
                            <Logout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/catalog"
                    element={
                        <ProtectedRoute>
                            <Catalog />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/change-date"
                    element={
                        <ProtectedRoute>
                            <ChangeDate />
                        </ProtectedRoute>
                    }
                />

                {userRole === "ADMIN" && (
                    <>
                        <Route
                            path="/admin/products"
                            element={
                                <ProtectedRoute>
                                    <Products />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/clients"
                            element={
                                <ProtectedRoute>
                                    <ClientList />
                                </ProtectedRoute>
                            }
                        />
                    </>
                )}

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
