const actx = new AudioContext();// WebAudioAPIコンテキスト
let oscillator = null; //オシレーターのnull指定

// ↓ドのコード 
const C4 = document.querySelector("#C4");
//ド再生用
function C4_start() {
    oscillator = actx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(261.626, actx.currentTime);//周波数
    oscillator.connect(actx.destination);
    oscillator.start();
}

//ド停止用
function C4_stop() {
    oscillator.stop();
}

C4.addEventListener("mousedown", C4_start);
C4.addEventListener("mouseup", C4_stop);


// ↑ここまでドのコード　　↓以下レのコード

const D4 = document.querySelector("#D4"); //レの音

//レ再生用
function D4_start() {
    oscillator = actx.createOscillator();
    oscillator.type = "sine";//波形
    oscillator.frequency.setValueAtTime(293.665, actx.currentTime);//レの音
    oscillator.connect(actx.destination);
    oscillator.start();
}

//レ停止用
function D4_stop() {
    oscillator.stop();
}

//マウスイベント
D4.addEventListener("mousedown", D4_start);
D4.addEventListener("mouseup", D4_stop);