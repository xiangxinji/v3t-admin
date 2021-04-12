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
  },
  namespaced: true,
};

export default options;
