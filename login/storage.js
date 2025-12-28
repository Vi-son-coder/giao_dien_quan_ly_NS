function saveAccount(account){
    const Accounts = JSON.parse(localStorage.getItem("login")) || [];
    const index = Accounts.findIndex(user => user.email === account.email);
    if(index === -1) return;
    Accounts[index] = account;

    localStorage.setItem("login",JSON.stringify(Accounts));
} //sử dụng local để giả backend phần tử đang sử lý để save thông tin khi sửa dữ liệu