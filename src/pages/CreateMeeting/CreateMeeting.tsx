import * as React from "react";
import { useState, useEffect } from "react";
import NoAlarmBackHeader from '../../components/common/NoAlarmBackHeader';
import {
  MeetingTitleInput,
  PhotoUploadSection,
  MeetingDescriptionField,
  CategoryDropdown,
  TimeField,
  DateField,
  LocationField,
  LanguageDropdown,
  CreateMeetingButton,
  ChargeField,
  ParticipantField
} from "../../components/createMeeting";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";


interface MeetingData {
  title: string;
  photo: File | null;
  description: string;
  category: string;
  time: string;
  date: string;
  location: string;
  language: string[];
  charge: number | null;
  minParticipants: number | null;
  maxParticipants: number | null;
}

export const CreateMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState<MeetingData>({
    title: '',
    photo: null,
    description: '',
    category: '',
    time: '',
    date: '',
    location: '',
    language: [],
    charge: null,
    minParticipants: null,
    maxParticipants: null,
  });

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateMeeting = async () => {
    if (!isFormValid()) return;

    // 데이터 매핑 (백엔드 형식에 맞춤)
    const formData = new FormData();
    formData.append('title', meetingData.title);
    if (meetingData.photo) {
      formData.append('image', meetingData.photo); // 백엔드가 파일 처리 후 URL 저장 가정
    }
    formData.append('host_message', meetingData.description);
    formData.append('category', meetingData.category);
    formData.append('start_time', meetingData.time); // HH:MM 가정
    formData.append('meeting_day', formatDate(meetingData.date)); // YYYY-MM-DD -> DD/MM/YYYY
    formData.append('location', meetingData.location);
    formData.append('language', meetingData.language[0] || ''); // array 첫 번째 사용, 필요시 join
    formData.append('price', (meetingData.charge ?? 0));
    formData.append('min_participants', (meetingData.minParticipants ?? 0));
    formData.append('max_participants', (meetingData.maxParticipants ?? 0));
    const logObj: { [key: string]:string | File } = {};
    formData.forEach((value, key) => {
      logObj[key] = value;
    });
    console.log('전송 데이터:', logObj);
    try {
      await api.post('/meetings/private', formData, { // 엔드포인트는 '/meetings'로 가정, 실제에 맞게 변경
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/success'); // 성공 시 리다이렉트, 필요시 변경
    } catch (error) {
      console.error('모임 생성 실패:', error);
      // 에러 처리 (예: alert)
    }
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const isFormValid = () => {
    return (
      meetingData.title.trim() !== '' &&
      meetingData.description.trim() !== '' &&
      meetingData.category !== '' &&
      meetingData.time !== '' &&
      meetingData.date !== '' &&
      meetingData.location.trim() !== '' &&
      meetingData.language.length > 0 &&
      meetingData.charge !== null && meetingData.charge >= 0 &&
      meetingData.minParticipants !== null && meetingData.minParticipants > 0 &&
      meetingData.maxParticipants !== null && meetingData.maxParticipants > 0 &&
      meetingData.minParticipants <= meetingData.maxParticipants
    );
  };

  return (
    <div className="flex overflow-hidden flex-col w-full bg-white">
      {/* Header */}
      <NoAlarmBackHeader title="모임 개설" />

      {/* Main content */}
      <div className="self-center w-full h-auto px-[18px] flex flex-col gap-[2.35vh]">
        <MeetingTitleInput
          value={meetingData.title}
          onChange={(value) => setMeetingData(prev => ({ ...prev, title: value }))}
        />

        <PhotoUploadSection
          onPhotoSelect={(file) => setMeetingData(prev => ({ ...prev, photo: file }))}
        />

        <MeetingDescriptionField
          value={meetingData.description}
          onChange={(value) => setMeetingData(prev => ({ ...prev, description: value }))}
        />

        <CategoryDropdown
          value={meetingData.category}
          onChange={(value) => setMeetingData(prev => ({ ...prev, category: value }))}
        />

        <DateField
          value={meetingData.date}
          onChange={(value) => setMeetingData(prev => ({ ...prev, date: value }))}
        />
        
        <TimeField
          value={meetingData.time}
          onChange={(value) => setMeetingData(prev => ({ ...prev, time: value }))}
        />


        <LocationField
          value={meetingData.location}
          onChange={(value) => setMeetingData(prev => ({ ...prev, location: value }))}
        />

        <LanguageDropdown
          value={meetingData.language}
          onChange={(value) => setMeetingData(prev => ({ ...prev, language: value }))}
        />
        
        <ParticipantField
          minParticipants={meetingData.minParticipants}
          maxParticipants={meetingData.maxParticipants}
          onMinChange={(value) => setMeetingData(prev => ({ ...prev, minParticipants: value }))}
          onMaxChange={(value) => setMeetingData(prev => ({ ...prev, maxParticipants: value }))}
        />
        
        <ChargeField
          value={meetingData.charge}
          onChange={(value) => setMeetingData(prev => ({ ...prev, charge: value }))}
        />
      </div>

      {/* Submit button */}
      <CreateMeetingButton
        onClick={handleCreateMeeting}
        disabled={!isFormValid()}
      />
    </div>
  );
};

export default CreateMeeting;
