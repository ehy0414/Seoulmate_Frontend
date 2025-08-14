import * as React from "react";
import { motion } from "framer-motion";
import Camera from '../../assets/create-meeting/camera.svg?react'; // SVGR 임포트

interface PhotoUploadSectionProps {
  onPhotoSelect?: (file: File | null) => void;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  onPhotoSelect
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const selectedImageRef = React.useRef<string | null>(null);

  // selectedImage와 ref를 동기화
  React.useEffect(() => {
    selectedImageRef.current = selectedImage;
  }, [selectedImage]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    // 이미지 변경 시 이전 URL 즉시 해제 (메모리 누수 방지)
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    } else {
      setSelectedImage(null);
    }
    
    onPhotoSelect?.(file);
  };

  // 컴포넌트 언마운트 시에만 마지막 URL 해제
  React.useEffect(() => {
    return () => {
      if (selectedImageRef.current) {
        URL.revokeObjectURL(selectedImageRef.current);
      }
    };
  }, []); // 빈 배열로 언마운트 시에만 실행

  return (
    <div>
      <div className="text-sm font-medium leading-none text-zinc-900">
        사진 등록
      </div>
      <button
        onClick={handleClick}
        className={`relative flex items-center mt-2 w-[60px] h-[45px] `}
      >
        <div className={`relative w-[45px] h-[45px] rounded-[8px] overflow-hidden ${!selectedImage ? 'border border-black-700' : 'bg-black-100'}`}>
          {selectedImage && (
            <motion.img
              key={selectedImage} // key를 추가하여 이미지가 바뀔 때마다 새로운 컴포넌트로 인식
              src={selectedImage}
              alt="Uploaded image"
              className="absolute inset-0 object-cover w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </div>
        <motion.div
          className="absolute left-[13.5px] z-10" // border 오른쪽에 위치
          initial={{ x: 0 }}
          animate={{ x: selectedImage ? 50 : 0 }} // 이동 거리 조정
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Camera className="w-[18px] h-[18px]" />
        </motion.div>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};