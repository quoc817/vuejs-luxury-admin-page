<template>
    <!-- Modal -->
<div class="modal fade" id="modalDelete" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalDelete">Xóa</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="h2"> Việc xóa dữ liệu sẽ làm dữ liệu mất đi vĩnh viễn !!!</div>
      </div>
      <div class="form-group mx-3">
              <label for="delete-text h6" class="col-form-label h6">Nhập lại <span class="text-danger">delete</span> để thực hiện xóa</label>
              <input 
                    type="text" class="form-control" 
                    id="delete-text"
                    v-model="textConfirm"
                     />
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Thoát</button>
        <button 
                type="button" 
                :class="['btn', 'btn-danger']"
                :disabled="isDisable"
                @click="deleteFunc()"
                >Xóa
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
    name: 'FormDelete',
    props: {
        itemDelete: Object
    },
    data: function () {
        return {
            textConfirm: ''
        }
    },
    methods: {
        deleteFunc: function () {
            // hide this
            $('#modalDelete').modal('hide');
            // show toast
            // $('#modalNotify').modal('show');

            // turn back
            this.$emit('deleteCommit', this.itemDelete)
        }
    },
    computed: {
        isDisable: function () {
            return this.textConfirm == 'delete' ? false : true
        }
    }
}
</script>

<style scoped>
.modal-dialog {
    max-width: 400px;
}
</style>