const io = require("socket.io")(3000, {
  cors: { origin: "http://localhost:3001", methods: ["GET", "POST"] },
});
/**
 * ok, esto de arriva es para la version 3X, pero asumo que se puede en la 4
 * esto es para compartir datos y que no tenga el problema de cors, lo que tengo que pasar aca
 * es la direccion de el servidor/pagina de next, o cualquier otra cosa que se conecte
 * seguro es posible enviar mas de una, pero esa no es la question aca, no voy a complicar esto
 * que aun no se como usar bien
 * tambien admite el metodo get y post
 */
//NOTA, aprender que mierda es cors
io.on("connection", (socket) => {
  console.log(" SE CONECTO UN USUARIO!");
  socket.on("disconnect", () => {
    console.log("se desconecto alguien!");
  });
  /**
   * esto es importante, cuando se recibe un mensaje o algo de el cliente
   * se tiene que pedir con el nombre del cliente envia, esto 2 de abajo, con el "msj", no van a funcionar
   * en cambion, en el cliente, usamos mensaje y roomName, y esos hay que usar
   */
  /* estos de aca, estarian correctos, si no tubieran el "msj", los dejo como ejemplo de lo que no hay que hacer
  socket.on("chat message", (msg) => {
    console.log("mensaje de chat", msg);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  */
  //nota 2, guarda con los nombres
  //nota 3, para recibir los mensajes del servidor, tambien hay que tener un socket on en el lado del cliente
  //que no se te olvide!
  /*
  socket.on("message", (mensaje, roomName) => {
    var messagelength = mensaje.toString().length;
    //var roomlength = roomName.toString().length;
    //console.log("TAMAÑO 2 DE MENSAJE", messagelength);
  });
  */
  //

  socket.on("message", (mensaje, roomName) => {
    //const tamañoMensaje = mensaje;
    console.log("mensaje de chat TOTAL", mensaje, roomName);
    console.log("TAMAÑO DEL MENSAJE", mensaje.length);
    console.log("TAMAÑO DEL ROOM", roomName.toString().length);

    if (roomName.toString().length) {
      io.to(roomName).emit("message", mensaje);
    } else {
      if (mensaje === undefined) {
        console.log("mensaje de chat", roomName);
        io.emit("message", roomName);
      } else if (roomName === undefined) {
        console.log("mensaje de chat", mensaje);
        io.emit("message", mensaje);
      } else {
        console.log("mensaje de chat", mensaje, roomName);
        io.emit("message", mensaje, roomName);
      }
    }
  });
  //
  socket.on("joinRoom", (roomName) => {
    console.log("UNIENDOSE A LA ROOM", roomName);
    //io.emit("joinRoom", roomName);
    socket.join(roomName);
  });
  //

  socket.on("joinRoom", function (roomName) {
    var roomlength = roomName.toString().length;
    //console.log("TAMAÑO 2 DE MENSAJE", roomlength);
  });
});

/**
 * esto lo que hace es facil, si un usuario/socket se conecta, se muestra un mensaje
 */
console.log("hola mundo!");
