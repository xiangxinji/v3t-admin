import { Module } from 'vuex';

export type StateType = {
  tags : Array<Tagger>
}
const state : StateType = {
  tags: [],
};
const options : Module< StateType, RootState> = {
  state,
  mutations: {
    ADD_TAG(s : StateType, tagger : Tagger) {
      s.tags.push(tagger);
    },
    CLEAR_TAGS(s:StateType) {
      s.tags = [];
    },
    REMOVE_TAG(s, tagPath : string) {
      s.tags = s.tags.filter((tag) => tag.path !== tagPath);
    },
  },
  namespaced: true,
};

export default options;
