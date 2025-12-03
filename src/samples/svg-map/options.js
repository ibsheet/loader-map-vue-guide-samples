const createMapOptions = {
 "el": "mapDiv",
 "options": {
    "line": {
      "label": {
        "showDistance": 1
      }
    }
  }
}

const loadMap = (mapInstance, mapIdx = 0, typeIdx = 0) => {
  const idx = mapIdx;
  const path = typeIdx + 1;
  const url = [
    '/assets/lib/ibmap/map/design/type'+ path +'/seoul.svg',
    '/assets/lib/ibmap/map/design/type'+ path +'/korea.svg',
    '/assets/lib/ibmap/map/design/type'+ path +'/world.svg'
  ];

  const data = [
    '/assets/lib/ibmap/map/design/type'+ path +'/seoul.json',
    '/assets/lib/ibmap/map/design/type'+ path +'/korea.json',
    '/assets/lib/ibmap/map/design/type'+ path +'/world.json'
  ];

  if (idx === 2) {
      mapInstance.cfg.map.scale = 0.8;
  } else {
      mapInstance.cfg.map.scale = 1.2;
  }

  const hoverColors = ["#13ACE2", "#FFF", "#a1a1a17d"];
  const selectColors = ["#13ACE2", "#FFF", "#fff900"];

  // hover, select 색상 설정
  mapInstance.cfg.map.hover.style.backgroundColor = hoverColors[path - 1];
  mapInstance.cfg.map.select.style.backgroundColor = selectColors[path - 1];

  mapInstance.map.clear();
  mapInstance.map.clearData();
  mapInstance.tooltip._clearFixed();

  mapInstance.map.loadSvg(url[idx], data[idx]);
}

export { createMapOptions, loadMap };