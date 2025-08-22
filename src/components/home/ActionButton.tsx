"use client";
import { useState } from "react";
import api from "../../services/axios";
import { requestPayment } from "@portone/browser-sdk/v2";

interface ActionButtonProps {
  text: string;
  disabled?: boolean;
  meetingId?: number;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  disabled = false,
  meetingId,
}) => {
  const [loading, setLoading] = useState(false);

  const orderMeeting = async () => {
    if (!meetingId) return;

    try {
      setLoading(true);

      // 1 서버에서 주문 생성 (merchantUid, orderUid, amount 반환)
      const res = await api.post(`/orders/${meetingId}`);
      const { merchantUid, amount, orderUid } = res.data.data;
      console.log("주문 생성:", res.data);

      // 2 PortOne 결제 요청
      const response = await requestPayment({
        storeId: "store-a626ee38-d90e-4465-a178-834af3ce9906", // 발급받은 storeId
        channelKey: "channel-key-9c8bd137-5a26-4116-b2be-a3929b664812", // 발급받은 channelKey
        paymentId: `${merchantUid}`, // 서버에서 생성한 주문 식별자
        orderName: "서울메이트 모임 결제",
        totalAmount: 10, // 서버에서 받은 금액
        currency: "CURRENCY_KRW",
        payMethod: "CARD", // 카드 결제
      });

      // 3 결제 성공 시 서버로 검증 요청
      if (response?.code === "SUCCESS") {
        await api.post("/payment", {
          merchantUid: response.paymentId,
          impUid: response.txId,
        });

        // 4️⃣ 성공 페이지 또는 주문 상세 페이지 이동
        window.location.href = `/orders/${orderUid}`;
      } else {
        console.error("결제 실패:", response?.message);
        // window.location.href = "/fail-payment";
        alert("결제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("결제 중 에러:", error);
      // window.location.href = "/fail-payment";
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
