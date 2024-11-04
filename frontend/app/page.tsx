"use client"

import { useAuth } from "./auth-context";
import DataPage from "./data-page";
import LoginForm from './login';

export default function Home() {

  const { token } = useAuth();

  return (
    <main>
      {
        !token ? 
        <LoginForm/> : <DataPage/>
      }
    </main>
  );
}
