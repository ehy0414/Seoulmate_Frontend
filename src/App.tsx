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
import FilterPage from './pages/search/FilterPage'
import ClassDetailPage from './pages/home/ClassDetailPage'
import MyReLangTestPage from './pages/MyPage/MyReLangTestPage'
import ProtectedRoute from './utils/ProtectedRoute';
import { Outlet } from 'react-router-dom';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* '/' 경로는 인증 없이 접근 가능 */}
        <Route path='/' element={<SignUpPage />} />
        <Route path='/login/oauth2/code/google' element={<AuthRedirect />} />


        {/* 나머지 모든 경로는 ProtectedRoute로 감싸서 인증 필요 */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path='/signUp/profile' element={<SignUpProfilePage />} />
          <Route path='/signUp/langTest' element={<SignUpLangTestPage />} />
          <Route path='/signUp/hobby' element={<HobbySelectionPage />} />
          <Route path='/signUp/school' element={<SchoolVerifyPage />} />
          <Route path='/signUp/wait' element={<SchoolVerificationPage />} />
          <Route path='/search' element={<SearchHobby />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/meeting/:id' element={<MeetingDetailPage />} />
          <Route path='/club/:id' element={<ClubDetailPage />} />
          <Route path='/class/:id' element={<ClassDetailPage />} />
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
          <Route path='/filter' element={<FilterPage />} />
          <Route path='/myPage/langTest' element={<MyReLangTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
