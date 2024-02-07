"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
/**
 * esto asi como esta, no hace nada, pero, es buena intro a los sockets y se va a expandir para practicar
 * voy a ir explicando lo que entienda , asi queda para cuando no te acuerdes de
 *
 */

export default function Home() {
  const [socket, setSocket] = useState<any>(undefined);
  //aca se guarda el socket(su estado), puede ser util mas adelante
  const [inbox, setInbox] = useState<any>(["hola", "bien"]);
  const [mensaje, setMensaje] = useState("");
  const [roomName, setRoomName] = useState("");

  const manejarMensaje = () => {
    socket.emit("message", mensaje, roomName);
    console.log("SE ENVIO EL MENSAJE!");
  };
  const manejarRoomName = () => {
    socket.emit("joinRoom", roomName);
    console.log("SE ENVIO EL ROOMNAME!");
  };

  useEffect(() => {
    // aca, para obtener el socket, es necesario pasar la direccion del servidor io
    // con los cors bien puestos, sino, te va a tirar error
    const socket = io("http://localhost:3000");

    socket.on("message", (mensaje) => {
      console.log("ESTOS ES LO QUE LLEGA DEL SERVER!", mensaje);
      setInbox((inbox: any) => [...inbox, mensaje]);
      //updateEstado(mensajesDelServer);

      //NOTA:, el "..." acctua como un array push, osea, se van a ir agregando cosas al array, sin borrar lo anterior
    });
    setSocket(socket);
    //console.log("ESTE ES EL SOCKET!", socket);
  }, []);

  return (
    <div className="flex flex-col gap-5 nt-20 px-10 lg:px-48">
      {/*muestro algun mensaje */}
      <div className="flex flex-col gap-2 border rounded-lg p-10">
        {/*este de aca abajo, como se ve en el map, va a escribir 2 veces el "hola"
        por que el estado del inbox hay 2 objetos */}
        {inbox.map((message: string, index: number) => (
          <div key={index} className="border rounded px-4 py-2">
            {message}
          </div>
        ))}
      </div>
      <div className="flex gap-2 align-center justify-center">
        <input
          onChange={(e) => {
            setMensaje(e.target.value);
            console.log("este es el target del mensaje", e.target.value);
          }}
          type="text"
          name="message"
          className="flex-1 bg-black border rounded px-2 py-1"
        ></input>
        <button className="w-40" onClick={manejarMensaje}>
          enviar mensaje
        </button>
      </div>
      {/** */}
      <div className="flex gap-2 align-center justify-center">
        <input
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          type="text"
          name="message"
          className="flex-1 bg-black border rounded px-2 py-1"
        ></input>
        <button className="w-40" onClick={manejarRoomName}>
          unirse al room
        </button>
      </div>
    </div>
  );
}
