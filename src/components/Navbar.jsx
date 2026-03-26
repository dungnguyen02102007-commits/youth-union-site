import { NavLink } from "react-router-dom";

export default function Navbar() {
  const baseLink = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "6px 12px",
    transition: "0.3s",
    borderRadius: "6px",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#2c3e50",
        position: "sticky",   // 🔥 stays on top
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)", // 🔥 shadow
      }}
    >
      {/* LOGO */}
      <h2 style={{ color: "white", margin: 0 }}>Youth Union</h2>

      {/* MENU */}
      <div style={{ display: "flex", gap: "20px" }}>
        {["/", "/about", "/events", "/news", "/contact"].map((path, i) => {
          const names = ["Home", "About", "Events", "News", "Contact"];

          return (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                ...baseLink,
                background: isActive ? "#34495e" : "transparent",
              })}
              onMouseEnter={(e) => {
                e.target.style.background = "#34495e";
              }}
              onMouseLeave={(e) => {
                if (!e.target.classList.contains("active")) {
                  e.target.style.background = "transparent";
                }
              }}
            >
              {names[i]}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}