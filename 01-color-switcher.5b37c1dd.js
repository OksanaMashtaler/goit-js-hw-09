!function(){var t={btnStart:document.querySelector("button[data-start]"),btnClose:document.querySelector("button[data-stop]"),background:document.querySelector("body")},n=null;t.btnStart.addEventListener("click",(function(){n=setInterval((function(){t.background.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.btnStart.disabled=!0,t.btnClose.disabled=!1})),t.btnClose.addEventListener("click",(function(){clearInterval(n),t.btnClose.disabled=!0,t.btnStart.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.5b37c1dd.js.map