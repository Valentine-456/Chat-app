const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
let users = require("./users");

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  socket.on("userJoined", (data, cb) => {
    // if (!data.name) return cb("Incorrect data");
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

  socket.on("disconnect", reason => {
    users = users.filter(u => u.id !== socket.id);

    socket.broadcast.emit("allUsers", users);
  });
});

module.exports = { app, server };
