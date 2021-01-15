const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
let users = require("./users");
const { echoBot, reverseBot, spamBot } = require("./chat-bots");

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
      name: `User-${Math.floor(Math.random() * 1000000)}`,
      id: socket.id,
      photo:
        "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure dolorum hic eaque. Quasi sint deleniti ea rem reiciendis laboriosam sunt neque quidem quisquam esse, nemo, maiores optio doloremque, ut soluta.",
      online: true
    };
    users.push(user);
    cb(user);
    socket.emit("allUsers", users);

    socket.broadcast.emit("allUsers", users);
  });

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
        case "SPAM_BOT":
          spamBot(text, socket);
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
