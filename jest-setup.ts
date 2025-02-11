import "@testing-library/jest-dom";

//* 加入 modal 專用的錨點 overlays。
const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "overlays");
document.body.appendChild(modalRoot);
