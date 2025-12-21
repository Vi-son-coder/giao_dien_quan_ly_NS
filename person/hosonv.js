
let employees = JSON.parse(localStorage.getItem("employees")) || [];
function Search() {
  const keyword = document.getElementById("seach").value.trim().toLowerCase();
  const result = employees.filter(user => {
    user.username.toLowerCase().includes(keyword);
  }); 
  // includes: dùng để tìm chuỗi con trong chuỗi cha
  display(result);
}