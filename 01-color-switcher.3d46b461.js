const t={btnStart:document.querySelector("button[data-start]"),btnClose:document.querySelector("button[data-stop]"),background:document.querySelector("body")};let e=null;t.btnStart.addEventListener("click",(function(){e=setInterval((()=>{t.background.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.btnStart.disabled=!0,t.btnClose.disabled=!1})),t.btnClose.addEventListener("click",(function(){clearInterval(e),t.btnClose.disabled=!0,t.btnStart.disabled=!1}));
//# sourceMappingURL=01-color-switcher.3d46b461.js.map
