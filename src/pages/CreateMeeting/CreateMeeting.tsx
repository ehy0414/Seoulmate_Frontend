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

  const handleCreateMeeting = () => {
    navigate('/create-meeting');
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

        <TimeField
          value={meetingData.time}
          onChange={(value) => setMeetingData(prev => ({ ...prev, time: value }))}
        />

        <DateField
          value={meetingData.date}
          onChange={(value) => setMeetingData(prev => ({ ...prev, date: value }))}
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
