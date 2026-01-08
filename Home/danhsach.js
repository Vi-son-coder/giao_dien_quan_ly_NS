//Các nút và form lấy thông tin của nhân viên----------------------------
function themns() {
  document.getElementById("new").classList.add("hidden");
  document.getElementById("form__newNV").classList.remove("hidden"); //clastList: dùng để kiểm soát điều khiển các class
}
let idAcc = localStorage.getItem("idUser");

let allEmployees = JSON.parse(localStorage.getItem("employees")) || [];

if(!localStorage.getItem("employees")){
  localStorage.setItem("employees",JSON.stringify(allEmployees));
}

let Employees = allEmployees.filter((user) => user.idAcc === idAcc);

function refresh__allEmployeesFilter(Employees){
  Employees = allEmployees.filter((user) => user.idAcc === idAcc);
  display(Employees);
}

const form__newNV = document.getElementById("form__newNV"); //gọi Element form__newNV
const userList = document.getElementById("list"); // gọi list
// let employees = JSON.parse(localStorage.getItem("employees")) || []; // lấy employees cũ hoặc tạo rỗng
//JSON.parse: chuyển đổi kiểu dữ liệu từ  chuỗi sang object/bảng
//JSON.stringify: đổi kiểu dữ liệu từ object/bảng sang chuỗi
//localStorage: chỉ lưu dữ liệu kiểu string

function cancel() {
  document.getElementById("new").classList.remove("hidden");
  form__newNV.classList.add("hidden");
  form__newNV.reset();
}
form__newNV.querySelector("#cancel").addEventListener("click", cancel);

//sử dụng Default Parameter: display(Data = employees): là giá trị mặc định nếu không truyền tham số vào khi gọi hàm display
function display(Employees) {
  userList.innerHTML = "";
  // cú pháp element.forEach(function(element,index,array){}); là phương thức của array
  Employees.forEach((user) => {
    const tr = document.createElement("tr"); //createElement("tr"): phương thức tạo phần tử của DOM
    // tr.dataset.index = index; //dùng để lưu index vào tr
    //element.dataset.index: là thuộc tính(dataset: thuộc tính của DOM element, chứa thuộc tính data-*)(index là thuộc tính của dataset tương đương data-index)
    tr.innerHTML = `
    <td>${user.idEmp}</td> 
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>
        <div class="action">
          <button type="button" class="Delete-btn" id="delete__btn" data-id-emp="${user.idEmp}">Xóa</button>
        </div>
      </td>`; // ký hiệu $: là dấu hiệu nói với JS: “chỗ này là code, không phải chữ thường”, để chiền biến/biểu thức
    userList.appendChild(tr); //appendChild(): thêm con vào cuối của cha
  });
}
userList.addEventListener("click",(e) => {
  let btn = e.target.closest(".Delete-btn");
  if(!btn) return;

  let idEmp = btn.dataset.idEmp;
  alert_delete(idEmp);
})
// tìm kiếm
const seachInput = document.getElementById("search");
  
function TimKiem(){
    const keyword = seachInput.value.toLowerCase().trim();
    if(keyword == ""){
      refresh__allEmployeesFilter(Employees);
      return;
    }
    else{
      refresh__allEmployeesFilter(Employees);
      const result = Employees.filter(user => 
      user.username.toLowerCase().includes(keyword) || user.idEmp.toLowerCase().includes(keyword) && user.idAcc === idAcc//sử dụng hàm includes(): để tìm chuỗi con trong chuỗi cha
    );
    display(result);
    }
}

  seachInput.addEventListener("input",TimKiem);// khi dùng kiểu này thì chạy trên trình duyệt hàm TimKiem() sẽ được trình duyệt tự động thêm tham số event nên hàm nào mà có tham số sẵn sẽ bị lỗi

  document.getElementById("search__btn").addEventListener("click",TimKiem)

function addUser(e) {
  //hàm xử lý submit để gửi dữ liệu
  e.preventDefault(); // ngăn submit reload
  const idEmp = form__newNV.querySelector("#manv").value.trim();
  const username = form__newNV.querySelector("#ht").value.trim();
  const email = form__newNV.querySelector("#e").value.trim();
  const cv = form__newNV.querySelector("#cv").value.trim();
  const Departments = form__newNV.querySelector("#departments").value.trim();
  const SDT = form__newNV.querySelector("#phone__number").value.trim();
  const Address = form__newNV.querySelector("#address").value.trim();
  let idDepart = "";
  let testId = allEmployees.find((emp) => emp.idEmp === idEmp && emp.idAcc === idAcc);
  if(testId){
    alert("Trùng id");
    return;
  }
  if (idEmp == "" || username == "" || email == "" || cv == "" || Departments == "" || SDT == "" || Address == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  allEmployees.push({ idEmp, username, email, cv, Departments, SDT, Address, idDepart, idAcc }); //add dữ vào biến employees
  localStorage.setItem("employees", JSON.stringify(allEmployees));

  refresh__allEmployeesFilter(Employees);

  form__newNV.reset(); //làm trống lại form nhập để nhập tiếp
  refresh__allEmployeesFilter(Employees);
  document.getElementById("new").classList.remove("hidden");
  form__newNV.classList.add("hidden");
}

form__newNV.addEventListener("submit", addUser); // lắng nghe sự kiện submit thì gọi hàm addUser

window.addEventListener("load", () => {
  refresh__allEmployeesFilter(Employees);
}); // ấn reload chạy hàm display

// bảng thông báo xác nhận xóa-------------------------------------------
function alert_delete(idEmp) {
  // rememberRow = btn.closest("tr"); closest: là 1 method(phương thức) của DOM Element dùng để tìm phần tử cha(selector) gần nhất, cú pháp: Element.closest(selector_cha)
  document.getElementById("alert_delete").classList.remove("hidden");
  document.getElementById("alert_delete").classList.add("flex");

  document.getElementById("alert_delete").dataset.idEmp = idEmp;
}

function Delete() {
  const idEmp = document.getElementById("alert_delete").dataset.idEmp; 
  let indexDB = allEmployees.findIndex((user) => user.idAcc === idAcc && user.idEmp === idEmp);
  allEmployees.splice(indexDB, 1);

  localStorage.setItem("employees",JSON.stringify(allEmployees));

  refresh__allEmployeesFilter(Employees);
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

document.getElementById("Delete").addEventListener("click", Delete);

function close__delete__btn() {
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}