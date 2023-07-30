
export default function Encounter({ encounter, setScreen, setEncounter }) {
    function makeFight() {
        setScreen("Battle")
    }
    function makeRetreat() {
        setScreen("Rpg")
        setEncounter("")
    }

    return (
        <div style={{width: "100%", height: "100%"}}>
            <p>A Wild {encounter} Appeared</p>
            <button onClick={() => makeFight()}>Fight</button>
            <button onClick={() => makeRetreat()}>Retreat</button>
        </div>
    )
}