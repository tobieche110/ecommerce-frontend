import React, { useState, useEffect } from "react";
import {
    getVipUsers,
    getVipUsersByMonthAndYear,
    getLostVipUsersByMonthAndYear,
} from "./ApiRequests";
import { useDate } from "./contexts/DateContext";
import { Card } from "react-bootstrap";

const ClientList = () => {
    const [option, setOption] = useState("vipUsers");
    const [clients, setClients] = useState([]);
    const { date } = useDate();
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());

    const fetchData = async () => {
        let data;
        switch (option) {
            case "vipUsers":
                data = await getVipUsers();
                break;
            case "vipUsersByMonthAndYear":
                data = await getVipUsersByMonthAndYear(month, year);
                break;
            case "lostVipUsersByMonthAndYear":
                data = await getLostVipUsersByMonthAndYear(month, year);
                break;
            default:
                data = [];
        }
        setClients(data);
    };

    useEffect(() => {
        fetchData();
    }, [option]);

    return (
        <div className="container mt-3">
            <h1 className="mb-2">
                <strong>Lista de Clientes</strong>
            </h1>
            <p>En esta sección podrás filtrar entre los usuarios VIP.</p>
            <div className="mb-3 d-flex">
                <select
                    className="form-select me-2"
                    onChange={(e) => setOption(e.target.value)}
                    value={option}
                >
                    <option value="vipUsers">Usuarios VIP</option>
                    <option value="vipUsersByMonthAndYear">
                        Usuarios que obtuvieron VIP por Mes y Año
                    </option>
                    <option value="lostVipUsersByMonthAndYear">
                        Usuarios que perdieron VIP por Mes y Año
                    </option>
                </select>
                <button className="btn btn-primary" onClick={() => fetchData()}>
                    Refrescar resultados
                </button>
            </div>
            {option !== "vipUsers" && (
                <Card className="mb-2">
                    <Card.Body>
                        <div className="mb-1 d-flex align-items-center">
                            <label htmlFor="month" className="form-label me-2">
                                Mes
                            </label>
                            <input
                                type="number"
                                id="month"
                                className="form-control"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="year" className="form-label me-2">
                                Año
                            </label>
                            <input
                                type="number"
                                id="year"
                                className="form-control"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                    </Card.Body>
                </Card>
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, index) => (
                        <tr key={index}>
                            <td>{client.username}</td>
                            <td>
                                {option === "lostVipUsersByMonthAndYear"
                                    ? client.dateWhenLostVIP
                                    : client.dateWhenBecameVIP}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
