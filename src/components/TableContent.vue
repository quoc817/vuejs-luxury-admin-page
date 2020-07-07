<template>
<div>
    <!-- start product -->
    <div class="row mx-0 mt-2" v-if="show == 'product-all'">
        <div class="col-12 px-0">
          <div class="row mx-0 table-responsive-sm">
            <table class="table m-1 table-bordered table-hover table-dark">
              <thead class="thead-light">
                <tr>
                  <th class="text-center" scope="col">STT</th>
                  <th class="text-center" scope="col">Hình ảnh</th>
                  <th class="text-center" id="col-name" scope="col">Tên</th>
                  <th class="text-center" id="col-price" scope="col">Giá</th>
                  <th class="text-center" scope="col">Mô tả</th>
                  <th scope="col" class="text-center px-0">Cập nhật</th>
                  <th scope="col" class="text-center">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataShown" :key="item._id" 
                >
                  <td class="align-middle text-center">{{index + 1 + numPerPage*(activePage - 1)}}</td>
                  <td class="align-middle text-center">
                    <img class="img-thumb" :src="item.img" alt="dish thumbnail" />
                  </td>
                  <td  class="align-middle">{{item.name}}</td>
                  <td class="align-middle">{{item.price | vndFormat(item.price)}}</td>
                  <td class="align-middle">{{item.short_desc}}</td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="far fa-pen-alt h5" 
                        data-toggle="modal"
                        data-target="#modalUpdate"
                        :id="item._id"
                        @click="$emit('update', $event.target.id)"
                        ></i>
                    </a>
                  </td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="far fa-window-close h5" 
                        data-toggle="modal"
                        data-target="#modalDelete"
                        :id="item._id"
                        @click="$emit('delete', $event.target.id)"
                        ></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    <!-- end product -->
    <!-- start order  -->
    <div class="row mx-0 mt-2" v-if="(show == 'order-all' || show == 'order-news') && !viewInfo">
        <div class="col-12 px-0">
          <div class="row mx-0 table-responsive-sm">
            <table class="table m-1 table-bordered table-order table-hover ">
              <thead class="thead-dark">
                <tr>
                  <th class="text-center" scope="col">STT</th>
                  <th class="text-center" scope="col">Người đặt</th>
                  <th class="text-center" scope="col"> Địa chỉ</th>
                  <th class="text-center" scope="col">Ngày đặt hàng</th>
                  <th class="text-center" scope="col">Số tiền</th>
                  <th class="text-center" scope="col">Trạng thái</th>
                  <th class="text-center" scope="col" >chi tiết</th>
                  <th class="text-center" scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dataShown" 
                  :key="item._id" 
                  :class="rowColor(item.status)"
                >
                  <td class="align-middle text-center">{{index + 1 + numPerPage*(activePage - 1)}}</td>
                  <td class="align-middle text-center">{{ item.custom_info.name }} </td>
                  <td class="align-middle text-center">{{ item.custom_info.addr }} </td>
                  <td class="align-middle text-center">{{item.created| tolocaleDateTime(item.created)}}</td>
                  <td class="align-middle text-center">{{item.amount | vndFormat(item.amount)}}</td>
                  <td class="align-middle text-center">{{item.status | statusTrans(item.status) }}</td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>

                      <i 
                        class="fal fa-eye h5 text-center" 
                        :id="item._id"
                        @click="redirectViewInfo($event.target.id)"
                        ></i>
                    </a>
                  </td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="far fa-window-close h5" 
                        data-toggle="modal"
                        data-target="#modalDelete"
                        :id="item._id"
                        @click="$emit('delete', $event.target.id)"
                        ></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    <view-info
      v-show="viewInfo"
      :viewId="viewId"
      :token="token"
      :user="user"
      @turnBack="viewInfo = false"
      @statusUpdated="applyChange($event)"
    ></view-info>
    <!-- end order -->

    <!-- start booking -->
    <div class="row mx-0 mt-2" v-if="(show == 'booking-all')">
        <div class="col-12 px-0">
          <div class="row mx-0 table-responsive-sm">
            <table class="table m-1 table-bordered table-order table-hover table-light">
              <thead class="thead-dark">
                <tr>
                  <th class="text-center" scope="col">STT</th>
                  <th class="text-center" scope="col">Người đặt</th>
                  <th class="text-center" scope="col"> Email</th>
                  <th class="text-center" scope="col">STĐ</th>
                  <th class="text-center" scope="col">Thời gian</th>
                  <th class="text-center" scope="col">Số người</th>
                  <th class="text-center" scope="col" >Ghi chú</th>
                  <th class="text-center" scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dataShown" 
                  :key="item._id" 
                  :class="[item.confirm == 'yes' ? 'table-success' : 'table-primary',]"
                >
                  <td class="align-middle text-center">{{index + 1 + numPerPage*(activePage - 1)}}</td>
                  <td class="align-middle text-center">{{ item.name }} </td>
                  <td class="align-middle text-center">{{ item.email }} </td>
                  <td class="align-middle text-center">{{item.phone}}</td>
                  <td class="align-middle text-center">{{ item.time + '-' + dateFormat(item.date) }}</td>
                  <td class="align-middle text-center">{{item.guest }}</td>
                  <td class="align-middle text-center">{{item.note }}</td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="fal fa-pen-alt h5 text-center" 
                        data-toggle="modal"
                        data-target="#modalUpdate"
                        :id="item._id"
                        @click="$emit('update', $event.target.id)"
                        ></i>
                    </a>
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="far fa-window-close h5" 
                        data-toggle="modal"
                        data-target="#modalDelete"
                        :id="item._id"
                        @click="$emit('delete', $event.target.id)"
                        ></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    <!-- end booking -->
    <!-- start mailbox -->
    
    <!-- end mailbox -->

    <!-- start notification -->
    
    <!-- end notification -->

    <!-- start user -->
    <div class="row mx-0 mt-2" v-if="show == 'user'">
        <div class="col-12 px-0">
          <div class="row mx-0 table-responsive-sm">
            <table class="table m-1 table-light table-order table-hover table-sm ">
              <thead class="thead-light">
                <tr>
                  <th class="text-center" scope="col">STT</th>
                  <th class="text-center" scope="col">Tên Đăng Nhập</th>
                  <th class="text-center" scope="col">Mật khẩu</th>
                  <th class="text-center" scope="col">Quyền</th>
                  <th class="text-center" scope="col" >chi tiết</th>
                  <th class="text-center" scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in dataShown" 
                  :key="item._id" 
                  >
                  <td class="align-middle text-center">{{index + 1 + numPerPage*(activePage - 1)}}</td>
                  <td class="align-middle text-center">{{ item.username }} </td>
                  <td class="align-middle text-center d-flex align-items-center justify-content-center"
                  >
                     <p>********</p>
                    <a href="#" class="btn ml-3" v-if="user.role == 'admin'" @click.prevent >
                      <i 
                        :class="['fal h5', 'fa-eye'] " 
                        :id="item._id"
                        @click="toggleViewPass($event.target)"
                        ></i>
                    </a>
                  </td>
                  <td class="align-middle text-center">{{ item.role}}</td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="fal fa-pen-alt h5 text-center" 
                        data-toggle="modal"
                        data-target="#modalUpdate"
                        :id="item._id"
                        @click="$emit('update' , $event.target.id)"
                        ></i>
                    </a>
                  </td>
                  <td class="align-middle text-center">
                    <a href="#" class="btn" @click.prevent>
                      <i 
                        class="far fa-window-close h5" 
                        data-toggle="modal"
                        data-target="#modalDelete"
                        :id="item._id"
                        @click="$emit('delete', $event.target.id)"
                        ></i>
                    </a>
                  </td>
                </tr>
                <transition 
                  name="scrollDown"
                  enter-active-class="animated backInUp"
                  leave-active-class="animated backInUp"
                  >
                  <tr v-if="openFormAdd" class="row-newuser">
                    <td class="text-center align-middle">
                      <a href="#" class="btn h2" @click.prevent="">
                        <i
                          class="fas fa-horizontal-rule btn-admin-primary"
                          @click="openFormAdd = !openFormAdd"
                          ></i>
                      </a>
                    </td>
                    <td class="align-middle text-center">
                      <div class="form-group mb-0 position-relative">
                        <input 
                            name="name"
                            type="text" class="form-control" 
                            v-model="newUser.username"
                          
                            />
                        <label for="name" class="text-danger text-capitalize position-absolute" v-if="userNameHelpText && newUser.username"> {{userNameHelpText}} </label>
                      </div>
                    </td>
                    <td class="align-middle text-center ">
                      <div class="form-group mb-0 position-relative">
                        <input 
                            name="name"
                            type="text" class="form-control" 
                            v-model="newUser.password"
                            
                            />
                          <label for="name" class="text-danger text-capitalize position-absolute" v-if="userPassHelpText && newUser.password"> {{userPassHelpText}} </label>
                      </div>
                    </td>
                    <td class="align-middle text-center">
                      <div class="form-group mb-0">
                        <select 
                            class="form-control" 
                            v-model="newUser.role"
                            >
                            <option value="admin" >Admin</option>
                            <option value="manager" >Quản Lí</option>
                            <option value="staff" selected="selected" >Nhân Viên</option>
                        </select>
                    </div>
                    </td  >
                    <td colspan="2" class="text-center align-middle" >
                      <a href="#" 
                        :class="['btn', 'btn-success', validateUser ? '' : 'disabled']"
                        :aria-disabled="true" 
                        @click.prevent="addNewUser()"
                        >
                        Tạo
                      </a>
                    </td>
                  </tr>
                </transition>
              </tbody>
            </table>
            <!-- add mask -->
            <a href="#" class="btn" v-if="!openFormAdd" @click.prevent="">
              <i 
                class="fal fa-plus h5 btn-admin-primary " 
                @click.prevent="openFormAdd = !openFormAdd"
                ></i>
            </a>
          </div>
        </div>
    </div>
    <!-- end user -->

    <!-- (show == 'product-all' || show == 'order-news' || show == 'order-news' )  -->
    <pagination 
        v-if="total  && viewInfo == false" 
        :activePage="activePage" 
        :npp="numPerPage" 
        :total="total"
        :pageNum="maxPage"
        @changePage="loadPage($event)"
        @PrevPage="activePage - 1 <= 1 ? activePage = 1 : activePage -= 1"
        @nextPage=" activePage + 1 >= maxPage ? activePage = maxPage : activePage += 1"
      ></pagination>
</div>
</template>

<script>
import {HOST} from '../helper/helper'

import Pagination from "./Pagination";
import ViewInfo from './ViewInfo'

export default {
  name: 'TableContent',
  props: {
    show: String,
    data: Array,
    searchQueries: String,
    token: String,
    user: Object
  },
  components: {
     Pagination,
     ViewInfo,
  },
  data: function () {
    return {
      cardinalNum : 0,    // number of item in table
      activePage: 1,      // page active on pagnation
      numPerPage: 10,     // number per one page
      dataClone: [],      // data to show in table

       host: HOST,        // define host

      viewInfo: false,    // --order : toggle view details of one item
      viewId: '',      // --order : detect id of view item

      newUser: {          //--user : new user object
        username: '',
        password: '',
        role: 'staff'
      },
      openFormAdd: false,
      passShown: ''
    }
  },
  methods: {
    addNewUser: async function () {
      //define header request
      let res = await fetch(HOST +'/'+ this.show, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(this.newUser)
      }) 
      if (res.ok) {
        if(res.status == '201') {
          this.$emit('createdUser');
          this.dataClone.push(Object.assign({},this.newUser));
          // reset and close input group
          let reset = {          //--user : new user object
                        username: '',
                        password: '',
                        role: 'staff'
                      }
          Object.assign(this.newUser, reset);
          this.openFormAdd = false;
        }
        if(res.status == '403') {
          this.userNameHelpText = 'Tài khoản đã tồn tại';
        }
      } else {
        this.$emit('fail');
      }
    },
    applyChange: function (changeItem) {
      let pos = Array.prototype.findIndex.call(this.dataShown, item => item._id == changeItem._id )
      // because changItem have a data structure != dataShwn.item -> assign pos.status = order_info.status
      this.dataClone[pos].status = changeItem.order_info.status;
      this.$forceUpdate();
      this.$emit('orderUpdate')
    },
    filterByName: function (inputVal) {
      var vm = this;
      let filtered = Array.prototype.filter.call(this.data, function (item) {
        // console.log('filter' +vm.findAnyMatchValue(item, inputVal));
        return vm.findAnyMatchValue(item, inputVal);
      })
      // apply after filter
      this.dataShown = filtered;
      this.activePage = 1;
    },
    findAnyMatchValue: function(item, inputVal) {
      let keys = Object.keys(item)
        for( let index = 0; index < keys.length ; index++) {
           if(keys[index] != '_id' && keys[index]  != "img" && keys[index]  != "__v" &&  keys[index]  != "created"  &&  keys[index]  != "updated") {
              let value = String(item[keys[index]]).toLowerCase();
              let inputLower = String(inputVal).toLowerCase();
              if (value.indexOf(inputLower) > -1 && (!Object.isExtensible(item[keys[index]]))) {
                // console.log(value + "-----<" + inputLower);
                return true;
              }
              // has nested object
            if (Object.isExtensible(item[keys[index]])  && !Array.isArray(item[keys[index]])) {
                return this.findAnyMatchValue(item[keys[index]], inputVal);
            }
          }
          
        }
        // return false;
    },
    filterPendingOrders:  function () {
      let pendingOrders = this.dataClone.filter(item => item.status == 'P')
      // apply after filter
      this.dataShown = pendingOrders;
      this.activePage = 1;
    },
    loadPage: function (event) {
      this.activePage = parseInt(event.text);
    },
    rowColor: function (status) {
       if(status == 'P') return  'table-primary'
       if(status == 'A') return  'table-danger'
       if(status == 'C') return  'table-success'
    },
    redirectViewInfo: function (id) {
      this.viewInfo = true;
      this.viewId = id;
    },
    dateFormat: function (date) {
      let d = new Date(date);
      return d.toLocaleDateString();
    },
    toggleViewPass: function (target) {
      if(target.parentNode.previousSibling.textContent == '********') {
        let targetUser = Array.prototype.find.call(this.dataClone, el => el._id == target.id);
        target.parentNode.previousSibling.textContent = targetUser.password;
        target.classList.toggle('fa-eye-slash')
      }
      else  {
        target.parentNode.previousSibling.textContent = '********';
        target.classList.toggle('fa-eye-slash');
      }
      // if (target.classList.contains('fa-eye') ) {
      //    target.classList.remove('fa-eye') 
      //   target.classList.toggle('fa-eye-slash')
      // }
      // else if (target.classList.contains('fa-eye-slash') ) {
      //    target.classList.remove('fa-eye-slash') 
      //   target.classList.toggle('fa-eye')
      // }
    }
  },
  computed: {  
    dataShown : {
      // getter
      get:  function () {
        const dataPage = this.dataClone;
        const start = (this.activePage - 1) * this.numPerPage; 
        const end = this.activePage * this.numPerPage; 

        return Array.prototype.slice.call(dataPage, start, end);
      },
      // settter
      set: function (newArray) {
        this.dataClone = newArray;
      }
    },
    total: function () {
      let total = 0;
      this.dataClone.forEach(() => {
          total += 1;
      });
      return total;
    },
    maxPage: function () {
      if(this.total <= this.numPerPage) {
        return 1;
      }
      return this.total % this.numPerPage == 0 
              ? parseInt(this.total / this.numPerPage)
              : parseInt(this.total / this.numPerPage) + 1
    },
    viewItem: function () {
      let pos = Array.prototype.findIndex.call(this.dataClone, el => el._id == this.viewId)
      return  pos
              ?  this.dataClone[pos]
              : {}
    },
    validateUser : function() {
      return this.userNameHelpText || this.userPassHelpText 
              ? false
              : true
    },
    userNameHelpText: function() {
      return !/^[a-z]{1}(\S)[a-z0-9A-Z]{4,}$/gm.test(this.newUser.username)
              ? 'Tên đăng nhập trên 6 kí tự, Không chứa khoảng cách , bắt đầu bằng chữ thường'
            : '' 
    },
    userPassHelpText: function() {
      return !/^(\S)[a-z0-9-A-Z]{5,}$/gm.test(this.newUser.password) 
              ? 'Mật khẩu trên 6 kí tự, không chứa khoảng cách'
            : '' 
    }
  },
  watch: {
    searchQueries: function (newVal) {
      if (newVal != '') {
        this.filterByName(newVal);
      } 
      else if (newVal == '') {
        this.dataClone = this.data;
      }
    },
    data: function (newVal) {
      this.dataClone = newVal;
      if(this.show == 'order-news') {
        this.filterPendingOrders();
      }
    },
    show: function () {
      this.activePage = 1;
      this.viewId = '';
      this.viewInfo = false;
      this.openFormAdd = false;
    },
  },
  filters: {
    vndFormat : function (number) {
      if(number) {
        let currency = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ' đ'
        return currency;
      }
      return '';
    },
    statusTrans : function (text) {
      let full = ['Chờ xử lý', 'Đang giao', 'Hoàn thành'];
      let alias = ['P', 'A', 'C'];
      return  full.indexOf(text) > - 1 
            ? alias[full.indexOf(text)] 
            : full[alias.indexOf(text)];
    },
    tolocaleDateTime: function (dateString) {
      let d = new Date(dateString);
      // let localeStr = d.toDateString(d);
      return d.getHours() + ' : ' + d.getMinutes() + '-' + d.toLocaleDateString(); 
    }
  },
}
</script>

<style scoped>
#col-name {
  min-width: 200px;
}
#col-price {
  min-width: 120px;
}
.img-thumb {
width: 100px;
height: 100px;
object-fit: cover;
}
td, a {
  color: white;
}
.table-order td , .table-order a {
  color: black;
}
a:hover {
  color: var(--admin-primary-color);
}
a:focus {
  box-shadow: none;
}
.btn-add a {
  text-decoration: none;
}
.btn-admin-primary {
  color: var(--admin-primary-color);
}
.row-newuser {
  height: 200px;
}
.text-danger.text-capitalize {
  top: 45px;
  left: 5px;
}
</style>