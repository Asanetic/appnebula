"use client";

export default function PageOverlayLoader({ show = false }) {
  if (!show) return null;

  return (
    <div className="page-overlay-loader">
      <div className="spinner"></div>

      <style jsx>{`
        .page-overlay-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #e0e0e0;
          border-top: 6px solid #0070f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
