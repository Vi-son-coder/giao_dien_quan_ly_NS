function getCurrentAccount(){
    const Accounts = JSON.parse(localStorage.getItem("login"));
    const Email = localStorage.getItem("currentUser");
    if(!Accounts || !Email) return null;
        
    return Accounts.find(user => user.email === Email);
} //sử dụng local để giả backend phần tử đang sử lý để gọi lại dùng