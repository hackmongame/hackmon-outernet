import { useRef, useEffect, useState } from 'react'
import TMX from '@/lib/tmx'
import { VT323, Azeret_Mono } from 'next/font/google'
import dialogStyles from './rpg/Dialog.module.scss'
import Player from './rpg/Player'

const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin']
})

const azeretMono = Azeret_Mono({
  weight: ['400'],
  subsets: ['latin']
})

const scale = 2.75
const playerScale = 2.75

export default function Rpg({ map: initialMap, setEncounter, setScreen, play }) {
  let keys = {}
  const canvasRef = useRef(null)
  const tilesetRef = useRef(new Image())
  
  const [selectedDialogNode, setSelectedDialogNode] = useState(0)
  const [selectedOption, setSelectedOption] = useState(0)

  function makeEncounter(encounter) {
    setEncounter(encounter)
    setScreen("Encounter")
  }

  const dialogNodes = [
    {
      message: "Welcome Hacker, A or B?",
      children: [
        {
          label: "Option A",
          destination: 1
        },
        {
          label: "Option B",
          destination: 2
        }
      ]
    },
    {
      message: "You Selected Option A, select again",
      children: [
        {
          label: "Home Screen",
          destination: 0
        },
        {
          label: "Option B",
          destination: 2
        }
      ]
    },
    {
      message: "You Selected Option B, select again",
      children: [
        {
          label: "Home Screen",
          destination: 0
        },
        {
          label: "Close Dialog",
          destination: -1
        }
      ]
    }
  ]

  const [player, setPlayer] = useState(new Player(16, 16, playerScale))
  const [canMove, setCanMove] = useState(true)

  const screenToWorld = (x,y) => {
    const map = new TMX(initialMap)

    return Math.floor(y / map.tileHeight)* map.columns
            + Math.floor(x / map.tileWidth)
  }

  const battle = () => console.log("wahoo")

  const update = (canvas, ctx, { elapsed, keys }) => {
    // Load tileset
    let tileAtlas = new Image()
    tileAtlas.src = '/map/tiles.png'
    tileAtlas.onload = () => {
      // Center map around player
      const map = new TMX(initialMap)
      const tileWidth = map.tileWidth
      const tileHeight = map.tileHeight
      const scaledTileWidth = tileWidth * scale
      const scaledTileHeight = tileHeight * scale
      const atlasCol = 64
      const atlasRow = 64
      const mapCols = map.columns
      const mapRows = map.rows
      const mapHeight = mapRows * tileHeight
      const mapWidth = mapCols * tileWidth
      ctx.save()
      ctx.translate(-player.x * 2, -player.y * 2)
      for (let layer of map.layers) {
        const levelMap = layer.data
        let mapIndex = 0
        let sourceX = 0
        let sourceY = 0
        for (let col = 0; col < mapHeight; col += tileHeight) {
          for (let row = 0; row < mapWidth; row += tileWidth) {
            let tileVal = levelMap[mapIndex]
            if (tileVal != 0) {
              tileVal--
              sourceY = Math.floor(tileVal / atlasCol) * tileHeight
              sourceX = (tileVal % atlasCol) * tileWidth
              ctx.drawImage(
                tileAtlas,
                sourceX,
                sourceY,
                tileWidth,
                tileHeight,
                row * scale,
                col * scale,
                scaledTileWidth,
                scaledTileHeight
              )
              // What if we determine what index the player is and then determine which index it should not be allowed me? Then we can have fractional detection
              const closestX = Math.round(player.x / tileWidth)
              const closestY = Math.round(player.y / tileHeight)
            }
            mapIndex++
          }
        }
      }player.update(keys, elapsed)
      player.draw(canvas, ctx)
      ctx.restore()

      const grassTiles = [
        81, 82, 83, 84, 145, 146, 147, 148, 209, 210, 211, 212, 273, 274, 275, 276,
        284, 286
      ]

      if (player.isMoving) {
        
      }

      //console.log(initialMap.layers[0].data[screenToWorld(player.x, player.y)])

      if (player.isMoving /* &&
          grassTiles.includes(initialMap.layers[0].data[screenToWorld(player.x, player.y)]) */ ) {
        Math.random() < 0.01 ? makeEncounter("Police Officer") : null // TODO: change this value thru experimentation
      }
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', event => {
      if(event.key == "ArrowUp") {
        setSelectedOption(0)
        console.log(selectedOption)

      } else if (event.key == "ArrowDown") {
        setSelectedOption(1)
        console.log(selectedOption)


      } else if (event.key == "Enter") {
        // console.log(dialogNodes[selectedDialogNode].children[selectedOption].destination)
        setSelectedDialogNode(dialogNodes[selectedDialogNode].children[selectedOption].destination)
        // setSelectedOption(0);  // Reset selected option
        setSelectedOption(0)

      }
    })
  }, [selectedDialogNode, selectedOption])
  

  useEffect(() => {
    if (canMove) {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        let lastTime
        let requiredElapsed = 1000 / 60
        let animationFrameId
        const render = now => {
          animationFrameId = requestAnimationFrame(render)
          if (!lastTime) lastTime = now
          let elapsed = now - lastTime
          if (elapsed > requiredElapsed) {
            update(
              canvas,
              ctx,
              {
                elapsed,
                keys
              },
              true
            )
            lastTime = now
          }
        }
        if (canMove) {
          requestAnimationFrame(render)
          window.addEventListener('keydown', event => {
            keys[event.key.toLowerCase()] = true
          })
          window.addEventListener('keyup', event => {
            keys[event.key.toLowerCase()] = false
          })
          return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('keydown', event => {
              keys[event.key.toLowerCase()] = true
            })
            window.removeEventListener('keydown', event => {
              keys[event.key.toLowerCase()] = false
            })
          }
        }
      }
    }
  }, [canMove])


  return (
    <>
    
      <canvas ref={canvasRef} />
      
      {selectedDialogNode != -1 ? (
      <div className={dialogStyles.dialog} id="dialog">
        <p>{dialogNodes[selectedDialogNode].message}</p>
        <div className={dialogStyles.choices}>
          <button>{selectedOption == 0 ? ('>') : ("")} {dialogNodes[selectedDialogNode].children[0].label}</button>
          <button>{selectedOption == 1 ? ('>') : ("")} {dialogNodes[selectedDialogNode].children[1].label}</button>
        </div>
      </div>) : (<div></div>)}
    </>
  )
}
