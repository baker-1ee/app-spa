"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    async function loadExpenses() {
      const data = await fetchExpenses();
      setExpenses(data);
      setLoading(false);
    }
    loadExpenses();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-black text-white">
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
    </div>
  );
}
