const canvas = document.querySelector(".canvas");
const stroke = document.querySelector(".stroke");
const options = document.querySelector(".options");
const step = document.querySelector(".step");
const board = canvas.getContext("2d");

const colors = ["#ff3838", "#ffb8b8", "#c56cf0", "#ff9f1a", "#fff200", "#32ff7e", "#7efff5", "#18dcff", "#7d5fff"];
const color = colors[Math.floor(Math.random() * colors.length)];

let isPainting = false;

canvas.width = 800;
canvas.height = 800;

board.lineWidth = stroke.value;

const handleMouseMove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (isPainting) {
        board.lineTo(x, y);
        board.stroke();

        return;
    }

    board.moveTo(x, y);
};
const handlestrokeChange = (e) => {
    board.lineWidth = e.target.value;
    step.innerText = e.target.value;
}
const handleOptionsClick = () => {
    options.classList.toggle("active");
}

// 마우스를 누르지 않을 때(false) 그리기 종료,  마우스를 누르고 있을 때(true)만 그리기
const canclePainting = () => {
    isPainting = false;

    board.beginPath();
}; 
const startPainting = () => {
    isPainting = true;
};

canvas.addEventListener("pointermove", handleMouseMove);
canvas.addEventListener("pointerup", canclePainting);
canvas.addEventListener("pointerdown", startPainting);
canvas.addEventListener("pointerleave", canclePainting);

stroke.addEventListener("change", handlestrokeChange);

options.addEventListener("click", handleOptionsClick);
