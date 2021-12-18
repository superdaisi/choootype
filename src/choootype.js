"use strict";
/**
 * タイトルなどのテキストに自動で長体をかけるJS
 * @constructor　Choootype
 * @param {String} sel - エフェクトを掛けたい場所のセレクターを指定する。
 * @param {Object} opt - オプションのオブジェクト。
 * @param {Number} opt.min - 長体の最長値を設定する。
 * @param {Number} opt.delay - ウインドウリサイズ終了確認のための待機時間。
 * @param {Number} minAspect - 長体の最小値をを設定します。
 * @param {Object} tgt - 変更する複数のオブジェクト
 * @param {Object} box - 変更する1つのオブジェクト（親要素）
 * @param {Object} span - boxの中身にspanタグを追加したオブジェクト（子要素）
 * @param {Number} boxWidth - boxの要素の幅
 * @param {Object} spanWidth - spanの要素の幅
 * @param {Number} aspecgt - 親要素と子要素のの比率。長体の値
 *
 * @todo 最小比率以下の場合文字が切れるので、なにかいい方法を考える。
 *
 * Choootype 1.1
 *
 * Yoshiaki Matsumura
 * ejworks corporation
 * Copyright 2021, MIT License
 *
 */
var Choootype = function (sel = ".choootype", opt = {}) {
  // init
  
  // 可読性のため0.6倍くらいが望ましいが、固定してしまうと文字が切れてしまう可能性あり。
  // 初期値は0（長体の限度なし）
  const minAspect = opt.min || 0;
  let timeoutID = 0;
  let delay = opt.delay || 2000;

  function __setChoootype(sel) {
    const tgt = document.querySelectorAll(sel);
    tgt.forEach((box) => {
      // ターゲットのオブジェクトの中身にspanタグを追加
      const isChoootype = this.querySelector('js-addChoootype');
      let span = document.createElement("span");
      const boxWidth = box.offsetWidth;
      
      // 親要素及び子要素にスタイルを適用する
      // box: 親要素
      // span: 子要素
      span.innerHTML = box.innerHTML;
      span.style.whiteSpace = "nowrap";
      span.className = "js-addChoootype";
      box.style.overflow = "hidden";
      box.innerHTML = "";
      box.appendChild(span);
      
      const spanWidth = span.offsetWidth;
      if (boxWidth < spanWidth) {
        // 親要素の長さと文字部分の長さの比率を出す。<=文字の長体の比率
        let aspect = boxWidth / spanWidth;
        
        // 文字が収まる場合はそのまま抜ける。
        if (aspect >= 1) {
          return;
          // 文字の比率が最小値より小さい場合は最小値に設定する
          // 可読性のため0.6倍くらいが望ましいが、固定してしまうと文字が切れてしまう可能性あり。
        } else if (aspect < minAspect) {
          aspect = minAspect;
        }
        // cssのscale()で長体にする
        span.style.transform = "scale(" + aspect + ", 1)";
        span.style.display = "inline-block";
        span.style.transformOrigin = "top left";
      }
    });
  }
  
  // windwo のりサイズで再度長体の比率を調整
  window.addEventListener("resize", () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout((sel = ".choootype") => {
      const tgt = document.querySelectorAll(sel);
      tgt.forEach((box) => {
        const isChoootype = box.querySelector('.js-addChoootype');
        if (isChoootype != null) {
          box.innerHTML = isChoootype.innerHTML;
          __setChoootype(sel);
        }
      });
    }, delay);
  }, false);

  __setChoootype(sel);
};
