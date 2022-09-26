# momontum
사용자 위치를 추적하여 날씨를 출력하는 크롬웹앱용 투두리스트
https://inhwa-jang.github.io/momontum/
## 스킬
- `HTML`, `CSS`, `Javascript`
- openweather API , openweather ICON
- 반응형 웹
<img width="1440" alt="메인" src="https://user-images.githubusercontent.com/77523846/192211920-f0ca64aa-2cbe-4683-9ab3-265dee8c760a.png">
<img width="493" alt="메인_모바일" src="https://user-images.githubusercontent.com/77523846/192211935-a9323564-c035-49a1-88cf-8b06c8163761.png">

## 기능
- 새로고침 시 랜덤 배경 출력
```javascript
function paintImage(imgNumber){
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.jpeg`;
    image.classList.add("bgImage"); 
    body.append(image); //appendchild로 하면 z-index를 줘도 body가 image에 밀림, 그래서 append를 줌
}
```

- 실시간 시계 출력 (시계 포맷 형식 : 오전, 오후 나눠서 출력)
```javascript
function getTime() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes} ${ampm}`;
}
```

- 투두리스트 : 로컬스토리지에 li를 배열 String(text,id)형식으로 저장
![로컬스토리지](https://user-images.githubusercontent.com/77523846/192211675-be68a109-9c50-4021-9400-74677751d90d.gif)

``` javascript
const TODOS_LS = 'toDos';
//toDos를 가져와서 로컬에 저장하는 일을 하는 함수
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}
```

- 사용자 위치 : getCurrentPosition 메서드를 이용하여 사용자 위치를 가져왔다
```javascript
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
```

- 사용자 위치의 기온을 측정하여 아이콘으로 날씨 출력
<img width="86" alt="날씨 아이콘" src="https://user-images.githubusercontent.com/77523846/192211573-4e4088d6-2b32-4448-9ec9-cdd593262e83.png">

```javascript
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let location = document.createElement("span");
        weather.appendChild(location);
        const {icon} = data.weather[0];
        location.innerHTML = `<img src="./icons/${icon}.png">`;
    })
}
```

- 로그아웃 : 입력받은 사용자, 투두리스트들을 한꺼번에 리셋 (로컬스토리지 삭제) `ES6 MODULE`사용하여 저장된 로컬스토리지값을 가져왔다
<img width="87" alt="로그아웃 버튼" src="https://user-images.githubusercontent.com/77523846/192211613-9ac57ad5-d094-4e4d-bc36-131ef1227f83.png">

```javascript
signoutBtn.addEventListener('click',() => {
    alert('로그아웃!');
    localStorage.removeItem(USER_LS);
    localStorage.removeItem(TODOS_LS);
    window.location.reload();
})
```
