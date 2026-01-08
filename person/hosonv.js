
let Form__hsnv = document.querySelector(".form__hsnv");

let userList = Form__hsnv.querySelector("#list");

let idAcc = localStorage.getItem("idUser");

let allEmployees = JSON.parse(localStorage.getItem("employees"));

let Employees = allEmployees.filter((user) => user.idAcc === idAcc);

function refresh__allEmployeesFilter(Employees){
  Employees = allEmployees.filter((user) => user.idAcc === idAcc);
  display(Employees);
}
function display(Employees) {
  userList.innerHTML = "";
  Employees.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${user.idEmp}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>
      <div id="action">
        <button class="btn Fix__btn" type="button" data-id-emp="${user.idEmp}">Sửa thông tin</button>
        <button class="btn Xem" type="button" data-id-emp="${user.idEmp}">Xem chi tiết</button>
      </div>
    </td>
    `;
    userList.appendChild(tr);
  });
}

userList.addEventListener("click", (e) => {
  let btn = e.target.closest(".btn");
  if(!btn) return;

  let idEmp = btn.dataset.idEmp;

  if(btn.classList.contains("Fix__btn")){
    console.log("fix");
    update__modal(idEmp);
  }
  if(btn.classList.contains("Xem")){
    console.log("xem");
    modal__view(idEmp);
  }
})

window.addEventListener("load", () => {
  refresh__allEmployeesFilter(Employees);
});

function Search() {
  let keyword = Form__hsnv.querySelector("#search").value.toLowerCase().trim();

  if (keyword == "") {
    refresh__allEmployeesFilter(Employees);
  } else {
    const result = allEmployees.filter(
      (user) =>
        user.idEmp.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) && user.idAcc === idAcc
    );
    display(result);
  }
}

Form__hsnv.querySelector("#search").addEventListener("input", Search);
Form__hsnv.querySelector("#search__btn").addEventListener("click",Search);
Form__fixnv = document.getElementById("modal__fix");

function update__modal(idEmp) {
  Form__fixnv.dataset.idEmp = idEmp;
  let indexDB = allEmployees.findIndex((emp) => emp.idEmp === idEmp && emp.idAcc === idAcc);

  Form__fixnv.querySelector("#htFix").value = allEmployees[indexDB].username;
  Form__fixnv.querySelector("#eFix").value = allEmployees[indexDB].email;
  Form__fixnv.querySelector("#cvFix").value = allEmployees[indexDB].cv;
  Form__fixnv.querySelector("#departmentsFix").value =
    allEmployees[indexDB].Departments;
  Form__fixnv.querySelector("#phone__numberFix").value = allEmployees[indexDB].SDT;
  Form__fixnv.querySelector("#addressFix").value = allEmployees[indexDB].Address;

  Form__fixnv.classList.remove("hidden");
  Form__fixnv.classList.add("flex");
}

function update(e) {
  e.preventDefault();
  let idEmp = Form__fixnv.dataset.idEmp;
  let indexDB = allEmployees.findIndex((emp) => emp.idEmp === idEmp && emp.idAcc === idAcc);

  let usernameFix = Form__fixnv.querySelector("#htFix").value;
  let emailFix = Form__fixnv.querySelector("#eFix").value;
  let cvFix = Form__fixnv.querySelector("#cvFix").value;
  let DepartmentsFix = Form__fixnv.querySelector("#departmentsFix").value;
  let sdtFix = Form__fixnv.querySelector("#phone__numberFix").value;
  let addressFix = Form__fixnv.querySelector("#addressFix").value;

  if (
    usernameFix == "" ||
    emailFix == "" ||
    cvFix == "" ||
    DepartmentsFix == "" ||
    addressFix == "" ||
    sdtFix == ""
  ) {
    alert("Vui lòng nhập đầy đủ dữ liệu");
  } else {
    allEmployees[indexDB].username = usernameFix;
    allEmployees[indexDB].email = emailFix;
    allEmployees[indexDB].cv = cvFix;
    allEmployees[indexDB].Departments = DepartmentsFix;
    allEmployees[indexDB].SDT = sdtFix;
    allEmployees[indexDB].Address = addressFix;
    refresh__allEmployeesFilter(Employees);
    localStorage.setItem("employees",JSON.stringify(allEmployees));

    document.getElementById("modal__fix").classList.add("hidden");
    document.getElementById("modal__fix").classList.remove("flex");
  }
}

Form__fixnv.querySelector("#form__fix").addEventListener("submit", update);// sự kiện submit là của form chứ không phải của button, button ko có sự kiện submit

function close__fix__btn() {
  document.getElementById("modal__fix").classList.add("hidden");
  document.getElementById("modal__fix").classList.remove("flex");
}

function modal__view(idEmp){
  let indexDB = allEmployees.findIndex((emp) => emp.idEmp === idEmp && emp.idAcc === idAcc);

  document.querySelector("#view_manv").value = allEmployees[indexDB].idEmp;
  document.querySelector("#view_username").value = allEmployees[indexDB].username;
  document.querySelector("#view_email").value = allEmployees[indexDB].email;
  document.querySelector("#view_cv").value = allEmployees[indexDB].cv;
  document.querySelector("#view_departments").value =
    allEmployees[indexDB].Departments;
  document.querySelector("#view_phone").value = allEmployees[indexDB].SDT;
  document.querySelector("#view_address").value = allEmployees[indexDB].Address;

  document.getElementById("modal__view").classList.remove("hidden");
  document.getElementById("modal__view").classList.add("flex");
}

function close__view() {
  document.getElementById("modal__view").classList.add("hidden");
  document.getElementById("modal__view").classList.remove("flex");
}