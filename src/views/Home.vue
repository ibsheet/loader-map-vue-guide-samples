<template>
  <div class='q-pa-md row items-start q-gutter-md'>

    <q-card class='my-card' v-for='(info, idx) in sampleInfo' :key='idx'>
      <q-btn :to='info.to' ><img :dense='$q.screen.xs' :src = info.img style='height: 180px; width: 270px'></q-btn>
      <q-card-actions align='left'>
        <q-btn flat :to="{name: info.title}" class='text-weight-bold'> {{info.label}} </q-btn>
      </q-card-actions>
    </q-card>

  </div>
</template>
<script>
const url = process.env.NODE_ENV === 'production' ? '/v8/demo/vue/' : '/';
import line from '/assets/img/line.png';
import measureDistance from '/assets/img/measureDistance.png';
import drilldown from '/assets/img/drilldown.png';
import color from '/assets/img/color.png';
import multiSelect from '/assets/img/multiSelect.png';
import pointSymbol from '/assets/img/pointSymbol.png';
import mapLabel from '/assets/img/mapLabel.png';
import svgMap from '/assets/img/svgMap.png';
import tileMap from '/assets/img/tileMap.png';

export default {
  data() {
    return {
      // Map 샘플 정보
      sampleInfo: [
        {to: url + 'line', title:'Line', label:'라인 맵', img: line, level:'', class:'secondary'},
        {to: url + 'measure-distance', title:'MeasureDistance', label:'거리 측정', img: measureDistance, level:'', class:'secondary'},
        {to: url + 'drilldown', title:'Drilldown', label:'드릴다운 맵', img: drilldown, level:'', class:'secondary'},
        {to: url + 'color', title:'Color', label:'컬러 맵', img: color, level:'', class:'secondary'},
        {to: url + 'multi-select', title:'MultiSelect', label:'다중 선택 맵', img: multiSelect, level:'', class:'secondary'},
        {to: url + 'point-symbol', title:'PointSymbol', label:'포인트 심볼', img: pointSymbol, level:'', class:'secondary'},
        {to: url + 'map-label', title:'MapLabel', label:'맵 레이블', img: mapLabel, level:'', class:'secondary'},
        {to: url + 'svg-map', title:'SvgMap', label:'SVG 맵', img: svgMap, level:'', class:'secondary'},
        {to: url + 'tile-map', title:'TileMap', label:'타일 맵', img: tileMap, level:'', class:'secondary'},
      ]
    }
  }
}
</script>