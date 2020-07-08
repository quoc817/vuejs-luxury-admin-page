<template>

   <!-- Position it -->
    <div id="toastParent" class="onhide" aria-live="polite" aria-atomic="true">
    <!-- Then put toasts within -->
    <div id="toastNotify" class="toast fade hide" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto text">Luxury-Restaurant</strong>
        <!-- <small class="text-muted">just now</small> -->
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body h4">
        <slot>notify</slot>  <i class="fad fa-check text-success"> </i>
      </div>
    </div>
    </div>
<!-- </div> -->

</template>

<script>
export default {
    name: 'ToastNotify',
    props: {
        notifyType: String
    }
}
</script>

<style scoped>
.onshow {
  position: fixed; 
  top: 72px; 
  right: 27px; 
  z-index: 1000;
}
.onhide {
  position: absolute; 
  top: 72px; 
  right: 27px; 
  z-index: -1;
}

.toast {
    min-width: 300px;

}
.toast-header {
    background-color: var(--admin-primary-color);
}
</style>