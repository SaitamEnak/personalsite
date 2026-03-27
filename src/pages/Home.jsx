import Tabs from '../components/Tabs'
import Articles from './Articles'
import Portfolio from './Portfolio'
import Lab from './Lab'

export default function Home() {
  return (
    <div style={{ padding: '0 0 16px 0' }}>
      <Tabs>
        <Articles />
        <Portfolio />
        <Lab />
      </Tabs>
    </div>
  )
}
