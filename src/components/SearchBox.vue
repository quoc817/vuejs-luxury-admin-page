<template>
    <div class="search-box">
        <i class="far fa-search"></i>
        <input 
            type="text" class="form-control" placeholder="Search ..."
            
            @keyup="$emit('searching', $event.target.value)"
            >
        <!-- <input 
            type="text" class="form-control" placeholder="Search ..."
            :value="value"
            v-on="inputListeners"
            > -->
    </div>
</template>

<script>
export default {
    name: 'SearchBox',
    // props: ['value'],
    data: function () {
        return {
            
        }
    },
    computed: {
        inputListeners: function () {
            var vm = this;
            return Object.assign(
                {},
                // get all listeners
                this.$listeners,
                // add custom event or override behavior of some listeners
                {
                   input: function (event) {
                        vm.$emit('input', event.target.value)
                   } 
                }
               
            )
        }
    }
}
</script>

<style scoped>
    .search-box {
        position: relative; 
    }
    .search-box input {
        height: 34px;
        border-radius: 20px;
        padding-left: 35px;
        border-color: #ddd;
        box-shadow: none;
    }
	.search-box input:focus {
		border-color: #3FBAE4;
	}
    .search-box i {
        color: #a0a5b1;
        position: absolute;
        font-size: 19px;
        top: 8px;
        left: 10px;
    }
</style>