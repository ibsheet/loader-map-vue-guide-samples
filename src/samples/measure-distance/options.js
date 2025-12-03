/**
 * mapInstance를 받아서 createMapOptions를 생성하는 함수
 * @param mapInstance 생성된 map 인스턴스
 * @returns createMapOptions 객체
 */
const getCreateMapOptions = (mapInstance) => {
  return {
    "el": "mapDiv",
    "options": {
      "map": {
        "zoom": true,
        "scale": 1.5,
        "style": {
          "backgroundColor": "#FFF",
          "border": {
            "width": 0.4,
            "color": "#437FEA"
          }
        },
        "select": {
          "enable": false
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
        "onclick": function ( e ) {
          var clickPoint = mapInstance.map.setProjection().invert((window).d3.pointer(e.event));
          if(!mapInstance.firstPoint) {
            //기존 라인을 제거하자
            mapInstance.line.clear();
            mapInstance.point.clear();
            mapInstance.firstPoint = { "lon": clickPoint[0], "lat": clickPoint[1]};
            //시작점 symbol
            mapInstance.point.add({
              "lon": clickPoint[0],
              "lat": clickPoint[1],
              "id": "startSymbol",
              "name": "거리측정 시작점", //툴팁에 표시됨
              "symbol": {
                "label" : "시작점", // 심볼 주변에 표시될 레이블
                "type": "circle",
                "style":{
                  "color":"#437FEA",
                }
              },
            });
          }else{
            var line = [{
              "id":"tempLine",
              "from": mapInstance.firstPoint,
              "to":{"lon": clickPoint[0], "lat": clickPoint[1]},
              "style": {
                "border": {
                  "width": 2, //연결선 굵기
                  "color": "#7AB2D3", //연결선 색상
                  "lineStyle": "dotted", //선 유형 "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
                  "animation": "stream 20s linear infinite" //애니메이션
                }
              },
              label:{
                showDistance: 1,
              }
            }];
            if (line[0].from.lon > line[0].to.lon ) {
              line[0].label.rotate = 180;
            }
            mapInstance.line.add(line);

            mapInstance.point.add({
              "lon" : clickPoint[0],
              "lat" : clickPoint[1],
              "id": "endSymbol",
              "name": "거리측정 끝점", //툴팁에 표시됨
              "symbol": {
                "label": "종료점", // 심볼 주변에 표시될 레이블
                "type": "circle",
                "style": {
                  "color": "#437FEA",
                }
              },
            });
            mapInstance.firstPoint = null;
          }
        }
      },
      "style": {
        "backgroundColor": "#EDEDED"
      },
      "point": {
        "tooltip": {
          "style": {
            "border": {
              "color": "#437FEA"
            }
          }
        }
      }
    }
  };
}

const loadMap = (mapInstance) => {
  mapInstance.map.load({
    "url": "/assets/lib/ibmap/map/new-kr/korea.json",
    "loadfinish": function (e) {
      let colors = {};
      for(let i = 0 ; i < e.mapData.features.length ; i++ ) {
        if(e.mapData.features[i].id == "KR30000"){
          colors[e.mapData.features[i].id] = {style:{backgroundColor: "#437FEA"}};
        }else if(e.mapData.features[i].id == "KR26000"){
          colors[e.mapData.features[i].id] = {style:{backgroundColor: "#437FEA"}};
        }
      }
      mapInstance.map.setData( colors );

      const lineData = [
        {
          "id": "kh99985",
          "from": {
            "name": "대전 중구",
            "lon": 127.37481651832546, 
            "lat": 36.339568545436094
          },
          "to": {
            "name": "부산 해운대",
            "lon": 129.14995772145545, 
            "lat": 35.16642343299291
          },
          "style": {
            "border": {
              "width": 3,
              "color": "#9A7E6F",
              "style": "dotted", // "solid", "dashed", "dotted", "10 50"(선길이 공백길이)
              "animation": "stream 20s linear infinite"
            },
          },
          "label":{
            "text": "대전 중구 -> 부산 해운대",
            "textPosition": 1, //거리정보 보다 앞에 text 표시
            "showDistance": 1
          }
        }
      ];
      mapInstance.line.add(lineData);
      const symbolData = [
        {
          "id": "ko001",
          "name": "대전중구",
          "lon": 127.37481651832546, 
          "lat": 36.339568545436094,
          "symbol": {
            "type":'circle',
            "label":"대전 중구",
            "style":{
              "color":"#fff",
              "size":50
            }
          }
        },
        {
          "id": "ko002",
          "name": "부산 해운대",
          "lon": 129.14995772145545, 
          "lat": 35.16642343299291,
          "symbol": {
            "type":'circle',
            "label":"부산 해운대",
            "style":{
              "color":"#fff",
              "size":50
            }
          }
        }
      ];
      mapInstance.point.clear();
      mapInstance.point.add( symbolData );
    }
  });
}

export { getCreateMapOptions as createMapOptions, loadMap };
