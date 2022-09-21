// html class들과 연결
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

// 투두리스트의 로컬스토리지를 뜻함
export const TODOS_LS = 'toDos';

// 여러개의 투두 목록들이 모여서 저장되도록 하기 위해 빈 배열로 설정
let toDos = [];

// 투두를 삭제하는 함수
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

//toDos를 가져와서 로컬에 저장하는 일을 하는 함수
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 투두리스트 입력시 생성되는 보여지는 동작들
function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    // const icon = document.createElement("i");
    delBtn.setAttribute("class","fas fa-trash-alt");
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId; //버튼을 눌렀을 때 어떤 li를 지워야하는지 구분하기 위해
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

// submit이벤트를 가져오는 handleSubmit
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
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

function init() {
    loadToDos();
    // 투두리스트 입력시 submit되는 handleSubmit함수를 통해 동작되는 이벤트리스너를 만들어줄것임
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

export default{
    TODOS_LS
}