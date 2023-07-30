
export default function Encounter({ encounter, setScreen, setEncounter }) {

    function getImage() {
        console.log(encounter.split(" ").join("-"))
    }
    getImage()
    function makeFight() {
        setScreen("Battle")
    }
    function makeRetreat() {
        setScreen("Rpg")
        setEncounter("")
    }

    
    return (

        <div style={{width: "100vw", height: "100vh", backgroundColor: "#000"}}>
        <div style={{width: "100%", height: "100%", backgroundColor: "#000"}}>
            <img style={{minHeight: "300px", backgroundColor: "#000", position: "absolute", right: 0}} src={"/characters/" + encounter.split(" ").join("-") + ".png"}/>
            <img style={{minHeight: "500px", backgroundColor: "#000", position: "absolute", bottom: 0, left: 0}} src={"/luna/luna_back_walking_still.png"}/>
            <div style={{width: "100%", backgroundColor: "#fff", position: "absolute", bottom: 12, right: 0}}>
                <p>A Wild Zoya Appeared</p>
                <button onClick={() => makeFight()}>Fight</button>
                <button onClick={() => makeRetreat()}>Retreat</button>
            </div>
        </div>
        </div>
    )
}