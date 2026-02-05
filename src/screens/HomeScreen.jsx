import React from "react";
import { Bell, Menu, ChevronRight, Upload, Check } from "lucide-react";
import { Card, Chip, IconButton } from "../components/UI.jsx";

const SectionHeader = ({ title, onOpen }) => (
  <div className="flex items-center justify-between px-4 pt-6 pb-3">
    <h2 className="text-[15px] font-semibold text-ink-900">{title}</h2>
    <button onClick={onOpen} className="text-ink-500 active:scale-[0.98]" aria-label={`${title} 이동`}>
      <ChevronRight className="h-5 w-5" />
    </button>
  </div>
);

const Row = ({ checked, title, subtitle, chipTone, chipText, highlight }) => (
  <div className={`${highlight ? "bg-ink-50" : "bg-white"} flex items-center gap-3 px-4 py-4`}>
    <div className="shrink-0">
      {checked ? (
        <div className="h-6 w-6 rounded-full bg-ink-100 flex items-center justify-center">
          <Check className="h-4 w-4 text-ink-700" />
        </div>
      ) : (
        <div className="h-6 w-6 rounded-full border border-ink-300" />
      )}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2 min-w-0">
        <p className="truncate text-[14px] font-semibold text-ink-900">{title}</p>
        <Chip tone={chipTone}>{chipText}</Chip>
      </div>
      <p className="mt-1 text-[12px] text-ink-500">{subtitle}</p>
    </div>
  </div>
);

export default function HomeScreen({ onOpenNotifications, onOpenTasks }) {
  const assignments = [
    { checked: false, title: "문학 1지문 정리", chipTone: "red", chipText: "국어", subtitle: "핵심 포인트 6개" },
    { checked: false, title: "미적분 1단원 개념 정리", chipTone: "blue", chipText: "수학", subtitle: "목표 30문제" },
    { checked: true, title: "미적분 30문제", chipTone: "blue", chipText: "수학", subtitle: "목표 30문제", highlight: true },
  ];

  const todos = [
    { checked: false, title: "미적분 30문제", chipTone: "blue", chipText: "수학", subtitle: "목표 30문제" },
    { checked: true, title: "단어 시험공부", chipTone: "gray", chipText: "영어", subtitle: "1단원 단어 리스트" },
  ];

  return (
    <div className="bg-white">
      <header className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-[20px] font-bold text-ink-900 truncate">김수현님</p>
            <p className="mt-1 text-[12px] text-ink-500">2026년 2월 1일 (일)</p>
          </div>
          <div className="flex items-center gap-3">
            <IconButton label="알림" onClick={onOpenNotifications}>
              <Bell className="h-5 w-5 text-ink-700" />
            </IconButton>
            <IconButton label="메뉴" onClick={() => {}}>
              <Menu className="h-5 w-5 text-ink-700" />
            </IconButton>
          </div>
        </div>
      </header>

      {/* Calendar placeholder */}
      <div className="px-4 pt-2">
        <div className="rounded-2xl bg-ink-100/60 border border-ink-100 px-4 py-3 text-ink-500 text-[12px]">
          달력 영역은 제외(placeholder)
        </div>
      </div>

      {/* Assignments */}
      <SectionHeader title="과제" onOpen={() => onOpenTasks("assignment")} />
      <div className="mx-4">
        <Card>
          {assignments.map((it, idx) => (
            <div key={idx} className={idx ? "border-t border-ink-100" : ""}>
              <Row {...it} />
            </div>
          ))}
        </Card>
      </div>

      {/* Todos */}
      <SectionHeader title="할 일" onOpen={() => onOpenTasks("todo")} />
      <div className="mx-4">
        <Card>
          {todos.map((it, idx) => (
            <div key={idx} className={idx ? "border-t border-ink-100" : ""}>
              <Row {...it} />
            </div>
          ))}
        </Card>
      </div>

      {/* Planner */}
      <SectionHeader title="플래너" onOpen={() => {}} />
      <div className="mx-4 mb-3 rounded-2xl border-2 border-dashed border-ink-200 bg-white px-4 py-10 flex flex-col items-center justify-center gap-3 text-ink-500">
        <div className="h-12 w-12 rounded-2xl bg-ink-100 flex items-center justify-center">
          <Upload className="h-6 w-6" />
        </div>
        <p className="text-[13px]">사진을 업로드해주세요</p>
      </div>

      {/* Bottom input */}
      <div className="mx-4 mt-4 mb-8 rounded-2xl border border-ink-100 bg-white shadow-sm px-4 py-3">
        <p className="text-[13px] text-ink-500">멘토님에게 질문을 남겨주세요</p>
      </div>
    </div>
  );
}
