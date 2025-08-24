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
  primaryHobbyName: string;
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
    primaryHobbyName: '',
    time: '',
    date: '',
    location: '',
    language: [],
    charge: null,
    minParticipants: null,
    maxParticipants: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateMeeting = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    // 제출 시 인원수 검증
    if (meetingData.minParticipants == null || meetingData.minParticipants < 3) {
      alert('최소 인원수는 3명 이상이어야 합니다.');
      setIsSubmitting(false);
      return;
    }
    if (meetingData.maxParticipants == null || meetingData.maxParticipants < 3) {
      alert('최대 인원수는 3명 이상이어야 합니다.');
      setIsSubmitting(false);
      return;
    }
    if (meetingData.maxParticipants < meetingData.minParticipants) {
      alert('최대 인원수는 최소 인원수보다 작을 수 없습니다.');
      setIsSubmitting(false);
      return;
    }
    if (!isFormValid()) {
      setIsSubmitting(false);
      return;
    }

    let imageUrl = '';
    // 1. 이미지 먼저 업로드
    if (meetingData.photo) {
      const imageForm = new FormData();
      imageForm.append('file', meetingData.photo);
      try {
        const res = await api.post('/s3/upload/meeting', imageForm, {
        });
        imageUrl = res.data?.url ?? '';
      } catch(e) {
        console.log("이미지 업로드 실패",e)
        alert('이미지 업로드 실패 다시 시도해주세요.');
        setIsSubmitting(false);
        return;
      }
    }

    // 2. 나머지 정보 + 이미지 url을 JSON으로 전송
    const payload = {
      title: meetingData.title,
      image: imageUrl, // S3에서 받은 url
      host_message: meetingData.description,
      primaryHobbyName: meetingData.primaryHobbyName,
      start_time: meetingData.time,
      meeting_day: formatDate(meetingData.date),
      location: meetingData.location,
      language: meetingData.language.join(',') || '',
      price: String(meetingData.charge ?? 0),
      min_participants: String(meetingData.minParticipants ?? 0),
      max_participants: String(meetingData.maxParticipants ?? 0),
    };
    
    try {
      await api.post('/meetings/private', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate(-1);
    } catch (error) {
      console.error('모임 생성 실패:', error);
      alert("모임 생성 실패 다시 시도해주세요")
      // 에러 처리 (예: alert)
    } finally {
      setIsSubmitting(false);
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
      meetingData.primaryHobbyName !== '' &&
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
          value={meetingData.primaryHobbyName}
          onChange={(value) => setMeetingData(prev => ({ ...prev, primaryHobbyName: value }))}
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
        disabled={!isFormValid() || isSubmitting}
      />
    </div>
  );
};

export default CreateMeeting;
