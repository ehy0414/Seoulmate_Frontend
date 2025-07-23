import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import SignUpUserPage from './pages/SignUpUserPage'
import HobbySelectionPage from './pages/HobbySelectionPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/signUp/profile' element={<SignUpUserPage />} />
        <Route path='/signUp/hobby' element={<HobbySelectionPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
