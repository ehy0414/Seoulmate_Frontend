"use client";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

interface ActionButtonProps {
  text: string;
  disabled?: boolean;
  meetingId?: number;
  club?: { 
    id: number; 
    min_participants?: number; 
    host?: { id: number } 
  };
  participants?: { id: string }[];
  type: "club" | "class";
}

declare global {
  interface Window {
    IMP: any;
  }
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  disabled = false,
  meetingId,
  club,
  participants = [],
  type
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //console.log(participants.length);

  useEffect(() => {
    if (!document.querySelector('script[src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const orderMeeting = async () => {
    if (!meetingId || !club) return;

    try {
      setLoading(true);

      // 1. 서버에서 주문 생성
      const res = await api.post(`/orders/${meetingId}`);
      const { merchantUid, amount, orderUid } = res.data.data;
      //console.log("주문 생성 응답:", res.data);

      // 금액이 0원인 경우 → 아임포트 결제 대신 서버 처리
      if (amount === 0) {
        try {
          await api.post(`/payment/free/${orderUid}`, {
            orderUid: orderUid,
          });

        // 사설모임 로직 실행
        if (type === "club") {
          //console.log(participants.length);
          // 참여자 인원 수 계산
          const totalCount = participants.length + 1; // 현재 결제 성공한 나까지 포함
          //console.log(totalCount);
          if (club.min_participants !== undefined) {
            //console.log(club.min_participants);
            // 최소 참여 인원 충족 시 그룹 채팅방 생성로직
            if (totalCount === club?.min_participants) {
              // 최소 참여 인원 처음 충족 → 그룹 채팅방 생성
              await api.post("/chat/room/group", {
                meetingId: club.id,
                memberUserIds: [
                  ...participants.map((p) => Number(p.id)),
                  Number(localStorage.getItem("userId")),
                ],
              });
              //console.log("그룹 채팅방 최초 생성 완료");
            } else if (totalCount > club?.min_participants) {
              await api.post("/chat/group/join", {
                meetingId: club.id,
              });
              //console.log("그룹 채팅방에 새 참여자 합류 완료");
            }
          }
        }

        alert("결제가 완료되었습니다.");
        navigate(`/club/${club.id}`);
        window.location.reload();
        return;
      } catch (err) {
        console.error("결제 처리 실패:", err);
        alert("무료 참여 처리 중 오류가 발생했습니다.");
        return;
      } finally {
        setLoading(false);
      }
    }

      // 2. IMP 초기화
      const { IMP } = window;
      IMP.init("imp82638088");

      // 3. 결제 요청
      IMP.request_pay(
        {
          pg: "html5_inicis.INIpayTest",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: "서울메이트 모임 결제",
          amount: amount,
          buyer_email: "test@test.com",
          buyer_name: "홍길동",
          buyer_tel: "010-1234-5678",
        },
        async (rsp: any) => {
          if (rsp.success) {
            try {
              // 4. 서버 검증
              await api.post("/payment", {
                merchantUid: rsp.merchant_uid,
                impUid: rsp.imp_uid,
              });

              //그룹채팅방 생성
              if (type === "club") {
                // 5. 최소 참여 인원 충족 시 그룹 채팅방 생성
                const totalCount = participants.length + 1; // 현재 결제 성공한 나까지 포함
                if (club.min_participants !== undefined) {
                  if (totalCount === club?.min_participants) {
                    // 최소 참여 인원 처음 충족 → 그룹 채팅방 생성
                    await api.post("/chat/room/group", {
                      meetingId: club.id,
                      memberUserIds: [
                        ...participants.map(p => Number(p.id)), // 기존 참여자
                        Number(localStorage.getItem("userId")), // 현재 유저
                      ],
                    });
                  } else if (totalCount > club?.min_participants) {
                    // 이미 방 존재 → join
                    await api.post("/chat/group/join", {
                      meetingId: club.id,
                    });
                  }
              }
            }

              alert("결제가 완료되었습니다.");
              navigate(`/club/${club.id}`,{replace:true});
              window.location.reload();
            } catch (err) {
              console.error("결제 검증 또는 그룹채팅 생성 실패:", err);
              alert("결제는 완료되었지만 처리 중 오류가 발생했습니다.");
            }
          } else {
            console.error("결제 실패:", rsp.error_msg);
            alert("결제에 실패했습니다. 다시 시도해주세요.");
          }
        }
      );
    } catch (error) {
      console.error("주문 생성 실패:", error);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex fixed bottom-0 w-full px-4 max-w-[clamp(360px,100vw,430px)] mx-auto flex-col gap-2 py-4 bg-white">
      <button
        onClick={orderMeeting}
        disabled={disabled || loading}
        className="flex relative justify-center items-center self-stretch bg-primary-600 rounded-lg h-[50px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
      >
        <span className="relative text-base font-medium text-zinc-50">
          {loading ? "처리중..." : text}
        </span>
      </button>
    </div>
  );
};