// 포인트 심볼 맵 샘플 - 다양한 심볼로 위치 표시
const createMapOptions = {
  "el": "mapDiv",
  "options": {
    "subtitle": {
      "enable": true,
      "text": "맵의 특정 지역에 심볼을 표시할 수 있습니다.",
      "style": {
        "fontSize": 14,
        "fontWeight": 500
      }
    },
    "legend": {
      "enable": true,
      "type": "symbol",
      "range": [
        "diamond2",
        "wye",
        "circle"
      ],
      "color": [
        "#f86d58",
        "#0c8cfc",
        "#78f221"
      ],
      "domain": [
        "본사",
        "지부",
        "협력사"
      ],
      "orient": "vertical",
      "align": "right",
      "titleWidth": 120,
      "verticalAlign": "bottom",
      "title": "지부 및 협력사 현황"
    },
    "map": {
      "scale": 1.4,
      "style": {
        "border": {
          "color": "#737A82",
          "width": 0.4
        }
      },
      "select": {
        "style": {
          "backgroundColor": "white"
        }
      },
      "tooltip": {
        "style": {
          "border": {
            "color": "#AAA"
          }
        }
      }
    }
  }
}

const loadMap = (mapInstance) => {
  mapInstance.map.load({
    "url": "/assets/lib/ibmap/map/world/world.json",
    "loadfinish": function ( e ) {
      function getRandomPastelColor() {
        // RGB 값을 높게 설정하여 밝은 색상(파스텔톤)을 만듦
        const r = Math.floor((Math.random() * 50) + 204); // 127 ~ 254
        const g = Math.floor((Math.random() * 50) + 204); // 127 ~ 254
        const b = Math.floor((Math.random() * 50) + 204); // 127 ~ 254

        // RGB 값을 Hex로 변환
        const toHex = (value) => {
          const hex = value.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };

        // Hex 코드로 반환
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      };

      var colors = {};
      for(var i = 0 ; i < e.mapData.features.length ; i++ ) {
        colors[e.mapData.features[i].id] = {"style":{"backgroundColor": getRandomPastelColor()}};
      }
      mapInstance.map.setData( colors );
      var myData = [
        {"id":"kh99984","name":"한국 본사","lat":37.4551331,"lon":126.8814993,
          "symbol": {
            "type":"diamond2",
            "label":"한국 본사",
            "style":{
              "color":"#f86d58","size":200
            }
          }
        },
        {"id":"kh99985","name":"러시아 지부","lat":58.73015391461819,"lon":126.85540082694403,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99987","name":"이집트 지부","lat":25.654646279378124,"lon":26.83586957745956,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99988","name":"미국 댄버 지부","lat":39.73457676861697,"lon":-105.0404870233326,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99989","name":"미국 뉴욕 지부","lat":40.7404364767996,"lon":-74.00423722873317,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99990","name":"중국 지부","lat":30.04782452978597,"lon":98.30296772085617,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99991","name":"a 협력사(인도)","lat":23.024214753241807,"lon":76.84831279103363,
          "symbol": {
            "type":"circle",
            "style":{
              "color":"#78f221","size":100
            }
          }
        },
        {"id":"kh99992","name":"b 협력사(일본)","lat":36.837814180001004,"lon":139.48233795612336,
          "symbol": {
            "type":"circle",
            "style":{
              "color":"#78f221","size":100
            }
          }
        },
        {"id":"kh99993","name":"c 협력사(캐나다)","lat":51.22689004886532,"lon":-87.46919078541,
          "symbol": {
            "type":"circle",
            "style":{
              "color":"#78f221","size":100
            }
          }
        },
        {"id":"kh99994","name":"캐나다 지부","lat":68.40854296482293,"lon":-130.97536890717055,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99995","name":"d 협력사(러시아)","lat":55.65722057578039,"lon":37.591541590714705,
          "symbol": {
            "type":"circle",
            "style":{
              "color":"#78f221","size":100
            }
          }
        },
        {"id":"kh99996","name":"e 협력사(탄자니아)","lat":-6.964290951599599,"lon":32.1996978645869,
          "symbol": {
            "type":"circle",
            "style":{
              "color":"#78f221","size":100
            }
          }
        },
        {"id":"kh99997","name":"f 협력사(브라질)","lat":-5.598491292865675,"lon":-60.857987084415186,
          "symbol": {
            "type":"circle",
            "style":{
              "color":"#78f221","size":100
            }
          }
        },
        {"id":"kh99998","name":"호주 시드니 지부","lat":-33.87689446774919,"lon":151.1573874294114,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        },
        {"id":"kh99999","name":"호주 퍼스 지부","lat":-31.944315215481943,"lon":115.81887738658956,
          "symbol": {
            "type":"wye",
            "style":{
              "color":"#0c8cfc","size":100
            }
          }
        }
      ]
      mapInstance.point.clear();
      mapInstance.point.add( myData );
      mapInstance.point.show( "symbol" );
      mapInstance.map.move(-80,-100)
    }
  });
}
  
export { createMapOptions, loadMap };