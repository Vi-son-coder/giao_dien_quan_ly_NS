let account = getCurrentAccount();
let employees = account.employees;
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
        <button id="Fix__btn" type="button">Sửa thông tin</button>
        <button id="Xem" type="button">Xem chi tiết</button>
      </div>
    </td>
    `;
    userList.appendChild(tr);
    tr.querySelector("#Fix__btn").addEventListener("click", () => {
      rememberRow = tr;
      update__modal();
    });
    tr.querySelector("#Xem").addEventListener("click", () => {
      rememberRow = tr;
      modal__view();
    });
  });
}

window.addEventListener("load", () => {
  display(employees);
});

function Search() {
  let keyword = Form__hsnv.querySelector("#search").value.toLowerCase().trim();

  if (keyword == "") {
    display(employees);
  } else {
    const result = employees.filter(
      (user) =>
        user.manv.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword)
    );
    display(result);
  }
}

Form__hsnv.querySelector("#search").addEventListener("input", Search);
Form__hsnv.querySelector("#search__btn").addEventListener("click",Search);
Form__fixnv = document.getElementById("modal__fix");

function update__modal() {
  let index = rememberRow.dataset.index;
  Form__fixnv.querySelector("#manvFix").value = employees[index].manv;
  Form__fixnv.querySelector("#htFix").value = employees[index].username;
  Form__fixnv.querySelector("#eFix").value = employees[index].email;
  Form__fixnv.querySelector("#cvFix").value = employees[index].cv;
  Form__fixnv.querySelector("#departmentsFix").value =
    employees[index].Departments;
  Form__fixnv.querySelector("#phone__numberFix").value = employees[index].SDT;
  Form__fixnv.querySelector("#addressFix").value = employees[index].Address;

  Form__fixnv.classList.remove("hidden");
  Form__fixnv.classList.add("flex");
}

function update(e) {
  e.preventDefault();
  index = rememberRow.dataset.index;
  let manvFix = Form__fixnv.querySelector("#manvFix").value;
  let usernameFix = Form__fixnv.querySelector("#htFix").value;
  let emailFix = Form__fixnv.querySelector("#eFix").value;
  let cvFix = Form__fixnv.querySelector("#cvFix").value;
  let DepartmentsFix = Form__fixnv.querySelector("#departmentsFix").value;
  let sdtFix = Form__fixnv.querySelector("#phone__numberFix").value;
  let addressFix = Form__fixnv.querySelector("#addressFix").value;

  if (
    manvFix == "" ||
    usernameFix == "" ||
    emailFix == "" ||
    cvFix == "" ||
    DepartmentsFix == "" ||
    addressFix == "" ||
    sdtFix == ""
  ) {
    alert("Vui lòng nhập đầy đủ dữ liệu");
  } else {
    employees[index].manv = manvFix;
    employees[index].username = usernameFix;
    employees[index].email = emailFix;
    employees[index].cv = cvFix;
    employees[index].Departments = DepartmentsFix;
    employees[index].SDT = sdtFix;
    employees[index].Address = addressFix;
    display(employees);
    saveAccount(account);
    document.getElementById("modal__fix").classList.add("hidden");
    document.getElementById("modal__fix").classList.remove("flex");
  }
}

Form__fixnv.querySelector("#form__fix").addEventListener("submit", update);// sự kiện submit là của form chứ không phải của button, button ko có sự kiện submit

function close__fix__btn() {
  document.getElementById("modal__fix").classList.add("hidden");
  document.getElementById("modal__fix").classList.remove("flex");
}

function modal__view(){
   let index = rememberRow.dataset.index;
  document.querySelector("#view_manv").value = employees[index].manv;
  document.querySelector("#view_username").value = employees[index].username;
  document.querySelector("#view_email").value = employees[index].email;
  document.querySelector("#view_cv").value = employees[index].cv;
  document.querySelector("#view_departments").value =
    employees[index].Departments;
  document.querySelector("#view_phone").value = employees[index].SDT;
  document.querySelector("#view_address").value = employees[index].Address;

  document.getElementById("modal__view").classList.remove("hidden");
  document.getElementById("modal__view").classList.add("flex");
}

function close__view() {
  document.getElementById("modal__view").classList.add("hidden");
  document.getElementById("modal__view").classList.remove("flex");
}