# calendar-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 프로젝트 구성
프레임워크는 vuejs를 이용해서 만들었으며 프로젝트 구성은 vuecli3.0(https://cli.vuejs.org/guide/) 이용해서 구현되어 있습니다
유닛 테스트를 하기 위해서 jest를 사용하고 있으며 jest는 vuecli3.0 설치시 옵션으로 설치여부를 지정할 수 있습니다.
그 외에 추가적으로 설치한 패키지로는 vuejs-datepicker, vue-cli-plugin-axios 이 있습니다

vue-cli-plugin-axios - API 통신을 하기 위한 모듈
vuejs-datepicker - 캘린더 일정 추가시 사용되는 datepicker

사용되는 포트는 9000번으로 http://localhost:9000 으로 실행할 수 있습니다
단 사전에 서버(https://github.com/mcheolpark/calendar-api)를 먼저 구동시켜야 동작을 확인 할 수 있습니다.

기능명세서에 포함되어 있는 Drag and Drop을 구현하기 위해서 html5에서 제공해주고 있는 Drag and Drop 기능을 적용해서 구현했습니다
 - https://www.w3schools.com/html/html5_draganddrop.asp

시간 관계상 다는 구현을 못했고 Drag를 이용해서 예약시간 변경하는 부분은 주단위 화면만 적용되어 있습니다.

SPA 설정을 위해서 라우터는 월단위, 주단위 2개로 구분되어 있습니다.
- 월단위 : http://localhost:9000
- 주단위 : http://localhost:9000/week
