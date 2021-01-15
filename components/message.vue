<template>
  <div :class="messageClass">
    <div class="message-info">
      <span class="name">{{name}}</span>
      <span class="date">{{localizeDate(time)}}</span>
    </div>
    <div class="message-text">{{text}}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Message",
  props: {
    time: "",
    name: "",
    text: "",
    userId: ""
  },
  computed: {
    ...mapState(["user"]),

    messageClass() {
      if (this.user.id === this.userId) return "message-self message";
      return "message";
    }
  },
  methods: {
    localizeDate(date) {
      return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    }
  }
};
</script>
<style scoped>
* {
  display: flex;
}
.message {
  flex-direction: column;
  width: 70%;
  height: auto;
  margin-bottom: 20px;
}

.message-self {
  align-self: flex-end;
}

.message-self .message-info {
  background: #f0cbb3;
}

.message-info {
  justify-content: space-between;
  height: 35px;
  width: 100%;
  background: #becbd9;
  border-radius: 5px 5px 0 0;
  align-items: center;
  padding: 0 15px;
}

.message-info .date {
  opacity: 0.4;
}

.message-text {
  justify-content: flex-start;
  text-align: left;
  min-height: 40px;
  width: 100%;
  background: white;
  border-radius: 0 0 5px 5px;
  padding: 15px;
  position: relative;
}

.message-text::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: -15px;
  background: white;
  width: 20px;
  height: 35px;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
}

.message-self .message-text::before {
  left: auto;
  right: -15px;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

@media screen and (max-width: 750px) {
  .message {
    width: 90%;
    margin-bottom: 15px;
  }

  .message-info {
    padding: 0 10px;
  }
}
</style>