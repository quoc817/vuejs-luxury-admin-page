<template>
    <!-- Start pagination -->
    <div class="row justify-content-between mx-0 px-3 mt-5">
    <p >Hiển thị {{ showingNumberCompute }} trong số {{total}} </p>
    <nav aria-label="Page navigation example">
        <ul class="pagination" >
        <li class="page-item">
            <a 
                class="page-link" href="#" aria-label="Previous"
                @click="$emit('prevPage', $event.target)"
            >
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" 
            v-for="index in pageNum " :key="index"
        >
            <a 
                v-if="index == activePage" 
                class="page-link active" href="#"
            >{{index}}</a>
            <a 
                v-else 
                @click="$emit('changePage', $event.target)"
                class="page-link" href="#"
            >{{index}}</a>

        </li>
        <li class="page-item">
            <a 
                class="page-link" href="#" aria-label="Next"
                @click="$emit('nextPage', $event.target)"
            >
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        </ul>
    </nav>
    </div>
          <!-- End pagination -->
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        activePage: Number,
        npp: Number,
        total: Number,
        pageNum: Number
    },
    data: function () {
        return {
          
        }
    },
    methods: {
       
    },
    watch: {
    },
    computed: {
        totalCompute: function () {
            return this.total
        },
        showingNumberCompute: function () {
            return this.total - ( this.npp * (this.activePage - 1) ) >= this.npp 
                    ? this.npp
                    : this.total - ( this.npp * (this.activePage - 1))
        }
    }
}
</script>

<style scoped>
p {
    color: white;
}
.page-item a:hover { 
    color: var(--admin-primary-color);
}
.page-item a.active:hover { 
    color: white;;
}
.active {
    /* border: 1px solid var(--admin-primary-color); */
    background-color: var(--admin-primary-color); 
}
</style>