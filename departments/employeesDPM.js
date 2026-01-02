let allEmployees = JSON.parse(localStorage.getItem("employees"));

let userList__Add = document.getElementById("listAdd");

let idAcc = localStorage.getItem("idUser");

let idDepart = localStorage.getItem("idDepart");

function getEmployeesDPM() {
  return allEmployees.filter(
    (emp) => emp.idAcc === idAcc && emp.idDepart === idDepart
  );
}
// các dữ liệu dẫn xuất (derived data) không để làm biến global vd:Employees = allEmployees.filter(...) tránh bug ngầm
function getEmployees() {
  return allEmployees.filter((emp) => emp.idAcc === idAcc);
}

let allDepartments = JSON.parse(localStorage.getItem("departments"));

let Departments = allDepartments.find((d) => d.idDepart === idDepart);
if (!Departments) {
  alert("Không tìm thấy phòng ban");
}

document.getElementById("close").addEventListener("click", () => {
  window.location.href = `departments.html`;
});

document.querySelector(
  ".table h1"
).innerHTML = `Danh sách phòng ${Departments.nameDepart}`;

let userList = document.getElementById("list");

function display(EmployeesDPM) {
  userList.innerHTML = "";
  EmployeesDPM.forEach((emp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${emp.idEmp}</td>
        <td>${emp.username}</td>
        <td>${emp.email}</td>
        <td>
        <div class="action">
          <button type="button" class="Delete-btn" id="delete__btn">Xóa</button>
        </div>
        </td>
        `;
    userList.appendChild(tr); //appendChild(): thêm con vào cuối của cha
    tr.querySelector("#delete__btn").addEventListener("click", function () {
      alert_delete(emp.idEmp);
    });
  });
}

function display__add(Employees) {
  userList__Add.innerHTML = "";
  // cú pháp element.forEach(function(element,index,array){}); là phương thức của array
  Employees.forEach((emp) => {
    const tr = document.createElement("tr"); //createElement("tr"): phương thức tạo phần tử của DOM
    // tr.dataset.index = index; //dùng để lưu index vào tr
    //element.dataset.index: là thuộc tính(dataset: thuộc tính của DOM element, chứa thuộc tính data-*)(index là thuộc tính của dataset tương đương data-index)
    tr.innerHTML = `
    <td>${emp.idEmp}</td> 
    <td>${emp.username}</td>
    <td>${emp.email}</td>
    <td>
        <div class="action">
          <button type="button" class="Add__btn">Thêm</button>
        </div>
      </td>`; // ký hiệu $: là dấu hiệu nói với JS: “chỗ này là code, không phải chữ thường”, để chiền biến/biểu thức
    userList__Add.appendChild(tr); //appendChild(): thêm con vào cuối của cha
    tr.querySelector(".Add__btn").addEventListener("click", function () {
      AddUserInDepart(emp.idEmp);
    });
  });
}

function themns() {
  document.getElementById("modal__add").classList.remove("hidden");
  document.getElementById("modal__add").classList.add("flex");
  display__add(getEmployees());
}
function close__Add__btn() {
  document.getElementById("modal__add").classList.add("hidden");
  document.getElementById("modal__add").classList.remove("flex");
}

function AddUserInDepart(idEmp) {
  let indexDB = allEmployees.findIndex(
    (emp) => emp.idEmp === idEmp && emp.idAcc === idAcc
  );
  if(indexDB == -1){
    alert("Không tìm thấy nhân viên");
  }
  let isExist = getEmployees().find(
    (emp) =>
      emp.idEmp === idEmp &&
      emp.idAcc === idAcc &&
      emp.idDepart === idDepart
  );
  if (isExist) {
    alert("Nhân viên đã được thêm");
    return;
  } else {
    allEmployees[indexDB].idDepart = idDepart;
  }
  localStorage.setItem("employees", JSON.stringify(allEmployees));
  display(getEmployeesDPM());
}
window.addEventListener("load", () => {
  display(getEmployeesDPM());
});

function TimKiem() {
  const keyword = document.getElementById("search").value.toLowerCase().trim();
  if (keyword == "") {
    display(getEmployeesDPM());
    return;
  } else {
    const result = getEmployeesDPM().filter(
      (user) =>
        user.idEmp.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) //sử dụng hàm includes(): để tìm chuỗi con trong chuỗi cha
    );
    display(result);
  }
}
document.getElementById("search").addEventListener("input", TimKiem);
document.getElementById("search__btn").addEventListener("click", TimKiem);

// bảng thông báo xác nhận xóa-------------------------------------------
function alert_delete(idEmp) {
  // rememberRow = btn.closest("tr"); closest: là 1 method(phương thức) của DOM Element dùng để tìm phần tử cha(selector) gần nhất, cú pháp: Element.closest(selector_cha)
  document.getElementById("alert_delete").classList.remove("hidden");
  document.getElementById("alert_delete").classList.add("flex");
  document.getElementById("alert_delete").dataset.idEmp = idEmp;
}

function Delete(idEmp) {
  // const index = rememberRow.dataset.index; //section(khối/phần của bảng như là "thead"...): là vị trí index của tr chỉ đếm trong section chứa nó
  //rowIndex: đếm toàn bộ table
  idEmp = document.getElementById("alert_delete").dataset.idEmp;

  let indexDB = allEmployees.findIndex(
    (emp) =>
      emp.idAcc === idAcc && emp.idEmp === idEmp && emp.idDepart === idDepart
  );
  if(indexDB == -1){
    alert("Xóa không thành công");
  }
  allEmployees[indexDB].idDepart = "";
  localStorage.setItem("employees", JSON.stringify(allEmployees));

  display(getEmployeesDPM());
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

document.getElementById("Delete").addEventListener("click", Delete);

function close__delete__btn() {
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}
