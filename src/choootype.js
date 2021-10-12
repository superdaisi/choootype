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
 * @todo 最小比率以下の場合文字が切れるので、なにかいい方法を考える。
 *
 * Choootype 1.0
 *
 * Yoshiaki Matsumura
 * ejworks corporation
 * Copyright 2021, MIT License
 *
 */
var Choootype = function (sel = ".choootype", opt = {}) {
  // init
  const minAspect = opt.min || 0;
  const tgt = document.querySelectorAll(sel);

  tgt.forEach((box) => {
    // ターゲットのオブジェクトの中身にspanタグを追加
    let span = document.createElement("span");
    const boxWidth = box.offsetWidth;
    const spanWidth = span.offsetWidth;
    span.innerHTML = box.innerHTML;
    box.innerHTML = "";
    box.appendChild(span);

    // 親要素の長さと文字部分の長さの比率を出す。<=文字の長体の比率
    console.log(boxWidth, spanWidth);
    let aspect = boxWidth / spanWidth;

    // 文字が収まる場合はそのまま抜ける。
    if (aspect >= 1) {
      return;

      // 文字の比率が最小値より小さい場合は最小値に設定する
      // 可読性のため0.6倍くらいが望ましいが、固定してしまうと文字が切れてしまう。
    } else if (aspect < minAspect) {
      aspect = minAspect;
    }
    // 親要素及び子要素にスタイルを適用する
    box.style.overflow = "hidden";
    span.style.whiteSpace = "nowrap";
    span.style.transform = "scale(" + aspect + ", 1)";
    span.style.display = "block";
    span.style.transformOrigin = "top left";
  });
};
