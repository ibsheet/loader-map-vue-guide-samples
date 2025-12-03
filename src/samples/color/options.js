const createMapOptions = {
  "el": 'mapDiv',
  "options": {
    "subtitle": {
      "text": "서울특별시 지역별 인구 분포",
      "style": {
        "fontSize": 14,
        "fontWeight": 500
      }
    },
    "legend": {
      "enable": true,
      "range": [
        "#BAD0F7",
        "#1B5CD0"
      ],
      "width": 20,
      "cellCount": 10,
      "title": "구 별 인구수",
      "orient": "vertical",
      "align": "right",
      "verticalAlign": "middle"
    },
    "map": {
      "scale": 0.95,
      "dataLabel": {
        "enable": true,
        "formatter": function(d, str) {
          if(typeof d.properties.etcData != "undefined"){
            return str + " " + (d.properties.etcData).toLocaleString()+"명" ;
          }else{
            return str;
          }
        }
      },
      "style": {
        "border": {
          "width": 0.4,
          "color": "#FFF"
        },
        "backgroundColor": "#EDEDED"
      },
      "select": {
        "enable": false
      },
      "hover": {
        "style": {
          "backgroundColor": "#d2dced"
        }
      },
      "tooltip": {
        "style": {
          "border": {
            "color": "#AAA"
          }
        }
      },
      "colorAxis": {
        "enable": true,
        "color": [
          "#BAD0F7",
          "#1B5CD0"
        ]
      }
    },
    "style": {
      "backgroundColor": "#FFF"
    }
  },
}

const loadMap = (mapInstance) => {
  //2024년 2/4 분기 기준
  const etcData = {
    "종로구":	139378,
    "중구":	121322,
    "용산구":	212175,
    "성동구":	277090,
    "광진구":	335335,
    "동대문구":	340983,
    "중랑구":	382284,
    "성북구":	424916,
    "강북구":	287490,
    "도봉구":	360722,
    "노원구":	497237,
    "은평구":	466474,
    "서대문구":	305857,
    "마포구":	363679,
    "양천구":	435548,
    "강서구":	562550,
    "구로구":	392311,
    "금천구":	227457,
    "영등포구":	374985,
    "동작구":	378360,
    "관악구":	481872,
    "서초구":	407768,
    "강남구":	569154,
    "송파구":	653989,
    "강동구":	459389
  }

  mapInstance.map.load({
    "url": "/assets/lib/ibmap/map/new-kr/11000/KR11000.json",
    "loadfinish": function ( e ) {
      var data = {},
      unit = {};

      e.mapData.features.forEach(function(i) {
        unit = i.properties;
        data[ unit.id ] = {
          value: etcData[unit.name]
        };
        unit.etcData = etcData[unit.name];
      });
      mapInstance.map.setData( data );
    }
  })
}

export { createMapOptions, loadMap };