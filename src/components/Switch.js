export default function Switch(props) {
    const { setCurrency } = props;

    return (
        <div id = "switch-holder">
            <button className = "currency-button" type = "button" onClick = {() => setCurrency('EUR')}>EUR</button>
            <button className = "currency-button" type = "button" onClick = {() => setCurrency('USD')}>USD</button>
        </div>
    )
}