$(window).on("load", function () {
  const volume = new Tone.Volume(0);
  const synth = new Tone.PolySynth(Tone.Synth).connect(volume);
  volume.toDestination();
  Tone.Transport.bpm.value = 60;
  let soundTimeoutCount = [];
  let activeSound = [];

  //表示用テキスト、キー割り当て、鳴らす音
  const text = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];
  const keyBind = { a: 0, s: 1, d: 2, f: 3, g: 4, h: 5, j: 6 };
  const pitch = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

  //音を再生
  function playSound(i) {
    if (!activeSound[i] && !playing) {
      synth.triggerAttack(pitch[i]);
      activeSound[i] = true;
      Tone.start();
      clearTimeout(soundTimeoutCount[i]);
      $(".sound_view").eq(i).text(text[i]);
      console.log(`${text[i]}が押されてます`);
    }
  }

  //音を停止
  function stopSound(i) {
    if (!playing) {
      synth.triggerRelease(pitch[i]);
      clearTimeout(soundTimeoutCount[i]);
      activeSound[i] = false;
      soundTimeoutCount[i] = setTimeout(function () {
        $(".sound_view").eq(i).text("");
      }, 1000);
    }
  }

  //マウスを押した時
  $(".key").on("mousedown", function () {
    let i = $(".key").index(this);
    playSound(i);
  });

  //マウスを離した時
  $(".key").on("mouseup mouseout", function () {
    let i = $(".key").index(this);
    stopSound(i);
  });

  //キーを押して再生
  $(document).on("keydown", function (e) {
    let i = e.key;
    if (keyBind[i] !== undefined && !e.repeat) {
      playSound(keyBind[i]);
    }
  });

  //キーを離した時
  $(document).on("keyup", function (e) {
    let i = e.key;
    if (keyBind[e.key] !== undefined) {
      stopSound(keyBind[i]);
    }
  });

  //自動演奏
  let playing = false; //自動演奏が有効化か
  let autoPlayTimeout = [];
  let stopAutoPlay = false;

  //曲の管理(別ファイル)
  const songList = [
    { name: "きらきら星", note: starSong },
    { name: "チューリップ", note: tulipSong },
  ];

  //自動演奏
  function playSong(song) {
    $("#autoplay_text").text(`自動演奏中です：${song.name}`);
    let totalDuration = 0;
    stopAutoPlay = false;
    for (let i = 0; i < autoPlayTimeout.length; i++) {
      clearTimeout(autoPlayTimeout[i]);
    }
    autoPlayTimeout = [];
    for (let i = 0; i < song.note.length; i++) {
      let note = song.note[i];
      if (note.note !== "rest") {
        let timeoutCount = setTimeout(function () {
          if (!stopAutoPlay) {
            synth.triggerAttackRelease(note.note, note.duration);
          }
        }, totalDuration * 1000);
        autoPlayTimeout.push(timeoutCount);
      }
      totalDuration += Tone.Time(note.duration).toSeconds();
    }

    let endTime = setTimeout(function () {
      if (!stopAutoPlay) {
        playing = false;
        $("#autoplay_text").text("");
        $("#playButton").text("自動演奏");
      }
    }, totalDuration * 1000);
    autoPlayTimeout.push(endTime);
  }

  //ボタンを押した時(自動演奏中か判断して分岐)
  $("#playButton").on("click", function () {
    if (playing) {
      console.log("演奏停止しました");
      stopAutoPlay = true;
      playing = false;
      synth.releaseAll();
      $(this).text("自動演奏");
      $("#autoplay_text").text("");
    } else {
      playing = true;
      stopAutoPlay = false;

      for (let i = 0; i < pitch.length; i++) {
        $(".sound_view").eq(i).text("");
      }
      $(this).text("演奏停止");
      const i = Math.floor(Math.random() * songList.length);
      playSong(songList[i]);
      console.log("演奏開始しました");
    }
  });

  //追加機能
  //音量調整
  $("#volume_control").on("input change", function () {
    const volumeValue = parseFloat($(this).val());
    if (volumeValue === 0) {
      volume.volume.value = -Infinity;
    } else {
      volume.volume.value = volumeValue * 40 - 40;
      console.log(volume.volume.value);
    }
  });
});
