import React from "react";

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      fill="currentColor"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {/* Telegram paper plane icon — bold rounded style matching user's provided icon */}
      <path d="M36.5 121c35.4-15.4 59-25.6 70.9-30.5 33.7-14 40.7-16.4 45.3-16.5 1 0 3.3.2 4.8 1.5 1.2 1 1.6 2.3 1.7 3.3.2 1 .4 3.2.2 5-1.9 19.3-9.8 66-13.8 87.7-1.7 9.1-5.1 12.2-8.4 12.5-7.1.6-12.5-4.7-19.4-9.2-10.8-7.1-16.9-11.5-27.5-18.5-12.2-8-4.3-12.4 2.7-19.6 1.8-1.9 33.3-30.5 33.9-33.1.1-.3.1-1.5-.6-2.1-.7-.6-1.7-.4-2.5-.2-1.1.2-18.4 11.7-52 34.4-4.9 3.4-9.4 5-13.4 4.9-4.4-.1-12.8-2.5-19.1-4.6-7.7-2.5-13.9-3.8-13.4-8.1.3-2.2 3.4-4.5 9.1-6.8z" />
    </svg>
  );
}
