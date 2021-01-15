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
  const message = formMessage(
    "Reverse bot",
    text
      .split("")
      .reverse()
      .join(""),
    "REVERSE_BOT",
    socket.id
  );

  setTimeout(() => socket.emit("newMessage", message), 3000);
};

exports.spamBot = (text, socket) => {
  // message.id = "SPAM_BOT";
  // message.text = message.text;
  let spamText = "SPAM!!!";

  const message = formMessage("Spam bot", spamText, "SPAM_BOT", socket.id);

  setTimeout(() => {
    socket.emit("newMessage", message);
    setTimeout(() => {
      socket.emit("newMessage", message);
      setTimeout(() => {
        socket.emit("newMessage", message);
        setTimeout(() => {
          socket.emit("newMessage", message);
        }, Math.floor(Math.random() * 120000));
      }, Math.floor(Math.random() * 120000));
    }, Math.floor(Math.random() * 120000));
  }, Math.floor(Math.random() * 120000));
  // setTimeout(
  //   () => socket.emit("newMessage", message),
  //   Math.floor(Math.random() * 120000)
  // );
  // setTimeout(
  //   () => socket.emit("newMessage", message),
  //   Math.floor(Math.random() * 120000)
  // );
  // setTimeout(
  //   () => socket.emit("newMessage", message),
  //   Math.floor(Math.random() * 120000)
  // );
  // setTimeout(
  //   () => socket.emit("newMessage", message),
  //   Math.floor(Math.random() * 120000)
  // );
};
