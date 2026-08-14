import qariList from "../data/qariList";

function QariSelector({ selectedQari, onQariChange }) {
    return (
        <div className="qari-selector">

            <label htmlFor="qari">
                Select Qari
            </label>

            <select
                id="qari"
                value={selectedQari}
                onChange={(event) =>
                    onQariChange(event.target.value)
                }
            >
                {qariList.map((qari) => (
                    <option
                        key={qari.id}
                        value={qari.id}
                    >
                        {qari.name}
                    </option>
                ))}
            </select>

        </div>
    );
}

export default QariSelector;