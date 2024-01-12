const actx = new AudioContext();// WebAudioAPIコンテキスト
let oscillator = null; //オシレーターのnull指定

// ↓ドのコード 
//const c4 = document.querySelector("#c4");
const $c4 = $("#c4");
//ド再生用
function c4_start() {
    oscillator = actx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(261.626, actx.currentTime);//周波数
    oscillator.connect(actx.destination);
    oscillator.start();
}

//ド停止用
function c4_stop() {
    oscillator.stop();
}

//ドのイベント管理
$(c4).on('mousedown', c4_start);
$(c4).on('mouseup', c4_stop);



// ↑ここまでドのコード　　↓以下レのコード

const $d4 = $("#d4"); //レの音

//レ再生用
function d4_start() {
    oscillator = actx.createOscillator();
    oscillator.type = "sine";//波形
    oscillator.frequency.setValueAtTime(293.665, actx.currentTime);//レの音
    oscillator.connect(actx.destination);
    oscillator.start();
}

//レ停止用
function d4_stop() {
    oscillator.stop();
}

//レのイベント管理
$(d4).on('mousedown', d4_start);
$(d4).on('mouseup', d4_stop);
