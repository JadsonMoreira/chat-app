export const getUsers = (): any[] => { try { return JSON.parse(localStorage.getItem("cu") || "[]"); } catch { return []; } };
export const saveUsers = (u: any[]) => localStorage.setItem("cu", JSON.stringify(u));
export const getMsgs = (): any[] => { try { return JSON.parse(localStorage.getItem("cm") || "[]"); } catch { return []; } };
export const saveMsgs = (m: any[]) => localStorage.setItem("cm", JSON.stringify(m));
export const getSession = (): any | null => { try { return JSON.parse(sessionStorage.getItem("cs") || "null"); } catch { return null; } };
export const saveSession = (u: any) => sessionStorage.setItem("cs", JSON.stringify(u));
export const clearSession = () => sessionStorage.removeItem("cs");
