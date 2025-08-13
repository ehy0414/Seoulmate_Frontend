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
import FriendPage from './pages/friend/FriendPage'
import FriendRequestPage from './pages/friend/FriendRequestPage'
import MyPage from './pages/MyPage/MyPage'
import MyProfile from './pages/MyPage/MyProfile'
import MyHobby from './pages/MyPage/MyHobby'
import ChatRoom from './pages/chat/ChatRoom'
import Schedule from './pages/schedule/Schedule'
import ChatList from './pages/chat/ChatList'
import AlarmPage from './pages/alarm/AlarmPage'
import AuthRedirect from './pages/signUp/AuthRedirect'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 회원가입 페이지 */}
        <Route path='/' element={<SignUpPage />} />
        <Route path='/login/oauth2/code/google' element={<AuthRedirect />} />
        <Route path='/signUp/profile' element={<SignUpProfilePage />} />
        <Route path='/signUp/langTest' element={<SignUpLangTestPage />} />
        <Route path='/signUp/hobby' element={<HobbySelectionPage />} />
        <Route path='/signUp/school' element={<SchoolVerifyPage />} />
        <Route path='/signUp/wait' element={<SchoolVerificationPage />} />
        <Route path='/search' element={<SearchHobby />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/meeting/:id' element={<MeetingDetailPage />} />
        <Route path='/club/:id' element={<ClubDetailPage />} />
        <Route path='/create-meeting' element={<CreateMeeting />} />
        <Route path='/friend' element={<FriendPage />} />
        <Route path='/friend/request' element={<FriendRequestPage />} />
        <Route path='/myPage' element={<MyPage/>} />
        <Route path='/myPage/profile' element={<MyProfile/>} />
        <Route path='/myPage/hobby' element={<MyHobby/>} />
        <Route path='/chat' element={<ChatRoom />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/chat/list' element={<ChatList />} />
        <Route path='/alarm' element={<AlarmPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
