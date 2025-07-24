import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import SignUpUserPage from './pages/SignUpUserPage'
import HobbySelectionPage from './pages/HobbySelectionPage'
import { SchoolVerifyPage } from './pages/SchoolVerifyPage'
import SchoolVerificationPage from './pages/SchoolVerificationPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 회원가입 페이지 */}
        <Route path='/' element={<SignUpPage />} />
        <Route path='/signUp/profile' element={<SignUpUserPage />} />
        <Route path='/signUp/hobby' element={<HobbySelectionPage />} />
        <Route path='/signUp/school' element={<SchoolVerifyPage />} />
        <Route path='/signUp/wait' element={<SchoolVerificationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
