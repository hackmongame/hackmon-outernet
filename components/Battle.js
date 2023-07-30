import { useState } from 'react'
import Editor from '@/components/Editor'

export default function Battle({ encounter, setScreen, setEncounter }) {
    const [health, setHealth] = useState(100)
    const [encounterHealth, setEncounterHealth] = useState(100)
    const [attacking, setAttacking] = useState(false)

    function startAttacking() {
        setAttacking(true)

        //Implement code that picks a solution here from an array of challenges (all objects w/ necessary info)
    }
    function stopAttacking() {
        setAttacking(false)
    }

    function attack(damage) {
        setEncounterHealth(prevHealth => prevHealth - damage)
    }

    function miss(damage) {
        setHealth(prevHealth => prevHealth - damage)
    }

    function makeRetreat() {
        stopAttacking()
        setScreen("Rpg")
        setEncounter("")
    }

    return (
        !attacking ? (<div style={{width: "100%", height: "100%"}}>
            <p>You</p>

            <p>{encounter}</p>

            <button onClick={() => startAttacking()}>Attack</button>
            <button onClick={() => makeRetreat()}>Retreat</button>

        </div>) : (
            <Editor></Editor>
        )
    )
}