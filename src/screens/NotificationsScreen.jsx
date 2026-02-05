import React from "react";
import { ChevronLeft, Menu, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "../components/UI.jsx";

const NotificationRow = ({ tone, title, body, time }) => {
  const Icon = tone === "danger" ? AlertCircle : CheckCircle2;
  const iconColor = tone === "danger" ? "text-red-500" : "text-brand-600";
  return (
    <div className="flex gap-3 px-4 py-4">
      <div className={`shrink-0 h-10 w-10 rounded-full bg-ink-50 border border-ink-100 flex items-center justify-center ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold text-ink-900">{title}</p>
        <p className="mt-1 text-[12px] text-ink-500">{body}</p>
        <p className="mt-2 text-[11px] text-ink-500">{time}</p>
      </div>
    </div>
  );
};

export default function NotificationsScreen({ notifications, onBack }) {
  return (
    <div className="bg-white">
      <header className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="h-10 w-10 rounded-full flex items-center justify-center active:scale-[0.98]" aria-label="뒤로">
            <ChevronLeft className="h-6 w-6 text-ink-700" />
          </button>
          <p className="text-[16px] font-bold text-ink-900">알림</p>
          <button className="h-10 w-10 rounded-full flex items-center justify-center active:scale-[0.98]" aria-label="메뉴">
            <Menu className="h-6 w-6 text-ink-700" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-3">
        <Card>
          {notifications.map((n, idx) => (
            <div key={n.id} className={idx ? "border-t border-ink-100" : ""}>
              <NotificationRow {...n} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
