<template>
  <main>
    <Chat />
    <Contacts />
  </main>
</template>

<script>
import Chat from "@/components/chat.vue";
import Contacts from "@/components/contacts.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    Chat,
    Contacts
  },
  sockets: {
    connect() {
      console.log("Client IO connected");
      this.join();
    }
  },
  methods: {
    ...mapMutations(["SET_USER", "SET_COMPANION"]),
    join() {
      this.$socket.emit("userJoined", null, data => {
        if (typeof data === "String") console.error(data);
        else this.SET_USER(data);
        this.SET_COMPANION(data);
      });
    }
  }
};
</script>

<style>
main {
  width: 100%;
  height: 100vh;
  height: 590px;
  margin: auto;
  display: flex;
}
</style>
