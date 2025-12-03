import { createStore } from 'vuex';
import { Map } from './modules/map';
import { Page } from './modules/common';

export default createStore({
  modules: { Map, Page }
});
