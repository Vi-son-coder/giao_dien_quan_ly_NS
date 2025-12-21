console.log("js đã chạy");
let employees = JSON.parse(localStorage.getItem("employees")) || [];
console.log(employees);
let Form__hsnv = document.querySelector(".form__hsnv");

let userList = Form__hsnv.querySelector("#list");

let rememberRow = null;

function display(Data = employees) {
  userList.innerHTML = "";
  Data.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.dataset.index = index;
    tr.innerHTML = `
    <td>${user.manv}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>
      <div id="action">
        <button id="Fix__btn">Sửa thông tin</button>
        <button id="Xem">Xem chi tiết</button>
      </div>
    </td>
    `;
    userList.appendChild(tr);
    tr.querySelector("#Fix__btn").addEventListener("click", () => {
      rememberRow = tr;
    });
  });
}
window.addEventListener("load", () => {
  display(employees);
});
