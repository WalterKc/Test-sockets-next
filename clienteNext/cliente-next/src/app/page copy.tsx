"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(undefined);
  //aca se guarda el socket(su estado), puede ser util mas adelante

  useEffect(() => {
    // aca, para obtener el socket, es necesario pasar la direccion del servidor io
    // con los cors bien puestos, sino, te va a tirar error
    const socket = io("http://localhost:3000");
  }, []);

  return <div>"HOLAS"</div>;
}
