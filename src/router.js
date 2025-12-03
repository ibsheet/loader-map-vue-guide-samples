// vue3 에서 사용하는 router 방식입니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Map from '@/views/Map.vue';

const url = process.env.NODE_ENV === 'production' ? '/v8/demo/vue/' : '/';

// page 로 사용할 파일을 불러와서 경로 지정, name 은 router 에서 사용하는 고유 명사
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    // vuex를 사용하여 하나의 component로 관리
    {path: url, name: 'Home', component: Home},
    {path: url + 'line', name: 'Line', component: Map},
    {path: url + 'measure-distance', name: 'MeasureDistance', component: Map},
    {path: url + 'drilldown', name: 'Drilldown', component: Map},
    {path: url + 'color', name: 'Color', component: Map},
    {path: url + 'multi-select', name: 'MultiSelect', component: Map},
    {path: url + 'point-symbol', name: 'PointSymbol', component: Map},
    {path: url + 'map-label', name: 'MapLabel', component: Map},
    {path: url + 'svg-map', name: 'SvgMap', component: Map},
    {path: url + 'tile-map', name: 'TileMap', component: Map},
  ]
});

export default Router;