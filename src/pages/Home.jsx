import Tabs from '../components/Tabs'
import Intro from './Intro'
import Articles from './Articles'
import Portfolio from './Portfolio'
import Lab from './Lab'

export default function Home({ active, setActive }) {
  return (
    <div style={{ padding: '0 0 16px 0' }}>
      <Tabs active={active}>
        <Intro setActive={setActive} />
        <Articles />
        <Portfolio />
        <Lab />
      </Tabs>
    </div>
  )
}
