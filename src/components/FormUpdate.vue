<template>
  <div
    class="modal fade"
    id="modalUpdate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"

    >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cập nhật</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <!-- start update product -->
        <form 
            id="updateProduct"
            v-if="update == 'product'"
            >
            <div class="form-group">
                <label for="name" class="col-form-label">Tên</label>
                <input 
                    name="name"
                    type="text" class="form-control" 
                    v-model="itemClone.name"
                    @focus="changed = true"
                        />
            </div>
            <div class="form-group">
                <label for="price" class="col-form-label">Giá</label>
                <input 
                    type="number" class="form-control" 
                    name="price"
                    v-model="itemClone.price"
                    @focus="changed = true"
                    />
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Hình ảnh</span>
                </div>
                <div class="custom-file">
                    <input 
                        type="file" 
                        class="custom-file-input image-upload" 
                        name="thumbnail"
                        aria-describedby="inputGroupFileAddon01"
                        @change="getImg($event.target)"
                        >
                    <label class="custom-file-label" for="image-upload">{{fileUploadName}}</label>
                </div>
            </div>
            <div class="form-group d-flex justify-content-center">
                <img 
                    class="prev-img" 
                    :src="imgPrevSrc" alt="thumbnail preview">
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">Thể loại</label>
                <div class="d-flex flex-wrap justify-content-between form-group-type">
                <div 
                    class="input-group-prepend"
                    v-for="(type,  index) in checkedList" :key="index"
                    >
                    <div class="input-group-text">
                        <input 
                            type="checkbox" aria-label="Checkbox for following text input" aria-checked="true" 
                            name="productType"
                            :value="index"
                            :checked="type.hasOwn"
                            @click="toggleType($event.target)"
                            />
                    </div>
                    <span class="radido-label">{{type.name}}</span>
                </div>
                </div>
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label" >Mô tả</label>
                <textarea 
                    name="short_desc" 
                    class="form-control desc-text " 
                    v-model="itemClone.short_desc"
                    @focus="changed = true"
                    ></textarea>
            </div>
        </form> 
        <!-- end update product -->
        <!-- start update booking -->
         <form 
            id="updateBooking"
            v-if="update == 'booking'"
            >
            <div class="form-group">
                <label for="name" class="col-form-label">Ngày</label>
                <input 
                    name="date"
                    type="date" class="form-control" 
                    v-model="itemClone.date"
                    @change="changed = true"
                        />
            </div>
            <div class="form-group">
                <label for="price" class="col-form-label">Giờ</label>
                <input 
                    type="text" class="form-control" 
                    name="time"
                    v-model="itemClone.time"
                    @focus="changed = true"
                    />
            </div>
            <div class="form-group">
                <label for="price" class="col-form-label">Số người</label>
                <input 
                    type="number" class="form-control" 
                    name="guest"
                    v-model="itemClone.guest"
                    @focus="changed = true"
                    />
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label" >Mô tả</label>
                <textarea 
                    name="short_desc" 
                    class="form-control desc-text " 
                    v-model="itemClone.note"
                    @focus="changed = true"
                    ></textarea>
            </div>
            <div class="form-group">
                <label for="confirm">Kiểm tra</label>
                <select 
                    :class="['form-control', bookingStatusStyle]" 
                    id="confirm"
                    @change="changed = true"
                    >
                    <option value="1" :selected="itemClone.confirm == 'no' ? 'selected' : ''">Chưa xác nhận</option>
                    <option value="0" :selected="itemClone.confirm == 'yes' ? 'selected' : ''">Đã xác nhận</option>
                </select>
            </div>
        </form> 
        <!-- end update booing --> 

        <!-- start update user -->
         <form 
            id="updateUser"
            v-if="update == 'user'"
            >
             <div class="form-group mb-3 position-relative">
                <label for="username" class="col-form-label">Tên đăng nhập</label>
                <input 
                    name="username"
                    type="text" class="form-control" 
                    v-model="newUser.username"
                    @focus="changed = true"
                    />
                <span for="name" class="text-danger text-capitalize " v-if="userNameHelpText && newUser.username"> {{userNameHelpText}} </span>
            </div>
            <div class="form-group mb-3 position-relative">
                <label for="username" class="col-form-label">Mật khẩu</label>
                <input 
                    name="name"
                    type="text" class="form-control" 
                    v-model="newUser.password"
                    @focus="changed = true"
                    />
                    <span for="name" class="text-danger text-capitalize" v-if="userPassHelpText && newUser.password"> {{userPassHelpText}} </span>
            </div>
            <div class="form-group mb-0">
                <select 
                    class="form-control" 
                    v-model="newUser.role"
                    @change="changed = true"
                    >
                    <option value="admin" >Admin</option>
                    <option value="manager" >Quản Lí</option>
                    <option value="staff" selected="selected" >Nhân Viên</option>
                </select>
            </div>
        </form> 
        <!-- end update user -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
          <button 
                v-if="update == 'user'"
                type="button" 
                class="btn btn-primary"
                :disabled=" (!validateUser && isDisable) || ( validateUser && isDisable) "
                @click="apply($event)"
                >Lưu Lại
            </button>
          <button 
                v-else
                type="button" 
                class="btn btn-primary"
                :disabled="isDisable"
                @click="apply($event)"
                >Lưu Lại
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import {HOST} from '../helper/helper';

export default {
  name: "FormUpdate",
  props: {
    itemToUpdate: Object,
    update: String
  },
  data: function () {
    return {
       allType: {                   //-- product
        first:
        {
            name: 'Bữa Sáng',
            _name: 'first',
            hasOwn: false
        },
        lunch:
        {
            name: 'Bữa Trưa',
            _name: 'lunch',
            hasOwn: false
        },
        dinner:  
        {
            name: 'Bữa Tối',
            _name: 'dinner',
            hasOwn: false
        },
        snack:  
        {
            name: 'Snack',
            _name: 'snack',
            hasOwn: false
        },
        soup:  
        {
            name: 'Soup',
            _name: 'soup',
            hasOwn: false
        },
        pizza: {
            name: 'Pizza',
            _name: 'pizza',
            hasOwn: false
        },
       },
       fileUploadName: 'Tải lên',
       uploadSrc: '',
       changed: false,

       host: HOST,

       newUser: {          //--user : new user object
        username: '',
        password: '',
        role: 'staff'
      },
    }
  },
  methods: {
    apply: function () {
        if(this.update == 'product') {
            this.productApplyChage();
        }
        else if (this.update == 'booking') {
            this.bookingApplyChange()
        }
        else if (this.update == 'user') {
            this.usertApplyChage()
        }
    },
    bookingApplyChange: function () {
        // turn back data to parent component
        this.$emit('bookingUpdated', this.itemClone);

        // close modalUpdate
        // .....
         $('#modalUpdate').modal('hide');
    },
    getImg: function (target) {
        if('files' in target) {
            if(target.files.length == 0 ) {
                this.fileUploadName = 'Chưa có tệp nào được chọn'
            }
            else {
                this.fileUploadName = '';
                for(let i = 0 ; i < target.files.length ; i++) {
                    this.fileUploadName += i + 1 + target.files[i].name;
                }
                // show preview
                this.readURL(target);
            }
        }
    },
    readURL: function (inputElement) {
        const reader = new FileReader();
        const vm = this;
        reader.readAsDataURL(inputElement.files[0]);
        reader.onload = function (e) {
            // console.log(this);
            vm.uploadSrc = e.target.result;
            vm.changed = true;
        }
    },
    resetInfoUploaded: function () {
        this.uploadSrc =  '';
        this.fileUploadName ='Tải lên';
    },
    toggleType: function (target) {
        // target.checked = true/ false -> match into checkedlist
       this.checkedList[target.value].hasOwn = target.checked;
       this.changed = true;
    },
    productApplyChage: function () {
        const tagUpdated = [];
        for(let key in this.checkedList) {
            if(this.checkedList[key].hasOwn == true) {
                tagUpdated.push(key)
            }
        }
        this.itemClone.tag = tagUpdated.join(',');
        console.log(this.itemClone)
        this.itemClone.img = this.imgPrevSrc != '' ? this.imgPrevSrc :  this.imgOriginSrc;

        // turn back data to parent component
        this.$emit('productUpdated', this.itemClone);

        // close modalUpdate
        // .....
         $('#modalUpdate').modal('hide');
    },
    usertApplyChage: function () {
        
        this.$emit('userUpdated', this.newUser);

        // close modalUpdate
        // .....
         $('#modalUpdate').modal('hide');
    }
  },
  watch: {
    imgOriginSrc : function() {
       this.resetInfoUploaded();
    },
    id: function () {
        this.changed = false;
        this.newUser = Object.assign({},this.itemToUpdate);
    }
  }
  ,
  computed: {
    itemClone: function () {
        return this.itemToUpdate
    },
    checkedList: function () {
        const allTypeClone = JSON.parse(JSON.stringify(this.allType));
        // Object.assign(allTypeClone, this.allTypeClone);
        if(this.itemToUpdate.tag)
        {
            const hasType = [... new Set(this.itemToUpdate.tag.split(','))];
            for (const key in allTypeClone) {
                if(Array.prototype.indexOf.call(hasType, key) > -1) {
                    allTypeClone[key].hasOwn = true;
                }
            }
        }
       return allTypeClone;
    },
    imgPrevSrc: function() {
        return this.uploadSrc == '' ? this.itemClone.img : this.uploadSrc;
    },
    imgOriginSrc: function () { 
        return this.itemClone.img;
    },
    isDisable: function () {
        return this.changed ? false : true;
        
    },
    id: function () {
        return this.itemToUpdate._id;
    },
    bookingStatusStyle: function () {
        return this.itemClone.confirm == 'yes' ? 'border-success' : 'border-primary'
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
  }
}
 
</script>

<style scoped>
.desc-text {
    height: 200px;
}
.custom-file-label {
    overflow: hidden;
   text-overflow: ellipsis;
}
.custom-file-label::after {
   display: none;
}
.form-group-type .input-group-prepend {
    width: 33.33%;
    margin-bottom: 1rem;
}
.form-group-type .radido-label {
    margin-left: 1rem;
}
.prev-img {
    width: 200px;
    height: 200px;
}
.border-success {
    border: 2px solid var(--success);
}
.border-primary {
    border: 2px solid var(--primary);
}
</style>