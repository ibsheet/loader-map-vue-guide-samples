import { CHANGE_SAMPLE } from '../mutation-types';

// 샘플별 필요한 내용들 공통으로 처리하기 위한 구간.
export const Page = {
  state: () => ({ name: '', tag: '' }),
  mutations: {
    [CHANGE_SAMPLE](state, value) {
      state.name = value;
    }
  },
  getters: {
    pageInfo(state) {
      return state.name;
    }
  },
  actions: {
    changeName({ commit }, value) {
      commit(CHANGE_SAMPLE, value);
    }
  }
};