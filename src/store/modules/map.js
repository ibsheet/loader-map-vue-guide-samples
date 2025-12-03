import { CREATE_MAP, REMOVE_SAMPLE } from '../mutation-types';
import { createMapOptions as LineCreateOptions, loadMap as LineLoadMap } from '@/samples/line/options';
import { createMapOptions as MeasureDistanceCreateOptions, loadMap as MeasureDistanceLoadMap } from '@/samples/measure-distance/options';
import { createMapOptions as DrilldownCreateOptions, loadMap as DrilldownLoadMap } from '@/samples/drilldown/options';
import { createMapOptions as ColorCreateOptions, loadMap as ColorLoadMap } from '@/samples/color/options';
import { createMapOptions as MultiSelectCreateOptions, loadMap as MultiSelectLoadMap } from '@/samples/multi-select/options';
import { createMapOptions as PointSymbolCreateOptions, loadMap as PointSymbolLoadMap } from '@/samples/point-symbol/options';
import { createMapOptions as MapLabelCreateOptions, loadMap as MapLabelLoadMap } from '@/samples/map-label/options';
import { createMapOptions as SvgMapCreateOptions, loadMap as SvgMapLoadMap } from '@/samples/svg-map/options';
import { createMapOptions as TileMapCreateOptions, loadMap as TileMapLoadMap } from '@/samples/tile-map/options';
import loader from '@ibsheet/loader';

// 맵 타입별 설정 - createOptions가 함수인지 객체인지에 따라 구분
const mapConfigMap = {
  Line: { createOptions: LineCreateOptions, loadMap: LineLoadMap, useRef: false },
  MeasureDistance: { createOptions: MeasureDistanceCreateOptions, loadMap: MeasureDistanceLoadMap, useRef: true },
  Drilldown: { createOptions: DrilldownCreateOptions, loadMap: DrilldownLoadMap, useRef: true },
  Color: { createOptions: ColorCreateOptions, loadMap: ColorLoadMap, useRef: false },
  MultiSelect: { createOptions: MultiSelectCreateOptions, loadMap: MultiSelectLoadMap, useRef: true },
  PointSymbol: { createOptions: PointSymbolCreateOptions, loadMap: PointSymbolLoadMap, useRef: false },
  MapLabel: { createOptions: MapLabelCreateOptions, loadMap: MapLabelLoadMap, useRef: true },
  SvgMap: { createOptions: SvgMapCreateOptions, loadMap: SvgMapLoadMap, useRef: false },
  TileMap: { createOptions: TileMapCreateOptions, loadMap: TileMapLoadMap, useRef: false },
};

export const Map = {
  state: () => ({ map: [], data: {}, options: {}, createOptions: {} }),
  mutations: {
    [CREATE_MAP](state, obj) {
      const pageKey = obj.pageName || obj;
      const config = mapConfigMap[pageKey];

      if (!config) return;

      state.createOptions = config.createOptions;
      state.loadMap = config.loadMap;

      if (config.useRef) {
        // createOptions가 함수인 경우 (mapRef 필요)
        const mapRef = {};
        const createOptions = state.createOptions(mapRef);
        loader.createMap(createOptions).then(mapInstance => {
          Object.assign(mapRef, mapInstance);
          state.map.push(mapInstance);
          state.loadMap(mapInstance);
        });
      } else {
        // createOptions가 객체인 경우
        loader.createMap(state.createOptions).then(mapInstance => {
          state.map.push(mapInstance);
          state.loadMap(mapInstance);
        });
      }
    },
    [REMOVE_SAMPLE](state, mapObj) {
      if (mapObj) {
        mapObj.map(map => {
          loader.removeMap(map);
        });
        state.map = [];
      }
    }
  },
  getters: {
    mapInfo(state) {
      return state.map;
    }
  },
  actions: {}
};
