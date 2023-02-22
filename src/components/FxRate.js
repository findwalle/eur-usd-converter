export default function FxRate(props) {
    const { fxRate, setFxRate, editFx, setEditFx } = props;

    // deactivate override fx rate (if activated) when there is a 2% diff with real time rate (1.1)
    function allowFxChange(number) {
        if (editFx) {
            // check for 2% diff
            if (Math.abs((Number(number) - 1.1) / 1.1) <= 0.02) {
                setEditFx(!editFx)
                setFxRate(1.1)
            }
        }
    }

    return (
        <div id = 'fx-rate'>
            Fx Rate:
            <input 
                id = "fx-input" 
                type = "number" 
                value = {editFx ? fxRate : 1.1} 
                readOnly = {!editFx}
                onChange = {(e) => setFxRate(Number(e.target.value))}
                onBlur = {(e) => {
                    allowFxChange(e.target.value)
                }}
            >
            </input>
            <button 
                id = "fx-override-button" 
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