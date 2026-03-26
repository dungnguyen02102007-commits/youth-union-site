import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px", textAlign: "center" }}>
        {children}
      </main>
    </div>
  );
}