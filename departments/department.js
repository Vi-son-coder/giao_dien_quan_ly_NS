const allDepartments = JSON.parse(localStorage.getItem("departments")) || []; //lấy tất cả departments của các tất cả các acc

// Câu chốt CUỐI (rất quan trọng)
// Email chỉ dùng làm key ở “object tổng” để chia account
// Object con (emp, depart) là thực thể → KHÔNG dùng email

const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];

const idAcc = localStorage.getItem("idUser");

let Departments = allDepartments.filter((user) => user.idAcc === idAcc);

const departmentsList = document.getElementById("list");

const formAdd__departments = document.getElementById("form__departments");

function add__btn() {
  document.getElementById("modal__add").classList.remove("hidden");
  document.getElementById("modal__add").classList.add("flex");
}
document.querySelector("#add__btn").addEventListener("click", add__btn);

function close__add__btn() {
  document.getElementById("modal__add").classList.add("hidden");
  document.getElementById("modal__add").classList.remove("flex");
}
function addDepartments(e) {
  e.preventDefault();
  let idDepart = formAdd__departments.querySelector("#code__departments").value;
  let nameDepart = formAdd__departments.querySelector("#nameDepartments").value;
  let testId = allDepartments.find((d) => d.idEmp === idEmp && d.idAcc === idAcc);
  if(testId){
    alert("Trùng id");
  }
  if (idDepart == "" || nameDepart == "") {
    alert("Vui lòng nhập thông tin!");
    return;
  } else {
    allDepartments.push({ idDepart, nameDepart, idAcc });
    localStorage.setItem("departments", JSON.stringify(allDepartments));
  }
  Departments = allDepartments.filter((user) => user.idAcc === idAcc);
  display(Departments);
  document.getElementById("modal__add").classList.add("hidden");
  document.getElementById("modal__add").classList.remove("flex");
  formAdd__departments.reset();
}

function display(Departments) {
  departmentsList.innerHTML = "";
  Departments.forEach((d,index) => {
    const tr = document.createElement("tr");
    let dem = 0;
    let Employees = allEmployees.filter(
      (emp) => emp.idAcc === idAcc && emp.idDepart === d.idDepart
    );
    Employees.forEach(() => dem++);
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${d.idDepart}</td>
        <td>${d.nameDepart}</td>
        <td>${dem}</td>
        <td>
            <button class="btn  view" data-id-depart="${d.idDepart}">Xem</button>
            <button class="btn edit" data-id-depart="${d.idDepart}">Sửa</button>
            <button class="btn delete" data-id-depart="${d.idDepart}">Xóa</button>
        </td>
        `;
    departmentsList.appendChild(tr);
  });
}
// sử dụng Event delegation(đoàn sự kiện): để tập trung xử lý sự kiện của 1 khối
departmentsList.addEventListener("click",(d) => {

  //dùng target: phần tử đang được click vào kết hợp với closest để lấy phần tử
  let btn = d.target.closest(".btn");
  if(!btn) return;
  let idDepart = btn.dataset.idDepart;

  //comtains(): hàm kiểm tra xem trong có chứa không != includes(): kiểm tra xem có chuỗi ký tự con hay không
  if(btn.classList.contains("view")){
    localStorage.setItem("idDepart",idDepart);
      window.location.href = `employeesDPM.html`; //?maDepart=${maDepart}`; Tạo 1 liên kết chứa dữ liệu khi click vào(Dữ liệu là phần nằm sau dấu ? )
  }

  if(btn.classList.contains("edit")){
    fix__modal(idDepart);
  }

  if(btn.classList.contains("delete")){
    alert_delete(idDepart);
  }
})

document
  .getElementById("form__departments")
  .addEventListener("submit", addDepartments);

function Search() {
  let keyword = document.querySelector("#search").value.toLowerCase().trim();

  if (keyword == "") {
    display(Departments);
  } else {
    const result = Departments.filter(
      (user) =>
        user.idDepart.toLowerCase().includes(keyword) ||
        user.nameDepart.toLowerCase().includes(keyword) && user.idAcc === idAcc
    );
    display(result);
  }
}

document.querySelector(".actions input").addEventListener("input", Search);

window.addEventListener("load", () => {
  display(Departments);
});

function alert_delete(idDepart) {
  // rememberRow = btn.closest("tr"); closest: là 1 method(phương thức) của DOM Element dùng để tìm phần tử cha(selector) gần nhất, cú pháp: Element.closest(selector_cha)
  document.getElementById("alert_delete").classList.remove("hidden");
  document.getElementById("alert_delete").classList.add("flex");
  document.getElementById("alert_delete").dataset.idDepart = idDepart;
}

function Delete() {
  let idDepart = document.getElementById("alert_delete").dataset.idDepart;
  let indexDB = allDepartments.findIndex(
    (d) => d.idAcc === idAcc && d.idDepart === idDepart
  ); //tìm index trực tiếp trên data base chứ ko dùng index của view

  if (indexDB !== -1) {
    allDepartments.splice(indexDB, 1);
    localStorage.setItem("departments", JSON.stringify(allDepartments));
  }
  Departments = allDepartments.filter((user) => user.idAcc === idAcc);
  display(Departments);

  localStorage.removeItem("idDepart");

  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

document.getElementById("Delete").addEventListener("click", Delete);

function close__delete__btn() {
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

function fix__modal(idDepart) {
  document.getElementById("modal__fix").classList.remove("hidden");
  document.getElementById("modal__fix").classList.add("flex");

  let indexDB = allDepartments.findIndex(
    (d) => d.idAcc === idAcc && d.idDepart === idDepart
  );

  document.getElementById("code__departments__Fix").value =
    allDepartments[indexDB].idDepart;
  document.getElementById("nameDepartments__Fix").value =
    allDepartments[indexDB].nameDepart;
  // Lưu tạm data của idDepart vào modal của html
  document.getElementById("modal__fix").dataset.idDepart = idDepart;
  //sẽ thành  = <div id="modal__fix" data-id-depart="PB01"></div>
  //  Cái gì sống cùng UI → gắn vào UI (dataset)
  //  Cái gì sống lâu → localStorage / DB
}

function Fix__Departments(e) {
  let idDepart = document.getElementById("modal__fix").dataset.idDepart;

  let indexDB = allDepartments.findIndex(
    (d) => d.idAcc === idAcc && d.idDepart === idDepart
  );

  e.preventDefault();
  let idDepartFix = document.getElementById("code__departments__Fix").value;
  let nameDepartFix = document.getElementById("nameDepartments__Fix").value;
  if (idDepartFix == "" || nameDepartFix == "") {
    alert("Vui lòng nhập thông tin");
  } else {
    if (indexDB !== -1) {
      allDepartments[indexDB].idDepart = idDepartFix;
      allDepartments[indexDB].nameDepart = nameDepartFix;
      localStorage.setItem("departments", JSON.stringify(allDepartments));
      document.getElementById("modal__fix").classList.add("hidden");
      document.getElementById("modal__fix").classList.remove("flex");
      Departments = allDepartments.filter((d) => d.idAcc === idAcc);
      display(Departments);
      localStorage.removeItem("idDepart");
    }
  }
}
function close__fix__btn() {
  document.getElementById("modal__fix").classList.add("hidden");
  document.getElementById("modal__fix").classList.remove("flex");
}
document
  .getElementById("form__departmentsFix")
  .addEventListener("submit", Fix__Departments);
