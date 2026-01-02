function getCurrentAccount(){
    const Accounts = JSON.parse(localStorage.getItem("login"));
    const idAcc = localStorage.getItem("idUser");
    if(!Accounts || !Email) return null;
        
    return Accounts.find(user => user.id === id);
} //sử dụng local để giả backend phần tử đang sử lý để gọi lại dùng