export default function Tabs({ active, children }) {
  return (
    <div key={active} className="tab-enter" style={{ flex: 1 }}>
      {children[active]}
    </div>
  )
}
