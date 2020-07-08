import Vue from 'vue';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import routes from './routes';


Vue.config.productionTip = false

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  methods: {
    
  },
  computed: {
    viewPage : function() {
      var page = '';
      routes.forEach( route => {
          if(route.path == this.currentRoute) {
            page = route.views;
          }
      })
      // console.log(page)
      return page ? require(`./pages/${page}`).default : require(`./pages/404`).default;
    }
  },
  render: function(h) {
    // console.log(this.viewPage);
    return h(this.viewPage);
  },
}).$mount('#app')
