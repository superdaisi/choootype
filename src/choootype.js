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
 * Choootype 1.2
 *
 * Yoshiaki Matsumura
 * ejworks corporation
 * Copyright 2021, MIT License
 *
 */
var Choootype = function (sel = ".choootype", opt = {}) {
    // 可読性のため0.6倍くらいが望ましいが、固定してしまうと文字が切れてしまう可能性あり。
    // 初期値は0（長体の限度なし）
    const minAspect = opt.min || 0;
    let timeoutID = 0;
    let delay = opt.delay || 500;

    // window のりサイズで再度長体の比率を調整
    window.addEventListener("resize", ()=>{
        clearTimeout(timeoutID);
        timeoutID = setTimeout((sel = ".choootype")=>{
            const tgt = document.querySelectorAll(sel);
            tgt.forEach((box) => {
                const isChoootype = box.querySelector('.js-addChoootype');
                if(isChoootype != null){
                    box.innerHTML = isChoootype.innerHTML;
                }
            });
            // Choootype();
            __setChoootype(sel);
        }, delay);
    }, false);


    function __setChoootype(sel) {
        const tgt = document.querySelectorAll(sel);
        tgt.forEach((box) => {
            let span = document.createElement("span");
            const boxWidth = box.offsetWidth;
            span.innerHTML = box.innerHTML;
            span.style.whiteSpace = "nowrap";
            span.className = "js-addChoootype";
            box.style.overflow = "hidden";
            box.innerHTML = "";
            box.appendChild(span);
            const spanWidth = span.offsetWidth;
            if (boxWidth < spanWidth) {
                let aspect = boxWidth / spanWidth;
                if(aspect < minAspect) aspect = minAspect;
                span.style.transform = "scale(" + aspect + ", 1)";
                span.style.display = "inline-block";
                span.style.transformOrigin = "top left";
            }
        });
    }
    __setChoootype(sel);
};
