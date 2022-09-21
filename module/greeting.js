import {TODOS_LS} from "./todo.js";

const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    signoutBtn = document.querySelector(".js-reset-btn");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `오늘도 화이팅! <br/>${text} <i class="fas fa-smile-wink"></i> `;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //user cannot find, undefinded
        askForName();
    } else{
        //user is 
        paintGreeting(currentUser);
    }
}

signoutBtn.addEventListener('click',() => {
    alert('로그아웃!');
    localStorage.removeItem(USER_LS);
    localStorage.removeItem(TODOS_LS);
    window.location.reload();
})

function init() {
    loadName();
}

init();

