export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div
        style={{
          height: "300px",
          background: "linear-gradient(135deg, #2c3e50, #3498db)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Youth Union Platform
        </h1>
        <p style={{ fontSize: "18px" }}>
          Connecting youth • Organizing events • Building community
        </p>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Welcome 👋</h2>
        <p>
          This platform helps manage youth activities, events, and community
          engagement.
        </p>
      </div>
    </div>
  );
}
