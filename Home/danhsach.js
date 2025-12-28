//Các nút và form lấy thông tin của nhân viên----------------------------
function themns() {
  document.getElementById("new").classList.add("hidden");
  document.getElementById("form__newNV").classList.remove("hidden"); //clastList: dùng để kiểm soát điều khiển các class
}

let account = getCurrentAccount();

let employees = account.employees;

let rememberRow = null;
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
function display(Data = employees) {
  userList.innerHTML = "";
  // cú pháp element.forEach(function(element,index,array){}); là phương thức của array
  Data.forEach((user,index) => {
    const tr = document.createElement("tr"); //createElement("tr"): phương thức tạo phần tử của DOM
    tr.dataset.index = index; //dùng để lưu index vào tr
    //element.dataset.index: là thuộc tính(dataset: thuộc tính của DOM element, chứa thuộc tính data-*)(index là thuộc tính của dataset tương đương data-index)
    tr.innerHTML = `
    <td>${user.manv}</td> 
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>
        <div class="action">
          <button type="button" class="Delete-btn" id="delete__btn">Xóa</button>
        </div>
      </td>`; // ký hiệu $: là dấu hiệu nói với JS: “chỗ này là code, không phải chữ thường”, để chiền biến/biểu thức
    userList.appendChild(tr); //appendChild(): thêm con vào cuối của cha
    tr.querySelector("#delete__btn").addEventListener("click", function () {
      rememberRow = tr;
      alert_delete(this);
    });
  });
}
// tìm kiếm
const seachInput = document.getElementById("search");
  
function TimKiem(){
    const keyword = seachInput.value.toLowerCase().trim();
    if(keyword == ""){
      display(employees);
      return;
    }
    else{
      const result = employees.filter(user => 
      user.username.toLowerCase().includes(keyword) || user.manv.toLowerCase().includes(keyword) //sử dụng hàm includes(): để tìm chuỗi con trong chuỗi cha
    );
    display(result);
    }
}

  seachInput.addEventListener("input",TimKiem);// khi dùng kiểu này thì chạy trên trình duyệt hàm TimKiem() sẽ được trình duyệt tự động thêm tham số event nên hàm nào mà có tham số sẵn sẽ bị lỗi

  document.getElementById("search__btn").addEventListener("click",TimKiem)

function addUser(e) {
  //hàm xử lý submit để gửi dữ liệu
  e.preventDefault(); // ngăn submit reload
  const manv = form__newNV.querySelector("#manv").value.trim();
  const username = form__newNV.querySelector("#ht").value.trim();
  const email = form__newNV.querySelector("#e").value.trim();
  const cv = form__newNV.querySelector("#cv").value.trim();
  const Departments = form__newNV.querySelector("#departments").value.trim();
  const SDT = form__newNV.querySelector("#phone__number").value.trim();
  const Address = form__newNV.querySelector("#address").value.trim();
  if (manv == "" || username == "" || email == "" || cv == "" || Departments == "" || SDT == "" || Address == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  employees.push({ manv, username, email, cv, Departments, SDT, Address}); //add dữ vào biến employees
  saveAccount(Employees);

  form__newNV.reset(); //làm trống lại form nhập để nhập tiếp
  display(employees);
  document.getElementById("new").classList.remove("hidden");
  form__newNV.classList.add("hidden");
}

form__newNV.addEventListener("submit", addUser); // lắng nghe sự kiện submit thì gọi hàm addUser

window.addEventListener("load", () => {
  display(employees);
}); // ấn reload chạy hàm display

// bảng thông báo xác nhận xóa-------------------------------------------
function alert_delete() {
  // rememberRow = btn.closest("tr"); closest: là 1 method(phương thức) của DOM Element dùng để tìm phần tử cha(selector) gần nhất, cú pháp: Element.closest(selector_cha)
  document.getElementById("alert_delete").classList.remove("hidden");
  document.getElementById("alert_delete").classList.add("flex");
}

function Delete() {
  const index = rememberRow.dataset.index; //section(khối/phần của bảng như là "thead"...): là vị trí index của tr chỉ đếm trong section chứa nó
  //rowIndex: đếm toàn bộ table
  employees.splice(index, 1);
  saveAccount(Employees);
  rememberRow = null;
  display(employees);
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}

document.getElementById("Delete").addEventListener("click", Delete);

function close__delete__btn() {
  document.getElementById("alert_delete").classList.add("hidden");
  document.getElementById("alert_delete").classList.remove("flex");
}