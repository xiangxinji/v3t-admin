export default {
  state: {
    asideFold: true,
  },
  mutations: {
    CHANGE_ASIDE_FOLDER(state:any, value : boolean) :void {
      state.asideFold = value;
    },
  },
  actions: {

  },
};
