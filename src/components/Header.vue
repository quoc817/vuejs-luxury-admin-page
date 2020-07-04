<template>
    <ul class="nav row align-items-center justify-content-center" >
        <li class="nav-item  col-8 col-md-6">
            <a class="nav-link" href="#">
                <img src="../assets/logo-page.png" alt="">
            </a>
        </li>
        <li v-if="userInfo" class="nav-item row row-cols-2 align-items-center justify-content-center col-4 col-lg-3 ml-auto no-gutters">
            <a class="nav-link text-right" href="#">Hi, {{user}} </a>
            <a href="#" class="btn btn-dark" @click='logout()'>
                Đăng xuất
                <i class="fad fa-sign-out">
                </i>
            </a>
            
        </li>
        <li v-else class="nav-item col-5 ml-auto d-none d-md-block ">
                <a class="nav-link" href="#">{{message}}</a>
        </li>
    </ul>
</template>

<script>


export default {
    name: 'Header',
    props: {
        message : String,
        user: Object,
    }
    ,
    data: () => {
        return {
            
        }
    },
    methods: {
        isEmpty: function (obj) {
            for(var key in obj) {
                if(Object.hasOwnProperty.call(obj, key))
                return false;
            }
            return true;
        },
        logout: function () {
            console.log('were are here')
            document.cookie = `user = ; 01 Jan 1970 00:00:00 UTC ; path = /`;
            window.location.assign('/');
        },
    },
    computed: {
        userInfo : function () {
            return !this.isEmpty(this.user)
        }
    }
    ,
    created : function() {
        
    }
}
</script>
<style scoped>
    .nav-link {
        color: black;
    }
    .img-thumb {
        width: 32px;
        height: 32px;
    }
</style>