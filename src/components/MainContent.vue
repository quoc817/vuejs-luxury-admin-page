<template>
  <div class="wrapper col px-0 position-relative">
    <!-- toggle side nav icon -->
    <i @click="$emit('toggleSideNav',$event.target)" class="fad fa-long-arrow-left  sidenav-toggle d-none d-lg-block"></i>
    <i @click="$emit('forceShowSideNav',$event.target)" class="fad fa-bars  sidenav-toggle d-block d-lg-none"></i>
    <!-- toggle side nav icon -->
    <!-- toast notify -->
     <toast-notify>  
       {{toastMessage}}
      </toast-notify>
    <div class="main-content">
      <div v-show="!createForm" class="row justify-content-center mx-0 pt-2">
        <div class="col-6">
          <search-box
            @searching="changeQueries($event)"
          ></search-box>
        </div>
      </div>

      <table-content 
        v-if="dataTableClone"
        :show="show"
        :data="dataTableClone"
        :searchQueries="searchQueries"
        :token="token"
        :user="user"
        @update="setId($event)"
        @delete="setId($event)"
        @orderUpdate="showNotify('Đã cập nhật trạng thái đơn hàng!')"
        @createdUser="showNotify('Đã tạo user')"
        @fail="showNotify('Tạo user thất bại')"
      ></table-content>
      <form-create
        v-show="createForm && user.role == 'admin'"
        :token="token"
        @created="showNotify('Đã thêm sản phẩm')"
      >

      </form-create>
      <form-update 
        :update="modalUpdate"
        :itemToUpdate="objectSelected"
        @productUpdated="productApplyData($event)"
        @bookingUpdated="bookingApplyData($event)"
        @userUpdated="userApplyData($event)"
        
      ></form-update>

      <form-delete
        :itemDelete="objectSelected"
        @deleteCommit="deleteData($event)"
      ></form-delete>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import {HOST} from '../helper/helper'

import SearchBox from "./SearchBox";
import TableContent from "./TableContent";
import FormUpdate from "./FormUpdate";
import FormDelete from "./FormDelete";
import ToastNotify from "./ToastNotify";
import FormCreate from "./FormCreate";

export default {
  name: "MainContent",
  props: {
    show: String,
    token: String,
    user: Object
  },
  components: {
    SearchBox,
    TableContent,
    FormUpdate,
    FormDelete,
    ToastNotify,
    FormCreate
  },
  data: function () {
      return {
        dataTable: [],
        searchQueries: '',
        objectSelectedId: '',
        toastMessage: '',
        createForm: false,
        route: '',
        component: ''
      }
  },
  watch: {
    show: function () {
      // reset data -> clean view
      this.dataTable.splice(0);
      this.route = '';
      this.component = '';
      this.createForm = false;
      // get view
      this.controlView();
    },
    toastMessage: function() {  
    }
  },
  methods: {
    controlView: function() {
      switch(this.show) {
        case 'product-all' : {
          this.route = '/dish';
          break;
        }
        case 'product-add' : {
          this.component = 'AddDish';
          break;
        }
        
        case 'order-all' : {
          this.route = '/order';
          break;
        }
        case 'order-news' : {
          this.route = '/order';
          break;
        }
        case 'booking-all' : {
          this.route = '/booking';
          break;
        }
        // case 'mailbox' : {
        //   this.route = '/contact';
        //   break;
        // }
        // case 'notify' : {
        //   this.route = '/contact';
        //   break;
        // }
        case 'user' : {
          this.route = '/user';
          break;
        }
      }
      if(this.route) {
        this.createForm = false;
        this.fetchData(this.route);
      
      }
      if (this.component == 'AddDish') {
        this.createForm = true;
      } 
      
    },
    fetchData: async function (route) {
      try {
          //define header request
          let header = new Headers();
          header.append('Authorization', this.token);
          
          let res = await fetch(HOST + route, {headers: header});
          // console.log(res)
          if(res.status != 200 ) {
            throw new Error('Fetching error ' + res.status);
          } else {
            let result = await res.json();
            this.dataTable = result.result;
          }
        } catch (error) {
          console.log(error.message);
        }
    },
    changeQueries: function (inputVal) {
      this.searchQueries = inputVal;
    },
    setId: function (id) {
      this.objectSelectedId = id;
    },
    productApplyData: async function (itemUpdate) {
      // data to send
      let updateFrom = document.getElementById('updateProduct');
      let formData = new FormData(updateFrom);
      formData.append('tag', itemUpdate.tag);
      formData.delete('productType');
      
      // compair item update & item oringin
      let pos = Array.prototype.findIndex.call(this.dataTable, el => el._id == itemUpdate._id );  
      let originItem = this.dataTable[pos];
      for(let key in itemUpdate) {
        if(itemUpdate[key] == originItem[key]) {
          // delete field no nescessary update
          formData.delete(key);
        }
      }

      // call update api on backend
      // here
      
      const res = await fetch(HOST + this.route + '/' + itemUpdate._id, {
        method: 'PUT',
        headers: {
          'Authorization': this.token
        },
        body: formData 
      });

      if(res.status == 201) {
        // show toast 
        this.showNotify('Cập nhật thành công')
        // apply on local data
        this.$set(this.dataTable, pos, itemUpdate);
      } 
      else {
        this.showNotify('Cập nhật thất bại')
      }
      
    },
    bookingApplyData: async function (itemUpdate) {
      // call update api on backend
      // here
      const res = await fetch(HOST + this.route + '/' + itemUpdate._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(itemUpdate) 
      });

      if(res.ok) {
        // update success 
        // apply on local data
        const pos = Array.prototype.findIndex.call(this.dataTable, el => el._id == itemUpdate._id );  
        if (pos > -1) {
          this.$set(this.dataTable, pos, itemUpdate);
        }
        // show toast 
        this.showNotify('Cập nhật thành công')
      } else {
        this.showNotify('Cập nhật thất bại')
      }
    },
    deleteData: async function (itemDelete) {
      // call delete api on backend
      // here
      const res = await fetch(HOST + this.route + '/'+ itemDelete._id, {
        headers: {
          'Authorization': this.token
        },
        method: 'DELETE',
      });

      if(res.ok) {
        // apply on local data
        const pos = Array.prototype.findIndex.call(this.dataTable, el => el._id == itemDelete._id ); 
        if (pos > -1 ) {
          // remove from dataTable at pos and 1 delete count
          this.dataTable.splice(pos, 1);
        }
        // show toast 
       if( itemDelete.name) {
        this.showNotify('Đã xóa' + itemDelete.name);
       }
       if( itemDelete.username) {
        this.showNotify('Đã xóa' + itemDelete.username);
       }
      } else {
        this.showNotify('Xóa thất bại')
      }
      
      
    },
    showNotify: function (message) {
      // show toast 
      this.toastMessage = message;
      $('#toastNotify').toast({autohide: true, delay: 3000});
      $('#toastNotify').toast('show');
      $('#toastNotify').on('shown.bs.toast' , function () {
        $('#toastParent').removeClass("onhide");
        $('#toastParent').addClass("onshow");
      })
      $('#toastNotify').on('hide.bs.toast' , function () {
        $('#toastParent').removeClass("onshow");
        $('#toastParent').addClass("onhide");
         
      })
    },
    userApplyData: async function (itemUpdate) {
       // call update api on backend
      // here
      const res = await fetch(HOST + this.route + '/' + itemUpdate._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(itemUpdate) 
      });

      if(res.ok) {
        // update success 
        // apply on local data
        const pos = Array.prototype.findIndex.call(this.dataTable, el => el._id == itemUpdate._id);  
        if (pos > -1) {
          this.$set(this.dataTable, pos, itemUpdate);
        }
        // show toast 
        this.showNotify('Cập nhật thành công')
      } else {
        this.showNotify('Cập nhật thất bại')
      }
    }
   },
  computed: {
    objectSelected: {
      get: function () {
        return Object.assign({},
          Array.prototype.find.call(this.dataTable, item => {
            return item._id == this.objectSelectedId;
          })
        )
      },
      set: function (newOjb) {
        console.log(newOjb);
      }
    },
    dataTableClone: function () {
      return [...this.dataTable];
    },
    modalUpdate: function () {
      if (this.route != '' && this.route == '/dish') {
        return 'product';
      } 
      else if (this.route != '' && this.route == '/booking') {
        return 'booking';
      }
      else if (this.route != '' && this.route == '/user') {
        return 'user';
      }
      return '';
    }
  },
  created: function () {
    if ( this.show == 'product-all' ) {
      this.controlView() 
    }
    this.showNotify();
  }
};
</script>

<style scoped>
.wrapper {
  padding-top: 1.5rem;
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
.main-content {
  background-color: #2c2c34;
  min-height: 100vh;
}
.sidenav-toggle {
  display: block;
  font-size: 1.5rem;
  color: var(--admin-primary-color);
  position: absolute;
  top: 0px;
  left: 1.5rem;
  cursor: pointer;
}
</style>