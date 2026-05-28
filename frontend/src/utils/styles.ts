import type { CSSProperties } from "react";

const s: Record<string, CSSProperties> = {
  // layout
  page:       { minHeight: "100vh", background: "#0f1117", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "'Segoe UI',system-ui,sans-serif" },
  chatWrap:   { width: "100%", maxWidth: "720px", height: "92vh", display: "flex", flexDirection: "column", background: "#1a202c", borderRadius: "20px", overflow: "hidden", border: "1px solid #2d3748" },
  authWrap:   { width: "100%", maxWidth: "400px" },
  card:       { background: "#1a202c", borderRadius: "20px", padding: "32px", border: "1px solid #2d3748" },
  // header
  header:     { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #2d3748", background: "#1a202c", flexShrink: 0 },
  logoBox:    { width: "36px", height: "36px", background: "#2563eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  // messages
  msgArea:    { flex: 1, overflowY: "auto", padding: "8px 16px", background: "#0f1117" },
  emptyBox:   { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", opacity: 0.4 },
  // input
  inputRow:   { display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderTop: "1px solid #2d3748", background: "#1a202c", flexShrink: 0 },
  input:      { flex: 1, padding: "10px 16px", borderRadius: "22px", background: "#0f1117", border: "1.5px solid #2d3748", color: "#e2e8f0", fontSize: "14px", outline: "none", fontFamily: "inherit" },
  sendBtn:    { width: "42px", height: "42px", borderRadius: "50%", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sendBtnOff: { width: "42px", height: "42px", borderRadius: "50%", background: "#2d3748", color: "#4a5568", border: "none", cursor: "not-allowed", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  // tabs
  tabWrap:    { display: "flex", gap: "4px", background: "#0f1117", borderRadius: "12px", padding: "4px", marginBottom: "24px" },
  tab:        { flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  tabOn:      { background: "#2563eb", color: "#fff" },
  tabOff:     { background: "transparent", color: "#718096" },
  // form
  label:      { fontSize: "12px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", display: "block" },
  fieldInput: {  padding: "10px 10px", borderRadius: "10px", background: "#0f1117", border: "1.5px solid #374151", color: "#e2e8f0", fontSize: "14px", outline: "none", fontFamily: "inherit" },
  errMsg:     { color: "#f87171", fontSize: "12px", marginTop: "4px" },
  btnPrimary: { width: "100%", padding: "11px", borderRadius: "10px", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600, marginTop: "8px" },
  btnOff:     { width: "100%", padding: "11px", borderRadius: "10px", background: "#374151", color: "#6b7280", border: "none", cursor: "not-allowed", fontSize: "14px", fontWeight: 600, marginTop: "8px" },
  // divider
  divWrap:    { display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 8px" },
  divLine:    { flex: 1, height: "1px", background: "#2d3748" },
  divLabel:   { fontSize: "11px", color: "#4b5563", fontWeight: 600, whiteSpace: "nowrap", textTransform: "capitalize" },
  // toast
  toast:      { position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", color: "#fff", padding: "10px 20px", borderRadius: "12px", fontSize: "13px", fontWeight: 600, zIndex: 9999, maxWidth: "320px", textAlign: "center" },
};

export default s;
