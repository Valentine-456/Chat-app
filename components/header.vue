<template>
  <header>
    <h1>Chat Bots 2.0</h1>
    <div @click="TOGGLE_MENU" class="contacts-menu"></div>
  </header>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapMutations("frontend", ["TOGGLE_MENU"])
  }
};
</script>
<style scoped>
header {
  width: 100vw;
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
}

.contacts-menu {
  display: none;
  height: 50px;
}

h1 {
  height: 32px;
  margin-left: 80px;
  font-weight: 400;
}

@media screen and (max-width: 750px) {
  .contacts-menu {
    display: block;
    width: 50px;
    margin-right: 20px;
    margin-left: auto;
    background-image: url("https://cdn1.iconfinder.com/data/icons/users-39/24/299-512.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

  h1 {
    height: 24px;
    margin-left: 20px;
    font-weight: 400;
  }
}
</style>