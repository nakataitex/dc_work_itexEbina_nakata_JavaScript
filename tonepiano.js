$(window).on("load", function () {
  const volume = new Tone.Volume(0);
  const synth = new Tone.PolySynth(Tone.Synth).connect(volume);
  volume.toDestination();
  const activeKey = {};
  Tone.Transport.bpm.value = 60;
  let textHideCount = null;
  let playing = false;
  //キー割り当て、鳴らす音、表示用テキスト(自動演奏に対応する為に変更必要)
  const note = {
    a: { pitch: "C4", text: "ド" },
    s: { pitch: "D4", text: "レ" },
    d: { pitch: "E4", text: "ミ" },
    f: { pitch: "F4", text: "ファ" },
    g: { pitch: "G4", text: "ソ" },
    h: { pitch: "A4", text: "ラ" },
    j: { pitch: "B4", text: "シ" },
  };

  //マウス操作
  let clickMonitor = false;
  function mouseDown() {
    clickMonitor = true;
    console.log(`マウスボタンが${clickMonitor}です。`);
  }

  function mouseUp() {
    clickMonitor = false;
    console.log(clickMonitor);
    console.log(`マウスボタンが${clickMonitor}です。`);
  }

  $(document).on("mousedown", mouseDown);
  $(document).on("mouseup", mouseUp);

  //キーボード操作(押した時)
  $(document).on("keydown", function pushKey(e) {
    const key = e.key.toLowerCase();
    if (note[key] && !activeKey[key] && !playing && !clickMonitor) {
//      if (Tone.context.state !== "running") {
        Tone.start();
  //      console.log("Tone.context.state !== runningのフラグ");
  //    }
      synth.triggerAttack(note[key].pitch);
      activeKey[key] = true;

      clearTimeout(textHideCount);
      $("#sound_view").text(note[key].text);
      console.log(note[key].text);
    }
  });

  //キーボード操作(離した時)
  $(document).on("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (note[key] && !playing) {
      synth.triggerRelease(note[key].pitch);
      activeKey[key] = false;
      textHideCount = setTimeout(() => {
        if (Object.values(activeKey).every((value) => value === false)) {
          $("#sound_view").text("");
        }
      }, 1000);
    }
  });

  //音量管理
  function volumeToGain(volumeValue) {
    if (volumeValue === 0) {
      return -Infinity;
    } else {
      var gains = volumeValue * 40 - 40;
      return gains;
    }
  }

  $("#volume_control").on("input", function (e) {
    const volumeValue = parseFloat($(this).val());
    volume.volume.value = volumeToGain(volumeValue);
  });

  //きらきら星の楽譜
  const starSong = [
    { note: "C4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "C4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "A4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "A4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "2n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "C4", duration: "2n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "D4", duration: "2n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "D4", duration: "2n" },
    { note: "C4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "C4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "A4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "A4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "G4", duration: "2n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "F4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "rest", duration: "8n" },
    { note: "C4", duration: "1n" },
  ];

  //チューリップの楽譜
  const tulipSong = [
    { note: "C4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "E4", duration: "4n" },
    { note: "C4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "E4", duration: "4n" },
    { note: "G4", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "C4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "D4", duration: "4n" },
    { note: "C4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "E4", duration: "4n" },
    { note: "C4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "E4", duration: "4n" },
    { note: "G4", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "C4", duration: "8n" },
    { note: "D4", duration: "8n" },
    { note: "E4", duration: "8n" },
    { note: "C4", duration: "4n" },
    { note: "G4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "G4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "E4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "G4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "A4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "A4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "G4", duration: "4n" },
    { note: "E4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "E4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "D4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "D4", duration: "16n" },
    { note: "rest", duration: "16n" },
    { note: "C4", duration: "1n" },
  ];

  //自動演奏ボタンを押して状態を確認してから分岐
  $("#playButton").on("mouseup", async function () {
    if (playing) {
      stopSong();
    } else if (
      Object.values(activeKey).every((value) => value === false) &&
      !clickMonitor == false
    ) {
      await playSong();
    }
  });

  //演奏開始
  async function playSong() {
    await Tone.start();
    $("#playButton").text("自動演奏停止");
    console.log("自動演奏を開始");
    playing = true;
    const song = Math.random() < 0.5 ? starSong : tulipSong;

    Tone.Transport.cancel();
    let time = 0;
    for (let i = 0; i < song.length; i++) {
      const currentNote = song[i];
      if (currentNote.note !== "rest") {
        Tone.Transport.scheduleOnce((test) => {
          synth.triggerAttackRelease(
            currentNote.note,
            currentNote.duration,
            test
          );
          //演奏中のテキスト表示が必要
        }, time);
      }
      time += Tone.Time(currentNote.duration).toSeconds();
    }

    //演奏が終わったらstopSong実行
    Tone.Transport.scheduleOnce(() => {
      stopSong();
    }, time);
    Tone.Transport.start();
  }
  //演奏停止
  function stopSong() {
    $("#playButton").text("自動演奏開始");
    Tone.Transport.cancel();
    Tone.Transport.stop();
    playing = false;
    console.log("自動演奏停止しました。");
    $("#sound_view").text("");
  }
});
