const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
let users = require("./users");
const { echoBot, reverseBot } = require("./chat-bots");

const formMessage = (name, text, id, to) => ({
  //id = from
  //to = to
  name,
  text,
  id,
  to,
  time: new Date()
});

io.on("connection", socket => {
  socket.on("userJoined", (data, cb) => {
    const user = {
      name: `User`,
      id: socket.id,
      photo:
        "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
      description: "",
      online: true
    };
    users.push(user);
    cb(user);
    socket.emit("allUsers", users);

    socket.broadcast.emit("allUsers", users);
  });

  // socket.on("chooseChat", (data, cb) => {
  //   // const { name, to, text } = data;
  //   // let companionSocket;
  //   // if (
  //   //   to !== "REVERSE_BOT" &&
  //   //   to !== "ECHO_BOT" &&
  //   //   to !== "SPAM_BOT" &&
  //   //   to !== "IGNORE_BOT" &&
  //   //   to !== "OFFLINE"
  //   // ) {
  //   //   companionSocket = io.of("/").sockets[to];
  //   // }
  //   // socket.join(data.roomId);
  //   // let companionId = data.companionId;
  //   // if (
  //   //   companionId == "REVERSE_BOT" ||
  //   //   companionId == "ECHO_BOT" ||
  //   //   companionId == "SPAM_BOT" ||
  //   //   companionId == "IGNORE_BOT" ||
  //   //   companionId == "OFFLINE"
  //   // ) {
  //   // } else {
  //   //   io.of("/").sockets[companionId].join(data.roomId);
  //   //   // console.log(io.of("/").sockets[companionId].rooms);
  //   // }
  //   // // socket.to(data.roomId).emit("newMessage", "You have joined the chat!!!");
  //   // // socket.to(data.roomId).emit("newMessage", "jfdhsgf");
  // });

  socket.on("sendMessage", (data, cb) => {
    const { name, to, text } = data;
    const message = formMessage(name, text, socket.id, to);

    socket.emit("newMessage", message);
    let companionSocket;

    if (
      to !== "REVERSE_BOT" &&
      to !== "ECHO_BOT" &&
      to !== "SPAM_BOT" &&
      to !== "IGNORE_BOT" &&
      to !== "OFFLINE"
    ) {
      companionSocket = io.of("/").sockets[to];
      companionSocket.emit("newMessage", message);
    } else {
      switch (to) {
        case "ECHO_BOT":
          echoBot(text, socket);
          break;
        case "REVERSE_BOT":
          reverseBot(text, socket);
          break;
        case "IGNORE_BOT":
          break;
        case "OFFLINE":
          break;
      }
    }
  });

  socket.on("disconnect", reason => {
    users = users.filter(u => u.id !== socket.id);
    socket.broadcast.emit("allUsers", users);
  });
});

module.exports = { app, server };
