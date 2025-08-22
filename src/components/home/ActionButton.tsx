"use client";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

interface ActionButtonProps {
  text: string;
  disabled?: boolean;
  meetingId?: number;
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
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // V1 IMP 스크립트 로드
    if (!document.querySelector('script[src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const orderMeeting = async () => {
    if (!meetingId) return;

    try {
      setLoading(true);

      // 1. 서버에서 주문 생성
      const res = await api.post(`/orders/${meetingId}`);
      const { merchantUid, amount, orderUid } = res.data.data;

      // 2. IMP 초기화
      const { IMP } = window;
      IMP.init("imp82638088"); // 고객사 식별코드(V1)

      // 3. 결제 요청
      IMP.request_pay(
        {
          pg: "html5_inicis.INIpayTest", // V1 이니시스 테스트용 PG
          pay_method: "card", // 카드 결제
          merchant_uid: merchantUid, // 서버에서 발급한 주문 ID
          name: "서울메이트 모임 결제",
          amount: amount,
          buyer_email: "test@test.com",
          buyer_name: "홍길동",
          buyer_tel: "010-1234-5678",
        },
        async (rsp: any) => {
          if (rsp.success) {
            try {
              // 4. 서버 검증 요청
              await api.post("/payment", {
                merchantUid: rsp.merchant_uid,
                impUid: rsp.imp_uid,
              });
              
              alert("결제가 완료되었습니다.");
              navigate("/home");
            } catch (err) {
              console.error("결제 검증 실패:", err);
              alert("결제는 완료되었지만 검증에 실패했습니다.");
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
