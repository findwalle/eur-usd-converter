import { useState, useEffect } from "react";


export default function Converter() {
    const [initialCurrency, setInitialCurrency] = useState(0);
    const exchangeRate = 1.1;

    // function to grab random value to change initial currency
    const random = () => {
        const change =  Math.floor(Math.random() * 10) - 5;
        if (change === 0) return random();
        return change / 100;
    }

    /// 3 second interval to add random value btwn -0.05 and 0.05 to initialValue
    useEffect(() => {
        const interval = setInterval(() => {
            // need to convert to 2 decimal places using toFixed -> which converts to String, need to reconvert
            // to number
            const newValue = Number((initialCurrency + random()).toFixed(2))
            setInitialCurrency(newValue);
        }, 3000);

        return () => clearInterval(interval);
    })

    // converter component allowing user to enter amt in EUR and display converted Value in USD
    return (
        <div id = "converter">
            <div id = 'fx-rate'>{exchangeRate}</div>
            <input 
                id = "currency-top" 
                type = "number"
                value = {initialCurrency}
                onChange = {(e) => {setInitialCurrency(e.target.value)}}
            >
            </input>
            <div id = "currency-bottom">{Number((initialCurrency * exchangeRate).toFixed(2))}</div>
        </div>
    )
}