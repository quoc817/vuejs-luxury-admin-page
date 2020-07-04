<template>
  <div class="col row mx-auto mt-5" v-if="fetched">
    <table class="table col table-light table-striped">
      <thead >
        <tr class="thead-light">
          <th scope="col">#</th>
          <th scope="col">Tên</th>
          <th scope="col">Giá</th>
          <th scope="col">Số Lượng</th>
          <th scope="col">Tổng cộng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in viewItem.order_items " :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{product.item.name}}</td>
          <td>{{product.item.price | vndFormat(product.item.price)}}</td>
          <td>{{product.quantity}}</td>
          <td>{{product.quantity * product.item.price | vndFormat(product.quantity * product.item.price)}}</td>
        </tr>

        <tr>
          <th scope="row" colspan="4">Phí giao hàng</th>
          <td>{{viewItem.delivery_charge || 0 | vndFormat(0)}}</td>
        </tr>
        <tr>
          <th scope="row" colspan="4">Tổng thanh toán</th>
          <td>{{viewItem.order_info.amount | vndFormat(viewItem.order_info.amount)}}</td>
        </tr>
      </tbody>
    </table>
    <div class="w-100"></div>
    <button class="btn btn-primary" @click="goBack()">
      <i class="far fa-chevron-left"></i>
      <i class="far fa-chevron-left"></i>
      Trở về
    </button>
    <div class="w-100"></div>
    <!-- start user info -->
    <div class="row col-12 align-items-stretch justify-content-center mt-3 mb-5">
      <div class="col-4 col-md-6">
        <div class="card h-100">
          <div
            :class="['card-header',sColor == 1 ? 'bg-primary' : 'bg-none', sColor == 2 ? 'bg-danger' : '',sColor == 3 ? 'bg-success' : '']"
          >Trạng thái</div>
          <div class="status mx-auto my-5">
            <i
              :class="[classStatusIcon, sColor == 1 ? 'text-primary' : '', sColor == 2 ? 'text-danger' : '', sColor == 3 ? 'text-success' : '']"
            ></i>
          </div>
          <form class="d-flex justify-content-around pt-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="s-pedding"
                id="status1"
                value="P"
                :disabled="statusStage == 'A' || statusStage == 'C'"
                :checked="this.viewItem.order_info.status == 'P' ? 'checked' : false "
                @click="setViewStatus($event.target)"
              />
              <label class="form-check-label" for="status1">{{ statusTrans('P') }}</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="s-a"
                id="status2"
                value="A"
                :disabled="statusStage == 'C'"
                :checked="this.viewItem.order_info.status == 'A' ? 'checked' : false "
                @click="setViewStatus($event.target) "
              />
              <label class="form-check-label" for="status2">{{statusTrans('A') }}</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="s-complete"
                id="status3"
                value="C"
                :disabled="statusStage == 'C'"
                :checked="this.viewItem.order_info.status == 'C' ? 'checked' : false "
                @click="setViewStatus($event.target) "
              />
              <label class="form-check-label" for="status3">{{ statusTrans('C') }}</label>
            </div>
          </form>
          <button
            class="btn btn-rounded mx-auto btn-orange mt-3"
            :disabled="!changeToValidStatus"
            @click="submit()"
          >Cập nhật</button>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-header">Thông tin khách hàng</div>
          <div class="card-body">
            <ul class="list-group list-group-flush text-center">
              <li class="list-group-item">{{viewItem.order_info.custom_info.name}}</li>
              <li class="list-group-item">{{viewItem.order_info.custom_info.mail}}</li>
              <li class="list-group-item">{{viewItem.order_info.custom_info.phone}}</li>
              <li class="list-group-item">{{viewItem.order_info.custom_info.addr}}</li>
              <li
                class="list-group-item"
              >{{viewItem.order_info.custom_info.note ? viewItem.order_info.custom_info.note : 'Không có ghi chú'}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- end user info -->
  </div>
</template>

<script>
import { HOST } from "../helper/helper";

export default {
  name: "ViewInfo",
  props: {
    viewId: String
  },
  data: function() {
    return {
      viewItem: {},
      statusChanged: false,
      statusStage: "",
      fetched: false,
      changeToValidStatus: false,
      sColor: 0
    };
  },
  watch: {
    viewId: function() {
      this.fetched = false;
      this.changeToValidStatus = false;
      if(this.viewId != '')
      {
        // get all info of this view item
        this.getFulldetail();
      }
    },
    status: function() {
      if (this.viewItem.order_info.status == "P") {
        this.sColor = 1;
      }
      if (this.viewItem.order_info.status == "A") {
        this.sColor = 2;
      }
      if (this.viewItem.order_info.status == "C") {
        this.sColor = 3;
      }
    }
  },
  methods: {
    getFulldetail: async function() {
      try {
        let res = await fetch(HOST + "/order/" + this.viewId);
        // console.log(res)
        if (res.status != 200) {
          throw new Error("Fetching err" + res.status);
        } else {
          let result = await res.json();
          // assign result to viewItem -> reactive
          // this.viewItem = Object.assign({}, this.viewItem, result.result[0]);
          this.viewItem = Object.assign({}, result.result[0]);
          this.fetched = true;
          if (this.viewItem.order_info.status == "P") {
            this.statusStage = "P";
          } else if (this.viewItem.order_info.status == "A") {
            this.statusStage = "A";
          } else {
            this.statusStage = "C";
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    goBack: function() {
      this.$emit("turnBack");
    },
    statusTrans: function(text) {
      let full = ["Chờ xử lý", "Đang giao", "Hoàn thành"];
      let alias = ["P", "A", "C"];
      return full.indexOf(text) > -1
        ? alias[full.indexOf(text)]
        : full[alias.indexOf(text)];
    },
    setViewStatus: function(target) {
      this.viewItem.order_info.status = target.value;
      if (target.value == this.statusStage) {
        this.changeToValidStatus = false;
      } else {
        this.changeToValidStatus = true;
      }
    },
    submit: async function() {
      try {
        let res = await fetch(HOST + "/order/" + this.viewId, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            status: this.status
          })
        });
        // console.log(res)
        if (!res.ok) {
          throw new Error("Fetching err" + res.status);
        } else {
          this.$emit("statusUpdated", this.viewItem);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    classStatusIcon: function() {
      if (this.viewItem.order_info.status == "P") {
        return "far fa-edit status-icon";
      }
      if (this.viewItem.order_info.status == "A") {
        return "far fa-shipping-fast status-icon";
      }
      if (this.viewItem.order_info.status == "C") {
        return "fad fa-ballot-check status-icon";
      }
      return "";
    },
    status: function() {
      return Object.prototype.hasOwnProperty.call(this.viewItem, "order_info")
        ? this.viewItem.order_info.status
        : "";
    }
  },
  filters: {
    vndFormat: function(number) {
      let currency =
        number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
      return currency;
    },
    tolocaleDateTime: function(dateString) {
      let d = new Date(dateString);
      // let localeStr = d.toDateString(d);
      return (
        d.getHours() + " : " + d.getMinutes() + "-" + d.toLocaleDateString()
      );
    }
  }
};
</script>

<style scoped>
.status-icon {
  font-size: 4.5rem;
}
.btn-orange {
  background-color: var(--admin-primary-color);
}
.form-check-label {
  cursor: pointer;
}
</style>