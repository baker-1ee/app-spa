"use client";

import { useState, useEffect, useRef } from "react";

// 지출 항목 타입 정의
type Expense = {
  id: number;
  category: string;
  amount: number;
};

// Mock API 함수 (실제 API 요청 대신 사용)
async function fetchExpenses(): Promise<Expense[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, category: "커피", amount: 2000 },
        { id: 2, category: "식비", amount: 3000 },
        { id: 3, category: "교통비", amount: 1500 },
      ]);
    }, 500); // 0.5초 딜레이 (API 응답 시뮬레이션)
  });
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadExpenses() {
      const data = await fetchExpenses();
      setExpenses(data);
      setLoading(false);
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    if (showPopup) {
      amountInputRef.current?.focus();
    }
  }, [showPopup]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setAmount(""); // 입력 정보 초기화
  };

  return (
    <div className="min-h-screen p-4 bg-black text-white relative">
      <header className="flex justify-between items-center py-4 px-4">
        <h1 className="text-lg font-bold">오늘의 지출</h1>
      </header>

      {loading ? (
        <p className="text-center mt-4">로딩 중...</p>
      ) : (
        <section className="mt-4 px-4">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div key={expense.id} className="bg-gray-800 p-2 my-2 rounded-md flex justify-between">
                <span>{expense.category}</span>
                <span className="text-red-500">{expense.amount}원</span>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">오늘 지출 내역이 없습니다.</p>
          )}
        </section>
      )}

      {/* + 버튼 */}
      <div className="fixed bottom-16 right-6">
        <button
          className="bg-blue-500 text-white p-4 rounded-full"
          onClick={() => setShowPopup(true)}
        >
          +
        </button>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">금액 입력</h2>
            <div className="relative w-full mb-4">
              <span className="absolute left-3 top-2.5 text-black">₩</span>
              <input
                type="number"
                ref={amountInputRef}
                className="w-full p-2 pl-6 text-black rounded text-right"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="금액 입력"
                inputMode="numeric"
              />
            </div>
            <div className="flex justify-between">
              <button
                className={`px-4 py-2 rounded-lg ${type === "income" ? "bg-green-500" : "bg-gray-700"}`}
                onClick={() => setType("income")}
              >입금</button>
              <button
                className={`px-4 py-2 rounded-lg ${type === "expense" ? "bg-red-500" : "bg-gray-700"}`}
                onClick={() => setType("expense")}
              >지출</button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-600 rounded-lg mr-2"
                onClick={handleClosePopup}
              >취소</button>
              <button className="px-4 py-2 bg-blue-500 rounded-lg">저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
