import Editor from '@/components/Editor'
import dynamic from 'next/dynamic'
import map from '@/public/map/project-euler.json'
import roadmap from '@/roadmap/project-euler'
import Encounter from '@/components/Encounter'
import { useState } from 'react'
const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index() {
  const [screen, setScreen] = useState("Rpg")
  const [encounter, setEncounter] = useState("")

  return (
    <>
      {screen == "Battle" && (
        <Battle setScreen={setScreen} setEncounter={setEncounter}  encounter={encounter} />)}
      {screen == "Encounter" && (
        <Encounter setScreen={setScreen} setEncounter={setEncounter}  encounter={encounter} />)}
      {screen == "Rpg" && (
        <Rpg setEncounter={setEncounter} setScreen={setScreen} map={map} play={true} />)}
    </>
  )
}
