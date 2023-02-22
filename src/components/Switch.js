export default function Switch(props) {
    const { setCurrency } = props;

    return (
        <div id = "switch-holder">
            <button id = "eur-button" type = "button" onClick = {() => setCurrency('EUR')}>EUR</button>
            <button id = "usd-button" type = "button" onClick = {() => setCurrency('USD')}>USD</button>
        </div>
    )
}