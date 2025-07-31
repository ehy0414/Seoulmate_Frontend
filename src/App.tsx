import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { SignUpProfilePage } from './pages/SignUpProfilePage'
import HobbySelectionPage from './pages/HobbySelectionPage'
import { SchoolVerifyPage } from './pages/SchoolVerifyPage'
import SchoolVerificationPage from './pages/SchoolVerificationPage'
import SignUpLangTestPage from './pages/SignUpLangTestPage'
import SearchHobby from './pages/search/SearchHobby'
import HomePage from './pages/home/HomePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 회원가입 페이지 */}
        <Route path='/' element={<SignUpPage />} />
        <Route path='/signUp/profile' element={<SignUpProfilePage />} />
        <Route path='/signUp/langTest' element={<SignUpLangTestPage />} />
        <Route path='/signUp/hobby' element={<HobbySelectionPage />} />
        <Route path='/signUp/school' element={<SchoolVerifyPage />} />
        <Route path='/signUp/wait' element={<SchoolVerificationPage />} />
        <Route path='/search/hobby' element={<SearchHobby />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
