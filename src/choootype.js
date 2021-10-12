"use strict";
/**
 * タイトルなどの1行のテキストに自動で長体をかける
 * @constructor　Choootype
 * @param {String} sel - エフェクトを掛けたい場所のセレクターを指定する。
 * @param {Object} opt - オプションのオブジェクト。
 * @param {Number} opt.min - 長体の最長値を設定する。
 * @param {Number} minAspect - 長体の最小値をを設定します。
 * @param {Object} tgt - 変更する複数のオブジェクト
 * @param {Object} box - 変更する1つのオブジェクト（親要素）
 * @param {Object} span - boxの中身にspanタグを追加したオブジェクト（子要素）
 * @param {Number} boxWidth - boxの要素の幅
 * @param {Object} spanWidth - spanの要素の幅
 * @param {Number} aspecgt - 親要素と子要素のの比率。長体の値
 *
 * Choootype 1.0
 *
 * Yoshiaki Matsumura
 * ejworks corporation
 * Copyright 2021, MIT License
 *
 */
var Choootype = function (sel = ".choootype", opt = {}) {
  const minAspect = opt.min || 0;
  const tgt = document.querySelectorAll(sel);
  tgt.forEach((box) => {
    let span = document.createElement("span");
    const boxWidth = box.offsetWidth;
    span.innerHTML = box.innerHTML;
    span.style.whiteSpace = "nowrap";

    box.style.overflow = "hidden";

    box.innerHTML = "";
    box.appendChild(span);

    const spanWidth = span.offsetWidth;
    console.log(boxWidth, spanWidth);
    let aspect = boxWidth / spanWidth;

    if (aspect >= 1) {
      return;
    } else if (aspect < minAspect) {
      aspect = minAspect;
    }
    span.style.transform = "scale(" + aspect + ", 1)";
    span.style.display = "block";
    span.style.transformOrigin = "top left";
  });
};
