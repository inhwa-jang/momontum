const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `/images/${imgNumber + 1}.jpeg`;
    image.classList.add("bgImage"); 
    body.append(image); //appendchild로 하면 z-index를 줘도 body가 image에 밀림, 그래서 append를 줌
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();