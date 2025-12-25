const Departments = JSON.parse(localStorage.getItem("departments")) || [];

const departmentsList = document.getElementById("list");

let rememberRow = null;

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
  let maDepart = formAdd__departments.querySelector("#code__departments").value;
  let nameDepart = formAdd__departments.querySelector("#nameDepartments").value;
  if (maDepart == "" || nameDepart == "") {
    alert("Vui lòng nhập thông tin!");
    return;
  } else {
    let employees = [];
    Departments.push({ maDepart, nameDepart, employees });
    localStorage.setItem("departments", JSON.stringify(Departments));
  }
  display(Departments);
  document.getElementById("modal__add").classList.add("hidden");
  document.getElementById("modal__add").classList.remove("flex");
  formAdd__departments.reset();
}

function display(Data = Departments) {
  departmentsList.innerHTML = "";
  Data.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.dataset.index = index;
    let dem = 0;
    user.employees.forEach(() => dem++);
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.maDepart}</td>
        <td>${user.nameDepart}</td>
        <td>${dem}</td>
        <td>
            <button class="btn  view">Xem</button>
            <button class="btn edit">Sửa</button>
            <button class="btn delete">Xóa</button>
        </td>
        `;
    departmentsList.appendChild(tr);

    tr.querySelector(".btn.view").addEventListener("click", () => {
      rememberRow = tr;
      let maDepart = user.maDepart;
      window.location.href = `employeesDPM.html?maDepart=${maDepart}`; //Tạo 1 liên kết chứa dữ liệu
    });
    tr.querySelector(".btn.edit").addEventListener("click", () => {
      rememberRow = tr;
    });
    tr.querySelector(".btn.delete").addEventListener("click", () => {
      rememberRow = tr;
      alert_delete();
    });
  });
}

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
        user.maDepart.toLowerCase().includes(keyword) ||
        user.nameDepart.toLowerCase().includes(keyword)
    );
    display(result);
  }
}

document.querySelector(".actions input").addEventListener("input",Search);

window.addEventListener("load", () => {
  display(Departments);
});

function alert_delete() {
  // rememberRow = btn.closest("tr"); closest: là 1 method(phương thức) của DOM Element dùng để tìm phần tử cha(selector) gần nhất, cú pháp: Element.closest(selector_cha)
  document.getElementById("alert_delete").classList.remove("hidden");
  document.getElementById("alert_delete").classList.add("flex");
}

function Delete() {
  const index = rememberRow.dataset.index; //section(khối/phần của bảng như là "thead"...): là vị trí index của tr chỉ đếm trong section chứa nó
  //rowIndex: đếm toàn bộ table
  Departments.splice(index, 1);
  localStorage.setItem("departments", JSON.stringify(Departments));
  rememberRow = null;
  display(Departments);
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

document.getElementById("Delete").addEventListener("click", Delete);

function close__delete__btn() {
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}
