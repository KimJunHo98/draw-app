const canvas = document.querySelector(".canvas");
const canvasArea = document.querySelector(".canvas_area");
const stroke = document.querySelector(".stroke");
const color = document.querySelector(".color");
const bgc = document.querySelector(".bgc");
const eraser = document.querySelector(".eraser");
const eraserCursor = document.querySelector(".eraser_cursor");
const eraserSize = document.querySelector(".eraser_size");
const draw = document.querySelector(".draw");
const reset = document.querySelector(".reset");
const options = document.querySelector(".options");
const optionBtn = document.querySelector(".option_btn");
const stroke_step = document.querySelector(".stroke_step");
const eraserSizeStep = document.querySelector(".eraserSize_step");
const board = canvas.getContext("2d");

let isPainting = false;
let isDelete = false;

canvas.width = canvasArea.clientWidth;
canvas.height = canvasArea.clientHeight;
board.lineWidth = stroke.value;

// 지우개 커서 움직임 함수
function handleMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (isPainting) {
        board.lineTo(x, y);
        board.stroke();

        return;
    }

    board.moveTo(x, y);
}

// 선 굴기 변경 함수
function handlestrokeChange(e) {
    board.lineWidth = e.target.value;
    stroke_step.innerText = e.target.value;
}

const handleOptionsClick = () => {
    options.classList.toggle("active");
};

// 색상 변경 함수
function handleColorChange(e) {
    const { value } = e.target;

    board.strokeStyle = value;
    board.fillStyle = value;
}
function handleBackgroundColorChange(e) {
    board.fillStyle = e.target.value;
    board.fillRect(0, 0, canvas.width, canvas.height);
}

// 지우기 함수
function handleEraserClick(e) {
    isDelete = true;

    if (isDelete) {
        board.lineWidth = e.target.value;
        board.strokeStyle = bgc.value;
        board.fillStyle = bgc.value;

        stroke.disabled = true;

        eraserSize.disabled = false;
        eraserCursor.style.width = stroke.value;
        eraserCursor.style.height = stroke.value;

        eraserCursor.classList.add("on");
        canvasArea.classList.add("eraser");
    }
}
function handleMouseMoveWithEraser(e) {
    const x = e.clientX - eraserSize.value / 2;
    const y = e.clientY - eraserSize.value / 2;

    eraserCursor.style.left = x + "px";
    eraserCursor.style.top = y + "px";
}
function handleEraserSizeChange(e) {
    board.lineWidth = e.target.value;
    eraserCursor.style.width = e.target.value + "px";
    eraserCursor.style.height = e.target.value + "px";
    eraserSizeStep.innerText = e.target.value;
}

// 그리기 함수
function handleDrawclick() {
    isDelete = false;

    if (!isDelete) {
        board.lineWidth = stroke.value;
        board.strokeStyle = color.value;
        board.fillStyle = color.value;

        stroke.disabled = false;

        eraserSize.value = 3;
        eraserSize.disabled = true;
        eraserCursor.style.width = 3 + "px";
        eraserCursor.style.height = 3 + "px";
        eraserSizeStep.innerText = eraserSize.value;

        eraserCursor.classList.remove("on");
        canvasArea.classList.remove("eraser");
    }
}

// 리셋
function handleResetClick() {
    board.fillStyle = "#fff";
    board.fillRect(0, 0, canvas.width, canvas.height);

    stroke.disabled = false;
    stroke.value = 3;
    stroke_step.innerText = 3;

    eraserSizeStep.innerText = 3;
    eraserSize.value = 3;
    eraserSize.disabled = true;
    eraserCursor.style.width = 3 + "px";
    eraserCursor.style.height = 3 + "px";

    color.value = "#000000";
    bgc.value = "#ffffff";

    handleDrawclick();
}

// 마우스를 누르지 않을 때(false) 그리기 종료,  마우스를 누르고 있을 때(true)만 그리기
function canclePainting() {
    isPainting = false;

    board.beginPath();
}

function startPainting() {
    isPainting = true;
}

canvas.addEventListener("pointermove", handleMouseMove);
canvas.addEventListener("pointerup", canclePainting);
canvas.addEventListener("pointerdown", startPainting);
canvas.addEventListener("pointerleave", canclePainting);
canvasArea.addEventListener("pointermove", handleMouseMoveWithEraser);

stroke.addEventListener("change", handlestrokeChange);
color.addEventListener("change", handleColorChange);
bgc.addEventListener("change", handleBackgroundColorChange);
eraser.addEventListener("click", handleEraserClick);
eraserSize.addEventListener("change", handleEraserSizeChange);
draw.addEventListener("click", handleDrawclick);
reset.addEventListener("click", handleResetClick);
optionBtn.addEventListener("click", handleOptionsClick);
