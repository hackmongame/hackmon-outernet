import { useState } from 'react'

export default function Battle({ encounter }) {
    const [health, setHealth] = useState(100)
    const [encounterHealth, setEncounterHealth] = useState(100)

    return (
        <div style={{width: "100%", height: "100%"}}>
            <p>You</p>

            <p>{encounter}</p>

            <button>Attack</button>
            <button>Retreat</button>

        </div>
    )
}