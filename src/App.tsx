import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import SignUpUserPage from './pages/SignUpUserPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/signUp/user' element={<SignUpUserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
