import { useState, useEffect } from "react";

import Switch from './Switch';
import FxRate from './FxRate';

export default function Converter() {
    const [currentCurrency, setCurrency] = useState("EUR");
    const [initialCurrency, setInitialCurrency] = useState(0);
    const [fxRate, setFxRate] = useState(1.1);
    const [editFx, setEditFx] = useState(false);

    // function to grab random value to change initial currency
    const random = () => {
        const change =  Math.floor(Math.random() * 10) - 5;
        if (change === 0) return random();
        return change / 100;
    }

    /// 3 second interval to add random value btwn -0.05 and 0.05 to initialValue
    useEffect(() => {
        console.log({editFx})
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
        <>
            <div id = "converter">
                <FxRate fxRate = {fxRate} setFxRate = {setFxRate} editFx = {editFx} setEditFx = {setEditFx}/>
                <input 
                    id = "currency-top" 
                    type = "number"
                    value = {currentCurrency === "EUR" ? initialCurrency : Number((initialCurrency * fxRate).toFixed(2))}
                    onChange = {(e) => {setInitialCurrency(Number(e.target.value))}}
                >
                </input>
                {/* polling to update USD */}
                <div id = "currency-bottom">{currentCurrency === "USD" ? initialCurrency : Number((initialCurrency * fxRate).toFixed(2))}</div>
            </div>
            <Switch setCurrency = {setCurrency}/>
        </>
    )
}