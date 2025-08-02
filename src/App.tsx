import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUpPage from './pages/signUp/SignUpPage'
import { SignUpProfilePage } from './pages/signUp/SignUpProfilePage'
import HobbySelectionPage from './pages/signUp/HobbySelectionPage'
import { SchoolVerifyPage } from './pages/signUp/SchoolVerifyPage'
import SchoolVerificationPage from './pages/signUp/SchoolVerificationPage'
import SignUpLangTestPage from './pages/signUp/SignUpLangTestPage'
import SearchHobby from './pages/search/SearchHobby'
import HomePage from './pages/home/HomePage'
import MeetingDetailPage from './pages/home/MeetingDetailPage'
import ClubDetailPage from './pages/home/ClubDetailPage'
import CreateMeeting from './pages/CreateMeeting/CreateMeeting'

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
        <Route path='/meeting/:id' element={<MeetingDetailPage />} />
        <Route path='/club/:id' element={<ClubDetailPage />} />
        <Route path='/create-meeting' element={<CreateMeeting />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
