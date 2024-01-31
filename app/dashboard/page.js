"use client"
import App from "@/Components/App";
import Dashboard from "@/Components/Dashborad";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function Home() {
  const cookies = new Cookies()
  const router = useRouter()
  useEffect(() => {
    if(!(cookies.get("authtoken"))){
      router.push("/")
    }
  }, [])
  
  return (
    <>
      <App/>
      <Dashboard/>
    </>
  );
}
