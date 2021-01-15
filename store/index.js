export const state = () => ({
  user: {},
  companion: {},
  users: [],
  messages: []
});

export const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
  PRESET_COMPANION(state, data) {
    state.companion = data;
  },
  SET_COMPANION(state, data) {
    const companion = state.users.find(u => u.id === data);
    state.companion = companion;
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_allUsers(state, data) {
    const users = data.filter(u => u.id !== state.user.id);
    state.users = users;
  }
};
