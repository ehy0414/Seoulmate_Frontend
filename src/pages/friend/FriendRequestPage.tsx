import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderSeoulmate } from "../../components/common/HeaderSeoulmate";
import RequestUserListItem from "../../components/friend/request/RequestUserListItem";
import BottomNavBar from "../../components/common/BottomNavBar";
import { FriendsModal } from "../../components/modal/FriendsModal";
import TabMenu from "../../components/common/TabMenu";

import type { FriendRequest } from "../../components/friend/request/RequestUserListItem";
import api from "../../services/axios";

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export const FriendRequestPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const FIRST_TAB = "친구 목록";
  const SECOND_TAB = "친구 요청";
  const [activeTab, setActiveTab] = useState<string>(SECOND_TAB);

  const [list, setList] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());

  const navigate = useNavigate();

  const onFirstTabClick = () => {
    setActiveTab(FIRST_TAB);
    navigate("/friend");
  };

  const onSecondTabClick = () => {
    setActiveTab(SECOND_TAB);
    navigate("/friend/request");
  };

  // 요청 목록 불러오기
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<ApiResponse<FriendRequest[]>>("/friends/requests");
      setList(res.data.data ?? []);
    } catch (e) {
      setError("친구 요청 목록을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 수락
  const handleAccept = async (req: FriendRequest) => {
    if (!confirm(`${req.name} 님의 친구 요청을 수락하시겠습니까?`)) return;

    // 낙관적 업데이트
    setList((prev) => prev.filter((r) => r.requestId !== req.requestId));
    setPendingIds((prev) => new Set(prev).add(req.requestId));

    try {
      await api.patch(`/friends/requests/${req.requestId}`, { status: "APPROVED" });
    } catch (e) {
      alert("수락 처리에 실패했어요. 다시 시도해 주세요.");
      // 되돌리기
      setList((prev) => [req, ...prev]);
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(req.requestId);
        return next;
      });
    }
  };

  // 거절
  const handleDelete = async (req: FriendRequest) => {
    if (!confirm(`${req.name} 님의 친구 요청을 거절하시겠습니까?`)) return;

    // 낙관적 업데이트
    setList((prev) => prev.filter((r) => r.requestId !== req.requestId));
    setPendingIds((prev) => new Set(prev).add(req.requestId));

    try {
      await api.patch(`/friends/requests/${req.requestId}`, { status: "REJECTED" });
    } catch (e) {
      alert("거절 처리에 실패했어요. 다시 시도해 주세요.");
      // 되돌리기
      setList((prev) => [req, ...prev]);
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(req.requestId);
        return next;
      });
    }
  };

  return (
    <main className="h-screen flex flex-col bg-white overflow-hidden">
      <HeaderSeoulmate title="서울메이트" alarm={false} />

      {/* 헤더 높이 보정 */}
      <div className="mt-[60px]" />

      <TabMenu
        firstTabText={FIRST_TAB}
        secondTabText={SECOND_TAB}
        activeTab={activeTab}
        onFirstTabClick={onFirstTabClick}
        onSecondTabClick={onSecondTabClick}
      />

      <section className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl">
          {/* 로딩 / 에러 상태 */}
          {loading && (
            <div className="p-8 text-center text-gray-500">불러오는 중…</div>
          )}
          {error && !loading && (
            <div className="p-8 text-center text-red-500">
              {error} <button className="underline" onClick={fetchRequests}>다시 시도</button>
            </div>
          )}

          {!loading && !error && (
            <ul className="divide-y rounded-xl bg-white">
              {list.map((request) => (
                <RequestUserListItem
                  key={request.requestId}
                  request={request}
                  onAccept={() => pendingIds.has(request.requestId) ? undefined : handleAccept(request)}
                  onReject={() => pendingIds.has(request.requestId) ? undefined : handleDelete(request)}
                />
              ))}

              {list.length === 0 && (
                <li className="p-8 text-center text-gray-500">
                  처리할 친구 요청이 없습니다.
                </li>
              )}
            </ul>
          )}
        </div>

        <FriendsModal isVisible={isModalVisible} onClose={closeModal} />
      </section>

      <BottomNavBar menu="friend" />
    </main>
  );
};

export default FriendRequestPage;
