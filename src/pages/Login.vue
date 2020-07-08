<template>
  <div id="app">
    <div class="container section-login" v-cloak>
      <Header message="CHÀO MỪNG BẠN ĐẾN TRANG QUẢN TRỊ"></Header>
      <div class="row justify-content-center align-item-center mt-5">
        <h1 class="login-text col-12 col-md-6 text-center">Đăng Nhập</h1>
      </div>
      <form
        class="w-100 col-12 col-md-8 row justify-content-center align-items-center flex-column mt-5 mx-lg-auto"
      >
        <div class="form-group col-12 col-lg-6">
          <label for="username">Tài Khoản</label>
          <input
            type="text"
            class="form-control login-input"
            id="username"
            name="username"
            v-model="username"
            @focus="loginError = ''"
          />
          <small id="emailHelp" class="form-text text-danger" v-if="nameError">{{ nameError }}</small>
        </div>
        <div class="w-100 d-none d-md-block"></div>
        <div class="form-group col-12 col-lg-6">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            class="form-control login-input"
            id="password"
            name="password"
            v-model="password"
            @focus="loginError = ''"
          />
          <small id="passwordHelp" class="form-text text-danger" v-if="passError">{{ passError }}</small>
        </div>
        <div class="w-100 d-none d-md-block"></div>
        <div class="w-100">
          <small
            id="loginHelp"
            class="form-text text-danger text-center"
            v-if="loginError"
          >{{ loginError }}</small>
        </div>
        <button
          @click.prevent="login()"
          @keyup.enter="login()"
          :disabled="!isValid"
          type="submit"
          class="btn btn-lg col-xs-10 col-md-3 login-submit"
        >Đăng Nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

import {HOST} from '../helper/helper'
export default {
  name: "Login",
  props: {
    loged: Boolean
  },
  components: {
    Header
  },
  data: function() {
    return {
      hasAccess: false,
      currentRoute: window.location.pathname,
      username: "userdemo",
      password: "userdemo",
      loginError: ""
    };
  },
  methods: {
    login: function() {
      // check login
      if (!!this.username && !!this.password && this.isValid) {
        // call api
        fetch( HOST + '/user/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: this.username, password: this.password})
        })
          .then( res => {
            if(res.status == 200) {
              this.setCookie("authToken", JSON.stringify(res.headers.get('Authorization')), 1440 );
              res.json()
               .then(result => {
                  if(result.auth == true) {
                    // has access
                    this.hasAccess = true;
                    //  create cookie <name : tring>,<expires : .x.minutes>
                    this.setCookie("user", JSON.stringify(result.user), 1440 );
                  }
                })
            }
            if(res.status == 404) {
              this.loginError = 'Tên đăng nhập / Mật khẩu sai !'
            }
          })
         
      }
    },
    setCookie: function(cname, cvalue, exmins) {
      var d = new Date();
      d.setTime(d.getTime() + exmins * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = `${cname} = ${cvalue} ; ${expires} ; path = /`;
    },
    getCookie: function(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  },
  computed: {
    nameError: function() {
      let userRegEx = new RegExp("^[a-z0-9A-Z]{6,}$");
      if (this.username) {
        if (!userRegEx.test(this.username)) {
          return "Tên đăng nhập không hợp lệ !";
        }
      }
      return "";
    },
    passError: function() {
      let passRegEx = new RegExp("^.{6,}$");
      if (this.password) {
        if (!passRegEx.test(this.password)) {
          return "Mật khẩu không hợp lệ !";
        }
      }
      return "";
    },
    isValid: function () {
      return !this.nameError && !this.passError ? true : false;
    }
    
  },
  watch: {
    hasAccess: function() {
      if (this.hasAccess == true) window.location.assign("/dashboard");
      return;
    }
  },
  created: function() {
    if (this.getCookie("user")) {
      this.hasAccess = true;
    }
  }
};
</script>

<style>

.section-login {
  background-color: #fff;
}
.login-text {
  color: var(--admin-primary-color);
}
.login-input {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #ced4da;
}
.login-input:focus {
  border-bottom: 1px solid #fe4c8d;
  box-shadow: none;
}
.login-submit {
  margin-top: 2rem;
  background-color: #fe4c8d;
}
</style>
