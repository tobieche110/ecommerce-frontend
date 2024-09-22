import { useDate } from "./contexts/DateContext";

const ChangeDate = () => {
    const { date, updateDate } = useDate();

    return (
        <div className="container">
            <h1 className="mt-3">
                <strong>Cambiar fecha del sistema</strong>
            </h1>
            <p>En esta sección podrás cambiar la fecha del sistema.</p>
            <input
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => updateDate(new Date(e.target.value))}
            />
        </div>
    );
};

export default ChangeDate;
