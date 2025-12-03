<template>
  <div>
    <div class="text-h6 text-weight-bold">{{sampleDesc[pageName]["title"]}}</div>
    <div class="text-subtitle2" v-html="sampleDesc[pageName]?.desc"></div>
    <div v-if="pageName === 'SvgMap'" class="svg-map-options">
      <div class="option-group map_country">
        <span class="option-label">지도 선택</span>
        <div class="radio-group">
          <label class="radio-item">
            <input type='radio' id='map1' name='map' value='0' v-model="selectedMap">
            <span class="radio-text">서울지도</span>
          </label>
          <label class="radio-item">
            <input type='radio' id='map2' name='map' value='1' v-model="selectedMap">
            <span class="radio-text">대한민국지도</span>
          </label>
          <label class="radio-item">
            <input type='radio' id='map3' name='map' value='2' v-model="selectedMap">
            <span class="radio-text">세계지도</span>
          </label>
        </div>
      </div>
      <div class="option-group map_type">
        <span class="option-label">타입 선택</span>
        <div class="radio-group">
          <label class="radio-item">
            <input type='radio' id='type1' name='type' value='0' v-model="selectedType">
            <span class="radio-text">Type 1</span>
          </label>
          <label class="radio-item">
            <input type='radio' id='type2' name='type' value='1' v-model="selectedType">
            <span class="radio-text">Type 2</span>
          </label>
          <label class="radio-item">
            <input type='radio' id='type3' name='type' value='2' v-model="selectedType">
            <span class="radio-text">Type 3</span>
          </label>
        </div>
      </div>
    </div>
    <div class="row no-wrap">
      <div id='mapDiv' style="width: 100%; height: 500px;"></div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { loadMap as SvgMapLoadMap } from '@/samples/svg-map/options';

const sampleDesc = {
  Line: {
    title: '라인 맵 (항공 노선도)',
    desc: `항공 노선을 라인으로 시각화한 예제입니다.<br>
      <b>lineStyle</b> 속성을 <b>'stream'</b>으로 설정하면 애니메이션 효과가 적용됩니다.<br>
      라인의 <b>label</b> 속성으로 노선 정보를 표시할 수 있습니다.`
  },
  MeasureDistance: {
    title: '거리 측정 맵',
    desc: `두 지점 간의 거리를 측정하는 예제입니다.<br>
      <b>measureDistance</b> 옵션을 활성화하면 거리 측정 기능을 사용할 수 있습니다.<br>
      라인의 <b>showDistance</b> 속성으로 거리 값을 라벨로 표시합니다.`
  },
  Drilldown: {
    title: '드릴다운 맵',
    desc: `지역을 클릭하여 하위 지도로 이동하는 예제입니다.<br>
      <b>drilldown</b> 속성을 설정하여 클릭 시 해당 지역의 상세 지도를 표시합니다.<br>
      전국 → 시/도 → 시/군/구 순으로 드릴다운이 가능합니다.`
  },
  Color: {
    title: '컬러 맵',
    desc: `지역별 인구 밀도를 색상으로 시각화한 예제입니다.<br>
      <b>colorScale</b>을 사용하여 값에 따른 색상 범위를 설정할 수 있습니다.<br>
      데이터 값이 클수록 진한 색상으로 표시됩니다.`
  },
  MultiSelect: {
    title: '다중 선택 맵',
    desc: `여러 지역을 동시에 선택할 수 있는 예제입니다.<br>
      <b>multiSelect</b> 옵션을 <b>true</b>로 설정하면 다중 선택이 활성화됩니다.<br>
      선택된 지역은 다른 색상으로 하이라이트됩니다.`
  },
  PointSymbol: {
    title: '포인트 심볼 맵',
    desc: `다양한 심볼로 위치를 표시하는 예제입니다.<br>
      <b>symbol</b> 속성으로 circle, diamond, square, triangle, star 등의 심볼을 지정할 수 있습니다.<br>
      <b>symbolSize</b>와 <b>color</b> 속성으로 크기와 색상을 조절합니다.`
  },
  MapLabel: {
    title: '맵 레이블',
    desc: `지역별 레이블을 표시하는 예제입니다.<br>
      <b>label</b> 옵션의 <b>enabled</b>를 <b>true</b>로 설정하면 레이블이 표시됩니다.<br>
      <b>labelStyle</b>로 폰트 크기, 색상 등을 커스터마이징할 수 있습니다.`
  },
  TileMap: {
    title: '타일 맵',
    desc: `OpenStreetMap 기반의 타일 맵 예제입니다.<br>
      <b>loadTile</b> 메서드를 사용하여 타일 레이어를 로드할 수 있습니다.<br>
      <b>setView</b> 메서드로 중심 좌표와 줌 레벨을 설정할 수 있습니다.<br>
      <b>addData</b> 메서드로 포인트와 라인 데이터를 추가할 수 있습니다.`
  },
  SvgMap: {
    title: 'SVG 맵 (디자인 맵)',
    desc: `대한민국 행정구역 SVG 맵 예제입니다.<br>
      <b>load</b> 메서드를 사용하여 지도 JSON 파일을 로드합니다.<br>
      지역별로 다른 색상을 지정하여 데이터를 시각화할 수 있습니다.`
  }
};

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const pageName = computed(() => store.state.Page.name);
    const mapObj = computed(() => store.state.Map.map);
    const createMap = (state) => store.commit('CREATE_MAP', state);

    const selectedMap = ref('0');
    const selectedType = ref('0');

    const reloadSvgMap = () => {
      if (pageName.value === 'SvgMap' && mapObj.value.length > 0) {
        const mapInstance = mapObj.value[mapObj.value.length - 1];
        SvgMapLoadMap(mapInstance, parseInt(selectedMap.value), parseInt(selectedType.value));
      }
    };

    watch(selectedMap, reloadSvgMap);
    watch(selectedType, reloadSvgMap);

    watch(() => route.name, (val, old) => {
      if (val !== old && val !== "Home") {
        selectedMap.value = '0';
        selectedType.value = '0';
        createMap({ pageName: val });
      }
    });

    onMounted(() => {
      createMap({ pageName: pageName.value });
    });

    return {
      pageName,
      mapObj,
      createMap,
      selectedMap,
      selectedType,
      sampleDesc
    };
  }
}
</script>

<style scoped>
#mapDiv {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.svg-map-options {
  display: flex;
  gap: 24px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.option-label {
  font-weight: 600;
  color: #495057;
  font-size: 14px;
  white-space: nowrap;
}

.radio-group {
  display: flex;
  gap: 4px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.radio-item:hover {
  background: #e9ecef;
}

.radio-item:has(input:checked) {
  background: #1976d2;
  border-color: #1565c0;
}

.radio-item:has(input:checked) .radio-text {
  color: #fff;
}

.radio-item input[type="radio"] {
  display: none;
}

.radio-text {
  font-size: 13px;
  color: #495057;
  white-space: nowrap;
  user-select: none;
}
</style>
