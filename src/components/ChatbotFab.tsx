export default function ChatbotFab() {
  return (
    <a
      title="Open chatbot"
      aria-label="Open chatbot"
      className="fixed bottom-16 right-2 z-[40] md:bottom-10 md:right-6"
      href="https://sharepal.in/chatbot"
    >
      <div className="w-20 lg:w-28">
        {/* static approximation of SharePal's lime chatbot lottie */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="500"
          height="500"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%", contentVisibility: "visible" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="chat-fab-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B6FF3D" />
              <stop offset="100%" stopColor="#9DFF00" />
            </linearGradient>
          </defs>
          {/* blob body */}
          <path
            fill="url(#chat-fab-g)"
            d="M250 74c96 0 174 70 184 158 9 78-33 156-104 190-64 31-143 27-203-14-63-43-97-120-87-196C51 137 145 74 250 74Z"
          />
          {/* eyes */}
          <circle cx="196" cy="238" r="26" fill="#030D31" />
          <circle cx="304" cy="238" r="26" fill="#030D31" />
          <circle cx="204" cy="230" r="9" fill="#FFFFFF" />
          <circle cx="312" cy="230" r="9" fill="#FFFFFF" />
          {/* smile */}
          <path
            d="M206 316c22 30 66 30 88 0"
            stroke="#030D31"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* chat-tail */}
          <path
            fill="#9DFF00"
            d="M170 404c-6 26-4 48 2 68 22-14 44-33 56-57-22 3-41 0-58-11Z"
          />
        </svg>
      </div>
    </a>
  );
}
