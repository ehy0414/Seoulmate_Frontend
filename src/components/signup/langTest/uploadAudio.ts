import axios from 'axios';

export const uploadAudio = async (wavBlob: Blob) => {
  const formData = new FormData();
  formData.append('file', wavBlob, 'recording.wav');

  const response = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
