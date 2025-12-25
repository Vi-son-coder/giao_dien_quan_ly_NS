const Departments = JSON.parse(localStorage.getItem("departments")) || [];

let rememberRow = null;

let params = new URLSearchParams(window.location.search); //URLSearchParams: xử lý chuỗi dữ liệu sau dấu ? để lấy dữ liệu
// window.location.search: lấy chuỗi dữ liệu nằm trên URL
let userList__Add = document.getElementById("listAdd");

const employees = JSON.parse(localStorage.getItem("employees")) || [];

let rememberRow__Add = null;

let maDepart = params.get("maDepart");

let department = Departments.find((d) => d.maDepart === maDepart);
if (!department) {
  alert("Không tìm thấy phòng ban");
}

document.getElementById("close").addEventListener("click", () => {
  window.location.href = `departments.html`;
});

document.querySelector(
  ".table h1"
).innerHTML = `Danh sách phòng ${department.nameDepart}`;

let userList = document.getElementById("list");

function display(Data = department.employees) {
  userList.innerHTML = "";
  Data.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${user.manv}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
        <div class="action">
          <button type="button" class="Delete-btn" id="delete__btn">Xóa</button>
        </div>
        </td>
        `;
    userList.appendChild(tr); //appendChild(): thêm con vào cuối của cha
    tr.querySelector("#delete__btn").addEventListener("click", function () {
      rememberRow = tr;
      alert_delete(this);
    });
  });
}

function display__add(Data = employees) {
  userList__Add.innerHTML = "";
  // cú pháp element.forEach(function(element,index,array){}); là phương thức của array
  Data.forEach((user, index) => {
    const tr = document.createElement("tr"); //createElement("tr"): phương thức tạo phần tử của DOM
    tr.dataset.index = index; //dùng để lưu index vào tr
    //element.dataset.index: là thuộc tính(dataset: thuộc tính của DOM element, chứa thuộc tính data-*)(index là thuộc tính của dataset tương đương data-index)
    tr.innerHTML = `
    <td>${user.manv}</td> 
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>
        <div class="action">
          <button type="button" class="Add__btn">Thêm</button>
        </div>
      </td>`; // ký hiệu $: là dấu hiệu nói với JS: “chỗ này là code, không phải chữ thường”, để chiền biến/biểu thức
    userList__Add.appendChild(tr); //appendChild(): thêm con vào cuối của cha
    tr.querySelector(".Add__btn").addEventListener("click", function () {
      rememberRow__Add = tr;
      AddUserInDepart(this);
    });
  });
}

function themns() {
  document.getElementById("modal__add").classList.remove("hidden");
  document.getElementById("modal__add").classList.add("flex");
  display__add(employees);
}
function close__Add__btn() {
  document.getElementById("modal__add").classList.add("hidden");
  document.getElementById("modal__add").classList.remove("flex");
}

function AddUserInDepart(e) {
  let index = rememberRow__Add.dataset.index;
  let isExist = department.employees.find(
    (user) => user.manv == employees[index].manv
  );
  if (isExist) {
    alert("Nhân viên đã được thêm");
    return;
  } else {
    department.employees.push(employees[index]);
  }

  localStorage.setItem("departments", JSON.stringify(Departments));
  display(department.employees);
}
window.addEventListener("load", () => {
  display(department.employees);
});

function TimKiem() {
  const keyword = document.getElementById("search").value.toLowerCase().trim();
  if (keyword == "") {
    display(department.employees);
    return;
  } else {
    const result = department.employees.filter(
      (user) =>
        user.manv.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) //sử dụng hàm includes(): để tìm chuỗi con trong chuỗi cha
    );
    display(result);
  }
}
document.getElementById("search").addEventListener("input", TimKiem);
document.getElementById("search__btn").addEventListener("click", TimKiem);

// bảng thông báo xác nhận xóa-------------------------------------------
function alert_delete() {
  // rememberRow = btn.closest("tr"); closest: là 1 method(phương thức) của DOM Element dùng để tìm phần tử cha(selector) gần nhất, cú pháp: Element.closest(selector_cha)
  document.getElementById("alert_delete").classList.remove("hidden");
  document.getElementById("alert_delete").classList.add("flex");
}

function Delete() {
  const index = rememberRow.dataset.index; //section(khối/phần của bảng như là "thead"...): là vị trí index của tr chỉ đếm trong section chứa nó
  //rowIndex: đếm toàn bộ table
  department.employees.splice(index, 1);
  localStorage.setItem("departments", JSON.stringify(Departments));
  rememberRow = null;
  display(department.employees);
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

document.getElementById("Delete").addEventListener("click", Delete);

function close__delete__btn() {
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}
