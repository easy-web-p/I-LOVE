import React from "react";

export function RomanticLoadingFallback({ message = "กำลังโหลดความทรงจำแสนพิเศษ..." }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        textAlign: "center"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "72px",
          height: "72px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232, 93, 142, 0.25) 0%, rgba(255, 105, 180, 0) 70%)",
            animation: "pulse 1.8s infinite ease-in-out"
          }}
        />
        <div
          style={{
            fontSize: "36px",
            animation: "pulse 1.2s infinite ease-in-out",
            filter: "drop-shadow(0 4px 12px rgba(232, 93, 142, 0.4))"
          }}
        >
          💖
        </div>
      </div>

      <h3
        style={{
          fontSize: "17px",
          fontWeight: 600,
          color: "var(--color-primary)",
          marginBottom: "6px",
          letterSpacing: "0.3px"
        }}
      >
        {message}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-text-secondary)",
          maxWidth: "320px",
          lineHeight: 1.5
        }}
      >
        ช่วงเวลาดีๆ กำลังถูกจัดเตรียมให้คุณอย่างประณีต ✨
      </p>
    </div>
  );
}
