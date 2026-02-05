import React, { useMemo, useState } from "react";
import { ChevronLeft, Menu, Plus } from "lucide-react";
import { Card, Chip, CircleCheck, DatePill, PrimaryPill, Modal } from "../components/UI.jsx";

const subjectTone = (s) => {
  if (s === "국어") return "red";
  if (s === "수학") return "blue";
  if (s === "영어") return "orange";
  return "gray";
};

const groupByDate = (items) => {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.date)) map.set(it.date, []);
    map.get(it.date).push(it);
  }
  // 최신 날짜 먼저
  const keys = Array.from(map.keys()).sort((a, b) => (a < b ? 1 : -1));
  return keys.map((k) => ({ date: k, items: map.get(k) }));
};

const TaskRow = ({ item, onToggle }) => (
  <div className="flex gap-3 px-4 py-4">
    <CircleCheck checked={item.done} onClick={() => onToggle(item.id)} />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2 min-w-0">
        <p className="truncate text-[14px] font-semibold text-ink-900">{item.title}</p>
        <Chip tone={subjectTone(item.subject)}>{item.subject}</Chip>
      </div>
      <p className="mt-1 text-[12px] text-ink-500">{item.target}</p>
    </div>
  </div>
);

const FeedbackRow = ({ item }) => (
  <div className="px-4 py-4">
    <p className="text-[14px] font-semibold text-ink-900">{item.title}</p>
    <p className="mt-1 text-[12px] text-ink-500">{item.subtitle}</p>
  </div>
);

export default function TasksScreen({
  initialTab = "assignment",
  tasks,
  feedback,
  onBack,
  onToggleTask,
  onAddTask,
}) {
  const [tab, setTab] = useState(initialTab); // assignment | todo | feedback
  const [subjectFilter, setSubjectFilter] = useState("국어");
  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "수학", target: "목표 30문제" });

  const assignments = useMemo(() => tasks.filter(t => t.kind === "assignment"), [tasks]);
  const todos = useMemo(() => tasks.filter(t => t.kind === "todo"), [tasks]);

  const groupedAssignments = useMemo(() => groupByDate(assignments), [assignments]);
  const groupedTodos = useMemo(() => groupByDate(todos), [todos]);

  const filteredFeedback = useMemo(() => feedback.filter(f => f.subject === subjectFilter), [feedback, subjectFilter]);
  const groupedFeedback = useMemo(() => groupByDate(filteredFeedback), [filteredFeedback]);

  const openAddForTodo = () => { setOpenAdd(true); };
  const submitAdd = () => {
    const title = form.title.trim();
    if (!title) return;
    onAddTask({
      kind: tab === "assignment" ? "assignment" : "todo",
      title,
      subject: form.subject,
      target: form.target || "",
    });
    setForm({ title: "", subject: form.subject, target: form.target });
    setOpenAdd(false);
  };

  return (
    <div className="bg-white relative pb-20">
      <header className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="h-10 w-10 rounded-full flex items-center justify-center active:scale-[0.98]" aria-label="뒤로">
            <ChevronLeft className="h-6 w-6 text-ink-700" />
          </button>
          <p className="text-[16px] font-bold text-ink-900">과제/할 일</p>
          <button className="h-10 w-10 rounded-full flex items-center justify-center active:scale-[0.98]" aria-label="메뉴">
            <Menu className="h-6 w-6 text-ink-700" />
          </button>
        </div>

        {/* Segmented tabs */}
        <div className="mt-3 bg-ink-100 rounded-full p-1 flex gap-1">
          {[
            { key: "assignment", label: "과제" },
            { key: "todo", label: "할 일" },
            { key: "feedback", label: "과목별 피드백" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 text-[12px] py-2 rounded-full font-semibold transition ${
                tab === t.key ? "bg-brand-600 text-white shadow-sm" : "text-ink-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="px-4 pt-2">
        {tab === "assignment" && (
          <div className="space-y-4">
            {groupedAssignments.map((g) => (
              <div key={g.date}>
                <div className="flex items-center gap-2 mb-2">
                  <DatePill>{g.date}</DatePill>
                  {g.date === "2026.02.02" ? <PrimaryPill>오늘</PrimaryPill> : null}
                </div>
                <Card>
                  {g.items.map((it, idx) => (
                    <div key={it.id} className={idx ? "border-t border-ink-100" : ""}>
                      <TaskRow item={it} onToggle={onToggleTask} />
                    </div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        )}

        {tab === "todo" && (
          <div className="space-y-4">
            {groupedTodos.map((g) => (
              <div key={g.date}>
                <div className="flex items-center gap-2 mb-2">
                  <DatePill>{g.date}</DatePill>
                  {g.date === "2026.02.02" ? <PrimaryPill>오늘</PrimaryPill> : null}
                </div>
                <Card>
                  {g.items.map((it, idx) => (
                    <div key={it.id} className={idx ? "border-t border-ink-100" : ""}>
                      <TaskRow item={it} onToggle={onToggleTask} />
                    </div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        )}

        {tab === "feedback" && (
          <div className="space-y-3">
            <div className="flex gap-2">
              {["국어", "영어", "수학"].map((s) => (
                <button key={s} onClick={() => setSubjectFilter(s)}>
                  <Chip tone={subjectTone(s)}>{s}</Chip>
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-ink-100/70 border border-ink-100 px-4 py-3 text-[12px] text-ink-600">
              <p className="font-semibold text-ink-700 mb-1">이번주 멘토 피드백 요약</p>
              <p>문학은 틀린 표현을 문장으로 정리하고, 선택지 오답 근거를 반드시 적어두기</p>
            </div>

            {groupedFeedback.map((g) => (
              <div key={g.date}>
                <div className="flex items-center gap-2 mb-2">
                  <DatePill>{g.date}</DatePill>
                  {g.date === "2026.02.02" ? <PrimaryPill>오늘</PrimaryPill> : null}
                </div>
                <Card>
                  {g.items.map((it, idx) => (
                    <div key={it.id} className={idx ? "border-t border-ink-100" : ""}>
                      <FeedbackRow item={it} />
                    </div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB only for todo tab */}
      {tab === "todo" && (
        <button
          type="button"
          onClick={() => { setOpenAdd(true); }}
          className="fixed z-40 bottom-10 left-1/2 -translate-x-1/2 w-[360px] max-w-[92vw] px-4"
          aria-label="할 일 추가"
        >
          <div className="ml-auto w-fit flex items-center gap-2 bg-brand-600 text-white px-5 py-3 rounded-2xl shadow-fab active:scale-[0.99]">
            <Plus className="h-5 w-5" />
            <span className="text-[13px] font-semibold">할 일 추가</span>
          </div>
        </button>
      )}

      {/* Add modal */}
      <Modal open={openAdd} title={tab === "assignment" ? "과제 추가" : "할 일 추가"} onClose={() => setOpenAdd(false)}>
        <div className="space-y-3">
          <div>
            <label className="text-[12px] text-ink-600">제목</label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="mt-1 w-full border border-ink-200 rounded-xl px-3 py-2 text-[14px] outline-none focus:border-brand-500"
              placeholder="예) 비문학 1지문 정리"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[12px] text-ink-600">과목</label>
              <select
                value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                className="mt-1 w-full border border-ink-200 rounded-xl px-3 py-2 text-[14px] bg-white"
              >
                <option value="국어">국어</option>
                <option value="영어">영어</option>
                <option value="수학">수학</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] text-ink-600">목표/설명</label>
              <input
                value={form.target}
                onChange={(e) => setForm((p) => ({ ...p, target: e.target.value }))}
                className="mt-1 w-full border border-ink-200 rounded-xl px-3 py-2 text-[14px] outline-none focus:border-brand-500"
                placeholder="예) 목표 30문제"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setOpenAdd(false)}
              className="flex-1 border border-ink-200 rounded-xl py-2 text-[14px] text-ink-700"
            >
              취소
            </button>
            <button
              onClick={submitAdd}
              className="flex-1 bg-brand-600 rounded-xl py-2 text-[14px] text-white font-semibold"
            >
              추가
            </button>
          </div>

          <p className="text-[11px] text-ink-500">
            * 추가하면 오늘 날짜(로컬 기준)로 맨 위에 들어가요. 체크 버튼으로 완료 처리 가능.
          </p>
        </div>
      </Modal>
    </div>
  );
}
