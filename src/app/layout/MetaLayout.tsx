import { Metadata } from "next";
import { ReactNode, useEffect, useState } from "react";
import { string } from "zod";


// either Static metadata

interface Props {
    title:string,
    children:ReactNode
}
const metadata: Metadata = {
    title: "",
  }

export default function MetaLayout({title,children}:Props) {
  // Product details component
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
    if(!navigator.onLine){
        alert('No existe conexion a internet por favor revise su red o de lo contrario existiran problemas a obtener los datos de los pokemones')
    }
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    document.title=title

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);
  
  return (children)
}


