export const useUser = () =>
  useState("user") || localStorage.getItem("user") || null;
