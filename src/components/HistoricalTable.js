export default function HistoricalTable(props) {
    const { history } = props;

    return (
        <table id = "historical-table">
            {history.map((row, idx) => {
                if (idx === 0) return row

                const newRow = row.map(el => {
                        return <td>{el}</td>
                    })
                return <tr>{newRow}</tr>
            })}
        </table>
    )
}