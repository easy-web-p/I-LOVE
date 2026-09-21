import React from "react";
import { HeartCrack, RefreshCw, Home } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "radial-gradient(ellipse at center, #FFF5F7 0%, #FFF9FB 100%)",
            textAlign: "center"
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "480px",
              width: "100%",
              padding: "40px 28px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(232, 93, 142, 0.2)",
              boxShadow: "var(--shadow-modal)"
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(232, 93, 142, 0.12)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}
            >
              <HeartCrack size={32} />
            </div>

            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                marginBottom: "10px"
              }}
            >
              เกิดข้อผิดพลาดขึ้นชั่วคราว
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                marginBottom: "28px",
                lineHeight: 1.6
              }}
            >
              ขออภัยในความไม่สะดวก ระบบพบปัญหาในการแสดงผลหน้านี้ <br />
              ความทรงจำของคุณปลอดภัยดี ไม่สูญหายแน่นอนครับ
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={this.handleReload}
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <RefreshCw size={16} /> โหลดหน้านี้ใหม่
              </button>
              <button
                onClick={this.handleGoHome}
                className="btn btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <Home size={16} /> กลับหน้าแรก
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
