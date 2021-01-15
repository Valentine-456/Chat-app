export const state = () => ({
  isMenuOpened: false
});

export const mutations = {
  TOGGLE_MENU(state) {
    state.isMenuOpened = !state.isMenuOpened;
  }
};
