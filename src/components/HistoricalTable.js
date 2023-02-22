import { useEffect } from "react";

export default function HistoricalTable(props) {
    const { history } = props;

    return (
        <table id = "historical-table">
            {history.map(row => {
                return <tr>
                    {row.map(el => {
                        return <th>{el}</th>
                    })}
                </tr>
            })}
        </table>
    )
}