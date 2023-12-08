const canvas = document.querySelector(".canvas");
const canvasArea = document.querySelector(".canvas_area");
const stroke = document.querySelector(".stroke");
const color = document.querySelector(".color");
const bgc = document.querySelector(".bgc");
const image = document.querySelector(".image");
const imgWidth = document.querySelector(".img_width");
const imgHeight = document.querySelector(".img_height");
const fullsizeBtn = document.querySelector(".full_size");
const eraser = document.querySelector(".eraser");
const eraserCursor = document.querySelector(".eraser_cursor");
const eraserSize = document.querySelector(".eraser_size");
const draw = document.querySelector(".draw");
const reset = document.querySelector(".reset");
const options = document.querySelector(".options");
const optionBtn = document.querySelector(".option_btn");
const stroke_step = document.querySelector(".stroke_step");
const eraserSizeStep = document.querySelector(".eraserSize_step");
const text = document.querySelector(".text");
const textSize = document.querySelector(".text_size");
const ctx = canvas.getContext("2d");

let isPainting = false;
let isDelete = false;
let isDraw = false;

const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

canvas.width = screenWidth;
canvas.height = screenHeight;
ctx.lineWidth = stroke.value;

// 마우스 커서 함수
function handleMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (isPainting) {
        ctx.lineTo(x, y);
        ctx.stroke();

        return;
    }

    ctx.moveTo(x, y);
}

// 마우스를 누르지 않을 때(false) 그리기 종료
function canclePainting() {
    isPainting = false;

    ctx.beginPath();
}
// 마우스를 누르고 있을 때(true)만 그리기
function startPainting() {
    isPainting = true;
}

// 선 굵기 변경 함수
function handlestrokeChange(e) {
    ctx.lineWidth = e.target.value;
    stroke_step.innerText = e.target.value;
}

// 토글 옵션메뉴 함수
const handleOptionsClick = () => {
    options.classList.toggle("active");
};

// 색상 변경 함수
function handleColorChange(e) {
    const { value } = e.target;

    ctx.strokeStyle = value;
    ctx.fillStyle = value;
}
function handleBackgroundColorChange(e) {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 지우기 함수
function handleEraserClick(e) {
    isDelete = true;

    if (isDelete) {
        ctx.lineWidth = e.target.value;
        ctx.strokeStyle = bgc.value;
        ctx.fillStyle = bgc.value;

        stroke.disabled = true;

        eraserSize.disabled = false;
        eraserCursor.style.width = stroke.value;
        eraserCursor.style.height = stroke.value;

        eraserCursor.classList.add("on");
        canvasArea.classList.add("eraser");
    }
}
// 지우개 커서 함수
function handleMouseMoveWithEraser(e) {
    const x = e.clientX - eraserSize.value / 2;
    const y = e.clientY - eraserSize.value / 2;

    eraserCursor.style.left = x + "px";
    eraserCursor.style.top = y + "px";
}
// 지우개 크기변경 함수
function handleEraserSizeChange(e) {
    ctx.lineWidth = e.target.value;
    eraserCursor.style.width = e.target.value + "px";
    eraserCursor.style.height = e.target.value + "px";
    eraserSizeStep.innerText = e.target.value;
}

// 그리기 함수
function handleDrawclick() {
    isDelete = false;

    if (!isDelete) {
        ctx.lineWidth = stroke.value;
        ctx.strokeStyle = color.value;
        ctx.fillStyle = color.value;

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

// 이미지 삽입 함수
function handleImageChange(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    const width = imgWidth.value;
    const height = imgHeight.value;

    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, width, height);
        image.value = "";
    };
}
// 이미지크기 변경 함수
function handleFullSizeBtnClick() {
    imgWidth.value = canvas.width;
    imgHeight.value = canvas.height;
}

// 텍스트 화면 삽입 함수
function handleDoubleClick(e){
    const x = e.offsetX;
    const y = e.offsetY;
    const txt = text.value;

    if(txt !== ""){
        ctx.lineWidth = 1;
        ctx.font = `${textSize.value}px sans-serif`;
        ctx.fillText(txt, x, y);
    
        ctx.lineWidth = stroke.value;
    }
}

// 리셋 함수
function handleResetClick() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    image.value = "";
    imgWidth.value = 100;
    imgHeight.value = 100;

    text.value = "";
    textSize.value = 16;

    handleDrawclick();
}

canvas.addEventListener("pointermove", handleMouseMove);
canvas.addEventListener("pointerup", canclePainting);
canvas.addEventListener("pointerdown", startPainting);
canvas.addEventListener("pointerleave", canclePainting);
canvas.addEventListener("dblclick", handleDoubleClick);
canvasArea.addEventListener("pointermove", handleMouseMoveWithEraser);

stroke.addEventListener("change", handlestrokeChange);
color.addEventListener("change", handleColorChange);
bgc.addEventListener("change", handleBackgroundColorChange);
eraser.addEventListener("click", handleEraserClick);
eraserSize.addEventListener("change", handleEraserSizeChange);
draw.addEventListener("click", handleDrawclick);
reset.addEventListener("click", handleResetClick);
image.addEventListener("change", handleImageChange);
fullsizeBtn.addEventListener("click", handleFullSizeBtnClick);
optionBtn.addEventListener("click", handleOptionsClick);
