const Login = {
    template: `<div>
        <link rel="stylesheet" type="text/css" href="/static/css/login.css">
        <div class="box-login">
      <div v-if="app.errorLogin" class="login-error">Credentials wrong!</div>
       <div class="wrap-input100 validate-input">
         <input class="input100" type="text" placeholder="Username" v-model="username">
         <span class="focus-input100"></span>
         <span class="symbol-input100">
          <i class="fas fa-envelope"></i>
         </span>
       </div>
       <div class="wrap-input100 validate-input">
         <input class="input100" type="password" placeholder="Password" v-model="password">
         <span class="focus-input100"></span>
         <span class="symbol-input100">
           <i class="fas fa-lock"></i>
         </span>
       </div>
       <div class="container-login100-form-btn">
         <input class="login100-form-btn" type="submit" @click = "submit_function" value="Log in">
       </div>
      </div>
 </div>`,
 data() {
 		return {
      username: '',
      password: ''
    }
 	},
  methods: {
    submit_function : function(event){
      //'http://localhost:8080/api/loginSubmit'
      axios.post('/api/loginSubmit', {
        usr: this.username,
        pw: this.password
      })
      .then(function (response) {
        if (response.data != "Login invalid" && response.data != "Password invalid"){
         app.logged = true;
         app.user = response.data;
         app.errorLogin = false;
         if (response.data.type === "Manager"){
           app.manager = true;
         }
         router.push('/spirit');
        } else {
          app.errorLogin = true;
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },

  mounted(){
    app.notInLogin = false;
    app.logged = false;
  }
}
