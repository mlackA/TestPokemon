import { Metadata } from "next";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { string } from "zod";


// either Static metadata

interface Props {
    title:string,
    children:ReactNode
}


export default function MetaLayout({title,children}:Props) {
  // Product details component
  
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

    const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine);
        if (!navigator.onLine) {
            alert('No existe conexión a internet. Por favor revise su red o, de lo contrario, existirán problemas para obtener los datos de los pokemones.');
        }
    };

    useEffect(() => {
        // Comprobar la conexión solo en el cliente
        setIsOnline(navigator.onLine);


        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        document.title=title

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);
  
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content="Descubre todo sobre tus Pokémon favoritos, sus habilidades y estadísticas." />
            <meta name="keywords" content="Pokémon, juegos, estadísticas, habilidades" />
            
            
            
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content="Descubre todo sobre tus Pokémon favoritos." />
            <meta name="twitter:image" content="https://ejemplo.com/imagen.jpg" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        {children}
    </>
);
}


