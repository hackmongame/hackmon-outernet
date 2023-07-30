import { useState } from 'react'
import Editor from '@/components/Editor'

export default function Battle({ encounter, setScreen, setEncounter, nextTest, current }) {
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
        if(encounterHealth <= damage) {
            stopAttacking()
            setScreen("Rpg")
            setEncounter("")        
        }
    }

    function miss(damage) {
        setHealth(prevHealth => prevHealth - damage)
        if(health <= damage) {
            stopAttacking()
            setScreen("Rpg")
            setEncounter("")        
        }
    }

    function makeRetreat() {
        stopAttacking()
        setScreen("Rpg")
        setEncounter("")
    }

    return (
        !attacking ? (<div style={{width: "100%", height: "100%"}}>
            <div style={{border: "1px solid #000", width: "240px", marginLeft: "16px", marginTop: "16px"}}>
                <p>You</p>
                <progress id="file" value={health} max="100"> {health}% </progress>

                <p>Zoya</p>
                <progress id="file" value={encounterHealth} max="100"> {encounterHealth}% </progress>
            </div>
            <img style={{minHeight: "500px", position: "absolute", top: 32, right: 64 }} src={"/characters/" + encounter.split(" ").join("-") + ".png"}/>
            <img style={{minHeight: "500px", position: "absolute", bottom: 32, left: 64}} src={"/luna/luna_back_walking_still.png"}/>

            <div style={{width: "100%", backgroundColor: "#fff", position: "absolute", bottom: 12, right: 0}}>
                <p>TIME TO FIGHT!</p>

                <button onClick={() => startAttacking()}>Attack</button>
                <button onClick={() => makeRetreat()}>Retreat</button>
            </div>
        </div>) : (
            <div>
                <Editor attack={attack} setAttacking={setAttacking} miss={miss} encounter={encounter} nextTest={nextTest} {...current}/>
            </div>
        )
    )
}