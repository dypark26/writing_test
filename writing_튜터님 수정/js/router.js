import { authService } from "./firebase.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  "/": "/pages/home.html",
  writing: "/pages/writing.html",
  page2: "/pages/page2.html",
  404: "/pages/404.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");
  const pathName = window.location.pathname;

  // Live Server를 index.html에서 오픈할 경우
  if (pathName === "/index.html") {
    window.history.pushState({}, "", "/");
  }
  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
  }
  // truthy 하면 route[path], falsy 하면 routes[404]
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  // if (path === "fanLog") {
  //   // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
  //   document.getElementById("nickname").textContent =
  //     authService.currentUser.displayName ?? "닉네임 없음";

  //   document.getElementById("profileImg").src =
  //     authService.currentUser.photoURL ?? "../assets/blankProfile.webp";

  //   getCommentList();
  // }
  // if (path === "profile") {
  //   // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
  //   document.getElementById("profileView").src =
  //     authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
  //   document.getElementById("profileNickname").placeholder =
  //     authService.currentUser.displayName ?? "닉네임 없음";
  // }
};
