import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
