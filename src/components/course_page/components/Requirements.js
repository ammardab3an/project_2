import "./Requirements.sass"

export default function Requirements({requirementsData}){

    return (
        <div className="requirements">
            <h4>Requirements</h4>
            <ul className="requirements-list">
                {
                    requirementsData.items.map((e, idx) => (
                        <li key={idx}>{e}</li>
                    ))
                }
            </ul>
        </div>
    )
}