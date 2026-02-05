import React, { useMemo, useState } from "react";
import HomeScreen from "./screens/HomeScreen.jsx";
import NotificationsScreen from "./screens/NotificationsScreen.jsx";
import TasksScreen from "./screens/TasksScreen.jsx";

const todayISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

export default function App() {
  const [route, setRoute] = useState({ name: "home" }); // home | notifications | tasks
  const [tasks, setTasks] = useState(() => {
    // 더미 데이터: 과제/할 일 섞어서 관리
    return [
      { id: "a1", kind: "assignment", date: "2026.02.02", title: "미적분 30문제", subject: "수학", target: "목표 30문제", done: true },
      { id: "a2", kind: "assignment", date: "2026.02.02", title: "문학 1지문 정리", subject: "국어", target: "핵심 표현 5개", done: false },
      { id: "t1", kind: "todo", date: "2026.02.01", title: "미적분 1단원 교과서 문제 풀기", subject: "수학", target: "목표 30문제", done: true },
      { id: "t2", kind: "todo", date: "2026.02.01", title: "단어 시험 공부", subject: "영어", target: "1단원 단어리스트", done: true },
      { id: "t3", kind: "todo", date: "2026.01.31", title: "비문학 1지문 정리", subject: "국어", target: "핵심 표현 5개", done: true },
      { id: "t4", kind: "todo", date: "2026.01.31", title: "미적분 1단원 개념 정리", subject: "수학", target: "목표 30문제", done: true },
    ];
  });

  const notifications = useMemo(() => ([
    { id: "n1", tone: "danger", title: "과제 미완료 리마인드", body: "영어 지문 2개 요약이 아직 미완료예요.", time: "방금" },
    { id: "n2", tone: "ok", title: "멘토 피드백 등록", body: "국어 피드백이 등록되었어요. 확인해 주세요.", time: "1시간 전" },
  ]), []);

  const feedback = useMemo(() => ([
    { id: "f1", date: "2026.02.02", subject: "국어", title: "풀이과정을 자세히 쓰기", subtitle: "비문학 1지문 정리" },
    { id: "f2", date: "2026.01.31", subject: "국어", title: "핵심 표현 한 문장으로 정리하기", subtitle: "비문학 1지문 정리" },
    { id: "f3", date: "2026.01.31", subject: "국어", title: "오답 근거 확실히 적기", subtitle: "문학 1지문 정리" },
  ]), []);

  const nav = {
    toHome: () => setRoute({ name: "home" }),
    toNotifications: () => setRoute({ name: "notifications" }),
    toTasks: (tab = "assignment") => setRoute({ name: "tasks", tab }),
  };

  const actions = {
    toggleTask: (id) => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    },
    addTask: ({ kind, title, subject, target }) => {
      const id = `${kind}-${Math.random().toString(16).slice(2, 10)}`;
      const date = todayISO();
      setTasks(prev => [{ id, kind, date, title, subject, target, done: false }, ...prev]);
    },
  };

  return (
    <div className="min-h-screen bg-white flex justify-center py-6">
      <div className="w-[360px] max-w-[92vw]">
        {route.name === "home" && (
          <HomeScreen
            onOpenNotifications={nav.toNotifications}
            onOpenTasks={(tab) => nav.toTasks(tab)}
          />
        )}
        {route.name === "notifications" && (
          <NotificationsScreen
            notifications={notifications}
            onBack={nav.toHome}
          />
        )}
        {route.name === "tasks" && (
          <TasksScreen
            initialTab={route.tab || "assignment"}
            tasks={tasks}
            feedback={feedback}
            onBack={nav.toHome}
            onToggleTask={actions.toggleTask}
            onAddTask={actions.addTask}
          />
        )}
      </div>
    </div>
  );
}
