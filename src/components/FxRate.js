export default function FxRate(props) {
    const { fxRate, setFxRate, editFx, setEditFx } = props;

    return (
        <div id = 'fx-rate'>
            Fx Rate:
            <input 
                id = "fx-input" 
                type = "number" 
                value = {editFx ? fxRate : 1.1} 
                readOnly = {!editFx}
                onChange = {(e) => setFxRate(Number(e.target.value))}
            >
            </input>
            <button 
                id = "fx_override-button" 
                type = "button"
                onClick = {() => {
                    setEditFx(!editFx)
                    // reset FxRate to real
                    setFxRate(1.1)
                    }
                }
            >
                {editFx ? "Remove Override" : "Override"}
            </button>
        </div>
    )
}