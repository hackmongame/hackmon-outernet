import Editor from '@/components/Editor'
import dynamic from 'next/dynamic'
import map from '@/public/map/project-euler.json'
import roadmap from '@/roadmap/project-euler'

const Rpg = dynamic(() => import('@/components/Rpg'), {
  ssr: false
})

export default function Index() {
  return (
    <>
      <Rpg map={map} play={true} />
    </>
  )
}
