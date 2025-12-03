# loader-map-vue-guide-samples 👋

### 사용기술

👉 `@ibsheet/loader: 1.3.3` <br/>
👉 `javascript, vue3, vue-router4, vuex, quasar`

### 구조

1. `main.js` 는 `index.html` 에 `App.vue` 를 렌더링 시키는 역할.
2. `App.vue` 는 메인 페이지입니다.
3. `Layout.vue` 에는 페이지의 레이아웃 컴포넌트가 있습니다.
4. `Router` 를 통해 라우팅을 구현합니다.
5. `Home.vue` 는 메인 페이지에서 보여지는 컴포넌트를 가지고 있습니다.
6. `Map.vue` 에서 `Vuex` 를 사용하여 맵 객체를 전역 상태로 관리합니다.
7. `map.js (src/store/modules/map.js)` 에서 맵 생성/제거를 담당합니다.
8. `common.js (src/store/modules/common.js)` 에서 페이지 상태를 관리합니다.
9. `samples` 폴더에 각 샘플에서 사용하는 `createMapOptions`와 `loadMap` 함수를 제공합니다.

### 메인 화면 흐름

순서: `main.js => App.vue => Layout.vue => Home.vue => Map.vue`

### quasar

1. `vue 3` 환경에서 `quasar framework` 환경을 구축함. (`vue add quasar`)
2. `Node 18 이상, npm 9 이상`

### ✨설치방법

1. `clone` 을 받는다.
2. 해당프로젝트는 yarn 을 기준으로 만들어졌습니다. yarn 을 설치해줍니다. `npm install --global yarn`
3. `yarn`
4. `yarn build` // build 파일 생성됨.
5. `yarn serve`
