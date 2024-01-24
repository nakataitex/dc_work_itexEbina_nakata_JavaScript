//ページが読み込まれた時に鍵盤を1オクターブ分設置するスクリプト
window.onload = function () {
    for (let i = 0; i < 7; i++) {
        $(".piano").append(`<div class='key'><button>${scale[i]}</button></div>`);
    };
    $("#auto_mode").text("自動演奏");
}

//ピアノに盛り込む機能の定数･変数
const piano_status = $("#scale_view");//音階を文字として表示する際に使う
let scaleHideCount = null;//表示された音階を非表示にするタイマー
//基本的な箇所の定数宣言
var actx = new AudioContext();// WebAudioAPIコンテキスト
var oscillator = null;
const scaleHz = [261, 293, 329, 349, 392, 440, 493];//C4から1オクターブ分の周波数
const scale = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];//表示用の音階

//鍵盤を押した時の挙動
$(".piano").on("mousedown", ".key", function () {
    if (!playing) {
        clearTimeout(scaleHideCount);//音階を表示中に"文字非表示"が割り込まない様に
        let i = $(".key").index(this);
        oscillator = actx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(scaleHz[i], actx.currentTime);//押されたキーによって音を変える様に
        oscillator.connect(actx.destination);
        oscillator.start();
        piano_status.text(scale[i]);
    }

});

//マウスが離された時の挙動
$(document).on("mouseup", function () {
    if (oscillator && !playing) {
        oscillator.stop();
        oscillator = null;
        //音が消えてから1秒後非表示に変更
        scaleHideCount = setTimeout(function () {
            piano_status.text("");
        }, 1000);
    }
});


//以下、自動演奏
//チューリップの楽譜
const tulipSong = [
    { note: "ド", duration: 500 }, { note: "レ", duration: 500 }, { note: "ミ", duration: 1000 },
    { note: "ド", duration: 500 }, { note: "レ", duration: 500 }, { note: "ミ", duration: 1000 },
    { note: "ソ", duration: 500 }, { note: "ミ", duration: 500 }, { note: "レ", duration: 500 },
    { note: "ド", duration: 500 }, { note: "レ", duration: 500 }, { note: "ミ", duration: 500 },
    { note: "レ", duration: 1000 }, { note: "ド", duration: 500 }, { note: "レ", duration: 500 },
    { note: "ミ", duration: 1000 }, { note: "ド", duration: 500 }, { note: "レ", duration: 500 },
    { note: "ミ", duration: 1000 }, { note: "ソ", duration: 500 }, { note: "ミ", duration: 500 },
    { note: "レ", duration: 500 }, { note: "ド", duration: 500 }, { note: "レ", duration: 500 },
    { note: "ミ", duration: 500 }, { note: "ド", duration: 1000 }, { note: "ソ", duration: 250 },
    { note: "休符", duration: 250 }, { note: "ソ", duration: 250 }, { note: "休符", duration: 250 },
    { note: "ミ", duration: 250 }, { note: "休符", duration: 250 }, { note: "ソ", duration: 250 },
    { note: "休符", duration: 250 }, { note: "ラ", duration: 250 }, { note: "休符", duration: 250 },
    { note: "ラ", duration: 250 }, { note: "休符", duration: 250 }, { note: "ソ", duration: 1000 },
    { note: "ミ", duration: 250 }, { note: "休符", duration: 250 }, { note: "ミ", duration: 250 },
    { note: "休符", duration: 250 }, { note: "レ", duration: 250 }, { note: "休符", duration: 250 },
    { note: "レ", duration: 250 }, { note: "休符", duration: 250 }, { note: "ド", duration: 4000 }
];



//きらきら星の楽譜
const starSong = [
    { note: "ド", duration: 500 }, { note: "休符", duration: 500 }, { note: "ド", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ソ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ソ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ラ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ラ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ソ", duration: 2000 }, { note: "ファ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ファ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ミ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ミ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "レ", duration: 500 }, { note: "休符", duration: 500 }, { note: "レ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ド", duration: 2000 }, { note: "ソ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ソ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ファ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ファ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ミ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ミ", duration: 500 }, { note: "休符", duration: 500 }, { note: "レ", duration: 2000 },
    { note: "ソ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ソ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ファ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ファ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ミ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ミ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "レ", duration: 2000 }, { note: "ド", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ド", duration: 500 }, { note: "休符", duration: 500 }, { note: "ソ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ソ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ラ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ラ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ソ", duration: 2000 }, { note: "ファ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "ファ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "ミ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ミ", duration: 500 },
    { note: "休符", duration: 500 }, { note: "レ", duration: 500 }, { note: "休符", duration: 500 },
    { note: "レ", duration: 500 }, { note: "休符", duration: 500 }, { note: "ド", duration: 4000 }
];
let songName = ["きらきら星", "チューリップ"]; // 曲を増やす時に管理しやすい様にリスト化
let playing = false; // 演奏中かどうかを示すフラグ
let timeoutCount = []; // 現在のsetTimeoutを格納

// 自動演奏ボタンを押した時
$("#auto_mode").on("click", function () {
    if (playing) {

        stopPlay();
    } else {

        startPlay();
    }
});

// 演奏してる時に演奏中止を押した場合の挙動
function stopPlay() {
    for (let i = 0; i < timeoutCount.length; i++) {
        clearTimeout(timeoutCount[i]);
    }
    timeoutCount = [];
    playing = false;
    $("#auto_mode").text("自動演奏");
    $("#autoplay_text").text("");
    piano_status.text("");
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    };
}

// 停止してる時に自動演奏ボタンを押した時、楽譜読み込み等
function startPlay() {
    const song = Math.random() < 0.5 ? starSong : tulipSong; // ランダムに再生
    let totalDuration = 0;
    playing = true;
    $("#auto_mode").text("演奏中止");
    if (song == starSong) {
        $("#autoplay_text").text(`${songName[0]}を自動演奏中`);
    } else {
        $("#autoplay_text").text(`${songName[1]}を自動演奏中`);
    }
    for (let i = 0; i < song.length; i++) {
        const note = song[i].note;
        const duration = song[i].duration;
        timeoutCount[i] = setTimeout(function () {
            playSong(note);
        }, totalDuration);
        totalDuration += duration;
    }
    setTimeout(stopPlay, totalDuration);    //全部終わったら停止する
}

//自動再生
function playSong(note) {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    if (note !== "休符") {
        clearTimeout(scaleHideCount);
        const index = scale.indexOf(note);
        piano_status.text(scale[index]);
        oscillator = actx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(scaleHz[index], actx.currentTime);
        oscillator.connect(actx.destination);
        oscillator.start();
    };
}