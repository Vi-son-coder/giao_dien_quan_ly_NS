//kiểm tra có tồn tại không
      const Login = [
        { email: "vison2999@gmail.com", pass: "vison205", id: 1 },
        { email: "vison205@gmail.com", pass: "vison05", id: 2 },
      ];
      if(!localStorage.getItem("login")){
        localStorage.setItem("login", JSON.stringify(Login));
      }

      function DN() {
        let TK = document.getElementById("TK").value.trim();
        let MK = document.getElementById("MK").value.trim();
        let Account = JSON.parse(localStorage.getItem("login")) || [];
        let test = Account.find(
          (user) => user.email === TK && user.pass === MK
        );

        if (test) {
          localStorage.setItem("idUser",test.id);

          window.location.href = `../Home/home.html`;
        }
        else{
          alert("Sai thông tin tài khoản và mật khẩu!");
        }
      }
      document.getElementById("DN").addEventListener("click", DN);