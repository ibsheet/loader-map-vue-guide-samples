// 다중 선택 맵 샘플 - 여러 지역 선택 기능
const getCreateMapOptions = (mapInstance) => {
  return {
    "el": "mapDiv",
    "options": {
      "map": {
        "style": {
          "backgroundColor": "#FFF",
          "border": {
            "width": 0.4,
            "color": "#437FEA"
          }
        },
        "dataLabel": {
          "enable": true
        },
        "select": {
          "enable": 1,
          "multiSelect": 1,
          "style": {
            "backgroundColor": "#437FEA",
            "border": {
              "color": "#FFF"
            }
          }
        },
        "hover": {
          "style": {
            "backgroundColor": "#75A5FA"
          }
        },
        "tooltip": {
          "style": {
            "border": {
              "color": "#AAA"
            }
          }
        },
        "onselect": function () {
          var selected = mapInstance.map.getSelected();
          if(selected.length && Object.keys(selected[0]).length) {
            if (mapInstance && mapInstance.map && mapInstance.map.main) {
              mapInstance.map.main.setSubtitle(selected.map((r) => r.properties.name).join(", ")+" 선택 중");
            }
          }else{
            if (mapInstance && mapInstance.map && mapInstance.map.main) {
              mapInstance.map.main.setSubtitle("");
            }
          }
        }
      },
      "style": {
        "backgroundColor": "#EDEDED"
      }
    }
  };
}

const loadMap = (mapInstance) => {
  mapInstance.map.load( {
    "url": "/assets/lib/ibmap/map/new-kr/51000/KR51000.json",
    "loadfinish": function () {}
  })
}

export { getCreateMapOptions as createMapOptions, loadMap };
