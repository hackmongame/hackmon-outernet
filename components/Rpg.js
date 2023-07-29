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
const playerScale = 3

export default function Rpg({ map: initialMap, play }) {
  let keys = {}
  const canvasRef = useRef(null)
  const tilesetRef = useRef(new Image())
  const [player, setPlayer] = useState(new Player(16, 16, playerScale))
  const [canMove, setCanMove] = useState(true)

  const detectCollisions = p => {}

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
      }
      player.update(keys, elapsed)
      player.draw(canvas, ctx)
      ctx.restore()
    }
  }

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
      <div className={dialogStyles.dialog} id="dialog">
        <p>This is a test dialog</p>
        <div className={dialogStyles.choices}>
          <button>&gt; Great!</button>
          <button>&gt; No you need to fix it</button>
        </div>
      </div>
    </>
  )
}
