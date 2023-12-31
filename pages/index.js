import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import map from '@/public/map/project-euler.json'
import roadmap from '@/roadmap/project-euler'
import Encounter from '@/components/Encounter'
import Battle from '@/components/Battle'

const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index() {
  const [screen, setScreen] = useState("Rpg")
  const [encounter, setEncounter] = useState("")
  const [audio, setAudio] = useState();
  const [challenges, setChallenges] = useState(roadmap.levels);

  useEffect(() => {
    console.log(challenges)
  }, [])

  useEffect(() => {
    if (screen === 'Rpg') {
      audio?.pause()
      setAudio(new Audio('/music/riptide.mp3'));
    } else if (screen == "Encounter") {
      audio?.pause()
      setAudio(new Audio('/music/washingMachine.mp3'));
    } else if (screen == "Battle") {
      audio?.pause()
      setAudio(new Audio('/music/devilman.mp3'));
    }
  }, [screen])

  const playAudio = () => {
    audio?.play();
  };

  useEffect(() => {
    playAudio();
  }, [audio])

  return (
    <>
      {/* <button onClick={() => playAudio()}>Play Music</button> */}

      {screen === "Battle" && (
        <Battle nextTest={() => setChallenges(challenges.slice(1))} setScreen={setScreen} setEncounter={setEncounter}  encounter={encounter} current={challenges[0]} />)}
      {screen === "Encounter" && (
        <Encounter setScreen={setScreen} setEncounter={setEncounter}  encounter={encounter} />)}
      {screen === "Rpg" && (
        <Rpg setEncounter={setEncounter} setScreen={setScreen} map={map} play={true} />)}
    </>
  )
}
