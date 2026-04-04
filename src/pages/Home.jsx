import Tabs from '../components/Tabs'
import Articles from './Articles'
import Portfolio from './Portfolio'
import Lab from './Lab'

export default function Home({ active }) {
  return (
    <div style={{ padding: '0 0 16px 0' }}>
      <Tabs active={active}>
        <Articles />
        <Portfolio />
        <Lab />
      </Tabs>
    </div>
  )
}
