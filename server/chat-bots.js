const formMessage = (name, text, id, to) => ({
  //id = from
  //to = to
  name,
  text,
  id,
  to,
  time: new Date()
});

exports.echoBot = (text, socket) => {
  socket.emit(
    "newMessage",
    formMessage("Echo bot", text, "ECHO_BOT", socket.id)
  );
};

exports.reverseBot = (text, socket) => {
  //   message.id = "REVERSE_BOT";
  //   message.name = "Reverse bot";
  //   let text = message.text
  //     .split("")
  //     .reverse()
  //     .join("");

  const message = formMessage(
    "Reverse bot",
    text
      .split("")
      .reverse()
      .join(""),
    "REVERSE_BOT",
    socket.id
  );
  console.log(message);

  setTimeout(() => socket.emit("newMessage", message), 3000);
};

// exports.reverseBot = (text, socket) => {
//   message.id = "SPAM_BOT";
//   message.text = message.text;

//   setTimeout(() => socket.emit("newMessage", message), 3000);
// };
