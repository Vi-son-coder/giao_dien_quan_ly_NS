let page = document.body.dataset.page;
// clean code thay vì gọi DOM lung tung thì mỗi html sẽ tự khai báo nó là ai và js đọc lại

/*==========AUTH CHECK============== */
if (page !== "login" && !idAcc) {
  window.location.replace("/login/login.html");
}

/*============LOGOUT================= */
if(page !== "login"){
  document.getElementById("logout")?.addEventListener("click",logout);

function logout(e){
    e.preventDefault()
    localStorage.removeItem("idUser");
    window.location.replace("/login/login.html"); //repace(): là hàm thay thế trang
}

}