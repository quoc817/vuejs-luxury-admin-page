<template>
  <div class="row">
    <form
			id="createForm"
      enctype="multipart/form-data"
      class="col-10 col-md-6 mx-auto"
    >
      <div class="form-group">
        <label for="name" class="col-form-label">Tên</label>
        <input name="name" type="text" class="form-control"  v-model="name"  placeholder="Tên *"/>
      </div>
      <div class="form-group">
        <label for="price" class="col-form-label">Giá</label>
        <input type="number" class="form-control"  name="price" v-model="price" placeholder="Giá *" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text text-dark" >Hình ảnh</span>
        </div>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input image-upload"
            name="thumbnail"
            aria-describedby="inputGroupFileAddon01"
            @change="getImg($event.target)"
          />
          <label class="custom-file-label" for="image-upload">{{fileUploadName}}</label>
        </div>
      </div>
      <div class="form-group d-flex justify-content-center">
        <img class="prev-img" alt="thumbnail preview" :src="uploadSrc" v-show="fileUploadName != ''" />
      </div>
      <div class="form-group">
        <label for="message-text" class="col-form-label">Thể loại</label>
        <div class="d-flex flex-wrap justify-content-between form-group-type">
          <div class="input-group-prepend" v-for="(type,  index) in allType" :key="index">
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                aria-checked="true"
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
        <textarea class="form-control desc-text" name="short_desc" ></textarea>
      </div>
      <button 
                type="button" 
                class="btn btn-primary mx-auto"
                :disabled="!validForm"
                @click="submit()"
                >Áp Dụng</button>
        
    </form>
  </div>
</template>

<script>
import { HOST } from "../helper/helper";
// import $ from 'jquery'

export default {
  name: "FormCreate",
  props: {},
  data: function() {
    return {
      allType: {
        first: {
          name: "Bữa Sáng",
          _name: "first",
          hasOwn: false
        },
        lunch: {
          name: "Bữa Trưa",
          _name: "lunch",
          hasOwn: false
        },
        dinner: {
          name: "Bữa Tối",
          _name: "dinner",
          hasOwn: false
        },
        snack: {
          name: "Snack",
          _name: "snack",
          hasOwn: false
        },
        soup: {
          name: "Soup",
          _name: "soup",
          hasOwn: false
        },
        pizza: {
          name: "Pizza",
          _name: "pizza",
          hasOwn: false
        }
      },
      host: HOST,
      uploadSrc: '',
      fileUploadName:'',
      isDisable: true,
      name: '',
      price: '',
    }
  },
  methods: {
    getImg: function(target) {
      if ("files" in target) {
        if (target.files.length == 0) {
          this.fileUploadName = "Chưa có tệp nào được chọn";
        } else {
          this.fileUploadName = "";
          for (let i = 0; i < target.files.length; i++) {
            this.fileUploadName += i + 1 + target.files[i].name;
          }
          // show preview
          this.readURL(target);
        }
      }
    },
    readURL: function(inputElement) {
      const reader = new FileReader();
      const vm = this;
      reader.readAsDataURL(inputElement.files[0]);
      reader.onload = function(e) {
        // console.log(this);
        vm.uploadSrc = e.target.result;
        vm.changed = true;
      };
    },
    toggleType: function (target) {
        // target.checked = true/ false -> match into checklist
        // this.allType[target.value].hasOwn = target.checked;
        //update reactive
      this.$set(this.allType[target.value], 'hasOwn', target.checked);
      this.allType = Object.assign({},this.allType);
    },
    submit: function () {
			let form = document.getElementById('createForm')
			let data = new FormData(form);
			data.append('tags', this.tagChecked.join(','))
			fetch('http://localhost:3003/dish', {
				method: 'POST',
				// headers: {
				// 	"Content-Type": 'multipart/form-data'
				// },
				body: data
			})
			.then(res => {
				// console.log(res.status)
				if(res.status == 201){
					this.$emit('created');
					// reset
					form.reset();
					this.fileUploadName = '';
					this.name = '';
					this.price = '';
				}
			})
			
		}
  },
  computed: {
    validForm : function () {
        if(this.name && this.price && this.fileUploadName) 
        return true;
        return false;
    },
    tagChecked: function () {
        let tagArr = [];
        for(let key in this.allType) {
            if ( this.allType[key].hasOwn == true) 
            {
							tagArr.push(key);
            }
        }
        return tagArr;
    }
  },
  filters: {
    vndFormat : function (number) {
      if(number) {
        let currency = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ' đ'
        return currency;
      }
      return '';
    }
  }
};
</script>

<style scoped>
span,
label {
  color: white;
}
.desc-text {
    height: 200px;
}
.custom-file-label {
	overflow: hidden;
	text-overflow: ellipsis;
	color: black;
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
</style>

