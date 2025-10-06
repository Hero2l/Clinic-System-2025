"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(redirectPath: string) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (!authenticated) {
      router.push(redirectPath);
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router, redirectPath]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push(redirectPath);
  };

  return { isAuthenticated, isLoading, handleLogout };
}
