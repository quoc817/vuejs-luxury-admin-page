<template v-if="loged">
  <div id="app">
    <div class="container-fluid px-0 ">
      <Header 
        v-bind:user="user"
        class="mb-3"
      > 
      </Header>
      <div class="row position-relative" style="background-color: #0a0b18;"> 
        <transition name="slide">
        <side-nav 
            v-if="showSideNav" 
            :userRole="user.role"
            :absoluted="sideNavAbsolute"
            @closeSideNav="forceCloseSideNav($event)"
            @changeTab="getTab($event)"
            > 
            </side-nav>
        </transition>
        <main-content 
          :show="tabActiveClone"
          :token="authToken"
          :user="user"
          @toggleSideNav="toggleSideNav($event)"
          @forceShowSideNav="forceOpenSideNav($event)"
        >
        </main-content>
      </div>
    </div>
  </div>
</template>


<script>

import Header from '../components/Header'
import SideNav from '../components/SideNav'
import MainContent from '../components/MainContent'

export default {
  name: "DashBoard",
  components: {
    Header,
    SideNav,
    MainContent
    // NavLink
  },
  data: function() {
    return {
      user : {},
      authToken: '',
      showSideNav: true,
      sideNavAbsolute: false,
      tabActive: 'product-all'
    };
  },
  methods: {
    hasChild: function(parent) {
      if (Object.prototype.hasOwnProperty.call(parent, "child")) return true;
      return false;
    },
    getCookie: function (cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
    },
    getTab : function (path) {
      console.log(path);
      switch(path) {
        case '/dashboard': {
          this.tabActiveClone =  'dashboard';
          break;
        }
        case '/product/add': {
          this.tabActiveClone =  'product-add';
          break;
        }
        case '/product/all': {
          this.tabActiveClone =  'product-all';
          break;
        }
        case '/order/news': {
          this.tabActiveClone =  'order-news';
          break;
        }
        case '/order/all': {
          this.tabActiveClone =  'order-all';
          break;
        }
        case '/booking': {
          this.tabActiveClone =  'booking-all';
          break;
        }
        case '/mailbox': {
          this.tabActiveClone =  'mailbox';
          break;
        }
        case '/notify/add': {
          this.tabActiveClone =  'notify-add';
          break;
        }
        case '/notify/history': {
          this.tabActiveClone =  'notify-history';
          break;
        }
        case '/users': {
          this.tabActiveClone =  'user';
          break;
        }
      }
    },
    toggleSideNav: function (target) {
      if(window.screen.width > 992) {
        this.showSideNav = !this.showSideNav;
        this.sideNavAbsolute= false;
        target.classList.toggle('d-lg-none');
        target.classList.toggle('fa-long-arrow-left');
        target.classList.toggle('fa-long-arrow-right');
      } else {
         this.sideNavAbsolute= true;
         this.showSideNav = !this.showSideNav;
      }
    },
    forceOpenSideNav: function() {
        this.sideNavAbsolute = true;
        this.showSideNav = true;
    },
    forceCloseSideNav: function() {
        this.showSideNav = !this.showSideNav;
    }
  },
  watch: {
    
  },
  computed: {
    tabActiveClone: {
      get: function () {
        return this.tabActive;
      },
      set: function (newVal) {
        this.tabActive = newVal
      }
    }
  },
  created: function () {
    if (this.getCookie('user') == '') {
      window.location.assign('/')
    }
    else {
      this.user = JSON.parse(this.getCookie('user'))
      this.authToken = JSON.parse(this.getCookie('authToken'))
    }
  }
};

</script>


<style scoped>
@import '../assets/style/all.css';

.slide-enter, .slide-leave-to {
  width: 0!important;
}
.slide-enter-to, .slide-leave {
  width: 100%!important;
}
.slide-enter-active, .slide-leave-active {
  transition: width .5s;
}
</style>