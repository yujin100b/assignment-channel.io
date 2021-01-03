# 과제 - 채널코퍼레이션

## 리액트 페이지 개발
나라 정보(코드, 수도, 이름, 대륙, 국가 전화번호)를 GET 으로 가져와 정보를 리스팅 해주는 페이지.

Data URL :
https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes

## 실행 
명령어 실행 후 http://localhost:8080/
`npm start`

## 빌드
명령어 실행 후 dist 파일에 빌드파일 생성
`npm build`

## 요구 사항

- react, webpack을 베이스로 사용하여 개발
    - `npm install react` , `npm install webpack`  등을 사용하여 package.json 구성
- 보일러 플레이트(create-react-app 등)를 사용하지 않아야 함.
    - webpack.config.js 작성
- 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 되어야 함.
    - useDispatch를 이용하여 선택한 key
- 검색 창이 있어 통합 검색이 되어야 함. (Case insensitive, 부분일치)
    - 대소문자 구별하지 않고, 부분일치하는 모든 row를 반환
    - useDispatch를 이용. search 함수를 따로 구현하여 매칭되는 row를 필터링 하여 State에 저장
- 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제되어야 함.
    - redux의 reducer를 구현하여 onClick 이벤트에 DEL_ROW 액션을 디스패치
- 나라 정보를 입력해서 Row를 추가할 수 있어야 함.
    - EditPostForm.js를 구현하여 나라정보 object를 ADD_ROW로 디스패치
- 모든 상태(나라 목록, 정렬 상태, 검색어 등)는 데이터 관리 라이브러리(Redux, MobX 등)에 저장되어야 함.
    - redux의 Action을 이용하여 State에 상태 저장
- Network 통신은 redux middleware를 통해 되어야 함.
    - react-saga, axios를 사용하여 비동기함수 처리

## 추가 요구 사항

- 검색 기능 (Rate limiting(debounce, throttle) 적용하여 타이핑 시 바로 검색)
    - lodash의 debounce 사용  input의 onChange