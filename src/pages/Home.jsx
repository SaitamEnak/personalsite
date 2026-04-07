import { useState } from 'react'
import Tabs from '../components/Tabs'
import Overview from './Overview'
import Articles from './Articles'
import Portfolio from './Portfolio'
import Lab from './Lab'
import Timeline from './Timeline'

export default function Home() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ padding: '0 0 16px 0' }}>
      <Tabs active={active} onTabChange={setActive}>
        <Overview onNavigate={setActive} />
        <Articles />
        <Portfolio />
        <Lab />
        <Timeline />
      </Tabs>
    </div>
  )
}
