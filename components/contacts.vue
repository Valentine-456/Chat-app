<template>
  <div class="contacts">
    <div class="contacts-tabs">
      <div @click="toggleUsers('online')" class="tab">Online</div>
      <div @click="toggleUsers('all')" class="tab active">All</div>
    </div>
    <div class="contacts-people">
      <div
        v-for="(user) in shownUsers"
        :key="user.id"
        @click="chooseRoom(user.id)"
        class="contacts-user"
      >
        <div class="avatar" :style="`background-image: url(${user.photo})`">
          <div :class="[{online: user.online}, 'online-indicator']"></div>
        </div>
        <div class="content">
          <span class="user-name">{{user.name}}</span>
          <span class="user-description">{{user.description}}</span>
        </div>
      </div>
    </div>
    <div class="contacts-search">
      <input class="search" type="text" placeholder="Search..." v-model="nameInput" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Contacts",
  data: () => ({
    showOnline: false,
    nameInput: "",
    chosenUsers: []
  }),
  computed: {
    ...mapState(["user", "users"]),
    ...mapState("frontend", ["isMenuOpened"]),
    shownUsers: {
      get() {
        if (this.showOnline) return this.users.filter(u => u.online);
        return this.users;
      },
      set(val) {
        // this.chosenUsers = val;
        // return val;
      }
    }
  },
  watch: {
    nameInput: function(val) {
      if (!val) {
        this.shownUsers = this.users.filter(u => u);
      } else {
        this.shownUsers = this.users.filter(u => u.name.includes(val));
      }
    },
    isMenuOpened: function(bool) {
      if (bool) {
        document.querySelector(".contacts").classList.add("contacts-opened");
      }
      if (!bool) {
        document.querySelector(".contacts").classList.remove("contacts-opened");
      }
    }
  },

  methods: {
    ...mapMutations(["SET_COMPANION"]),
    ...mapMutations("frontend", ["TOGGLE_MENU"]),
    toggleUsers(type) {
      if (type == "online") {
        this.showOnline = true;
        document
          .querySelectorAll(".contacts-tabs .tab")[0]
          .classList.add("active");
        document
          .querySelectorAll(".contacts-tabs .tab")[1]
          .classList.remove("active");
      }
      if (type == "all") {
        this.showOnline = false;
        document
          .querySelectorAll(".contacts-tabs .tab")[1]
          .classList.add("active");
        document
          .querySelectorAll(".contacts-tabs .tab")[0]
          .classList.remove("active");
      }
    },
    chooseRoom(id) {
      this.SET_COMPANION(id);
      this.TOGGLE_MENU();
    }
  }
};
</script>
<style scoped>
* {
  display: flex;
}

.contacts {
  width: 33%;
  height: 100%;
  background: #fff;
  border-radius: 0px 3px 3px 0px;
  display: flex;
  flex-direction: column;
}

.contacts-tabs {
  width: 100%;
  height: 40px;
  flex-direction: row;
}

.contacts-tabs .tab {
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
}

.contacts-tabs .tab:first-of-type {
  box-shadow: -1px -1px 0px 0px black inset;
}

.contacts-tabs .tab:last-of-type {
  box-shadow: 1px -1px 0px 0px black inset;
}

.contacts-tabs .tab.active {
  background: transparent;
  box-shadow: none;
}

.contacts-people {
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 2;
}

.contacts-user {
  width: 100%;
  height: 70px;
  align-items: center;
  margin: 5px 0;
  overflow: hidden;
}

.contacts-user.chosen {
  background: #f8f8f8;
}

.avatar {
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  display: block;
  margin: 0 15px;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #20d63e;
  display: block;
  opacity: 0;
}

.online-indicator.online {
  opacity: 1;
}

.content {
  width: 100%;
  max-width: 136px;
  height: 50px;
  flex-direction: column;
  align-items: flex-start;
}

.user-description {
  font-size: 0.9rem;
  opacity: 0.8;
  text-align: left;
}

.search {
  width: calc(100% - 30px);
  height: 30px;
  margin: 30px 15px;
  border: 1px solid grey;
  border-radius: 3px;
}

.search:focus {
  outline: none;
}

@media screen and (max-width: 750px) {
  .contacts {
    transform: translateX(100%);
    position: absolute;
    transition: all 0.2s ease;
    z-index: 1000;
    right: 0;
    top: 0;
    width: 100%;
  }

  .contacts.contacts-opened {
    transform: none;
  }
}
</style>