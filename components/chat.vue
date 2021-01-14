<template>
  <div class="chat">
    <div v-if="companion" class="chat-preview">
      <div
        class="preview-photo"
        :style="`background-image: url(${companion ? companion.photo: 'photo'})`"
      ></div>
      <div class="preview-text">
        <h2>{{companion ? companion.name: ''}}</h2>
        <span>{{companion ? companion.description: ''}}</span>
      </div>
    </div>
    <div class="chat-preview chat-preview-none" v-else>
      <h1>Start chating...</h1>
    </div>
    <div class="chat-messages">
      <Message
        v-for="(m, i) in shownMessages"
        :key="i"
        :time="m.time"
        :userId="m.id"
        :text="m.text"
        :name="m.name"
      />
      <!-- <Message time="10:45" :userId="id" text="Hallo, mein Freund!!!" name="Ivan Yurchenko" /> -->
    </div>
    <div class="chat-form">
      <input
        type="text"
        placeholder="Start chating!"
        @keydown.enter="submitMessage()"
        class="form-input"
        v-model="messageInput"
      />
      <button class="form-submit" @click="submitMessage()">Send message</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Message from "@/components/message.vue";

export default {
  name: "Chat",
  data: () => ({
    messageInput: ""
  }),
  components: { Message },
  computed: {
    ...mapState(["companion", "user", "messages"]),
    id() {
      return this.user.id;
      console.log(this.user.id);
    },
    shownMessages() {
      return this.messages.filter(
        m => m.id === this.companion.id || m.to === this.companion.id
      );
    }
  },
  methods: {
    submitMessage() {
      if (/\S/.test(this.messageInput)) {
        this.$socket.emit("sendMessage", {
          text: this.messageInput,
          name: this.user.name,
          to: this.companion.id
        });
      }
      this.messageInput = "";
      return;
    }
  }
};
</script>
<style scoped>
* {
  display: flex;
}

.chat {
  width: 77%;
  height: 100%;
  background: #d7dfe7;
  border-radius: 3px 0px 0px 3px;
  flex-direction: column;
}

.chat-preview {
  width: 100%;
  height: 170px;
  background: #becbd9;
}

.chat-preview-none {
  justify-content: center;
  align-items: center;
}

.preview-photo {
  width: 170px;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.preview-text {
  margin: 0 30px;
  flex-direction: column;
  max-width: calc(100% - 230px);
  align-items: flex-start;
  text-align: left;
}

.preview-text h2 {
  margin: 10px 0;
}

.preview-text span {
  font-size: 0.9rem;
}

.chat-messages {
  flex-direction: column;
  margin: 10px;
  width: calc(100% - 20px);
  overflow-y: auto;
  flex-grow: 2;
  padding: 0 20px;
}

.chat-form {
  height: 70px;
  margin: 10px;
  width: calc(100% - 20px);
  align-items: center;
}

.form-input {
  height: 35px;
  box-shadow: 0 0 1px 0 #428bca, 0 0 5px 0 #428bca;
  border: 1px solid #428bca;
  border-radius: 3px;
  flex-grow: 2;
}

.form-input:focus,
.form-submit:focus {
  outline: none;
}

.form-submit {
  height: 35px;
  background: #428bca;
  color: white;
  border: 1px solid #428bca;
  border-radius: 3px;
  box-shadow: 0 0 1px 0 #428bca, 0 0 5px 0 #428bca;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 200px;
}
</style>