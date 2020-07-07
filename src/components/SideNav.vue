<template>
    <div v-if="absoluted" class=" col-lg-3 d-lg-block wrap-sidenav sidenav-left">
        <ul class="nav c-side-nav flex-column">
            <i  class="fad fa-times close-icon"
              @click="$emit('closeSideNav',$event.target)"
            >
            </i>
            <nav-link 
              v-for="(item, index) in menu._children" :key="index" 
              :userRole="userRole"
              :type="item._name"
              :to="'#'"
              :text="item.name"
              :collapse="true"
              :dropitem="item.items"
              :childId="item._name + index"
              @checkoutContent="$emit('changeTab', $event)"
            />
        </ul>
      </div>
    <div v-else class=" col-lg-3 d-none d-lg-block wrap-sidenav  ">
        <ul class="nav c-side-nav flex-column">
            <nav-link 
              v-for="(item, index) in menu._children" :key="index" 
              :type="item._name"
              :route="item.route ? item.route : item.to"
              :text="item.name"
              :collapse="true"
              :dropitem="item.items"
              :childId="item._name + index"
              @checkoutContent="$emit('changeTab', $event)"
            />
        </ul>
      </div>
</template>

<script>

import NavLink from '../components/NavLink'
import * as menuLink from '../components/_nav'

export default {
    props: {
      absoluted: Boolean,
      userRole: String
    },
    components: {
      NavLink,
    },
    data: function () {
      return {
        menu : menuLink.default,
      }
    },
    methods: {
      checkclick: function (event) {
        console.log(event);
      }
    },
    mounted: function () {
      this.$el.querySelector('li a').classList.add('active');
    }
}

</script>



<style scoped>
.wrap-sidenav {
  padding-right : 0;
  overflow-y: hidden;
}
.sidenav-left {
  max-width: 400px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.close-icon {
  font-size: 1.5rem;
  color: var(--admin-primary-color);
  position: absolute;
  top : 0;
  right : 0;
  cursor: pointer;
}
.col-lg-3 {
  flex-basis: auto;
}
.c-side-nav {
  padding-top: 1.5rem;
  height: 100%;
  background-color: #2c2c34; 
}
</style>