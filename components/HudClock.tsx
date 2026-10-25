"use client";
import { useEffect, useState } from "react";

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

export function HudClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime());
    const timer = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hud-clock" aria-hidden="true">
      <span>NEW DELHI, IN — {time ?? "--:--:--"} IST</span>
      <span>28.61° N, 77.21° E</span>
    </div>
  );
}
