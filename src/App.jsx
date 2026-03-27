import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import ArticleDetail from './pages/ArticleDetail'
import Cursor from './components/Cursor'
import { ThemeProvider } from './context/ThemeContext'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-[16px] lg:items-start">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
