<template>
  <li v-if="type == 'sideNavDropdrown'" class="nav-item px-0 mb-3">
    <a
      :class="['nav-link clearfix text-white', route == '/product' ? 'bg-dark' : '']"
      href="#"
      v-on:click.prevent="toggleRotate($event)"
      data-toggle="collapse"
      :data-target="'#'+childId"
      :aria-expanded="route == '/product' ? true : false"
      :aria-controls="childId"
      role="button"
    >
      {{text}}
      <i :class="['fas fa-caret-down dropdown-icon float-right text-white', route != '/product' ? 'dropdown-icon-rotate' : '']"></i>
      <ul class="nav product mt-2 collapse"  :class="['nav-link text-white', route  == '/product' ? 'show' : '' ]" :id="childId">
        <li
            class="nav-item w-100"
            v-for="(item, index) in dropitem "
            :key="index"
            @click.prevent.stop="active($event)"
            >
            <a  
                :class="['nav-link text-white', route + item.to == '/product/all' ? 'active' : '' ]" 
                href="#"
                :path="route + item.to"
                >
                {{item.name}}
            </a>
        </li>
    </ul>
    </a>
  </li>
  <li v-else class="nav-item px-0 mb-3" @click.prevent="active($event)">
    <a class="nav-link text-white" href="#" 
      
        :path='route' role="button">{{text}}</a>
  </li>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    route: String,
    text: String,
    collapse: Boolean,
    dropitem: Array,
    childId: String,
    type: String,
    userRole: String,
  },
  data: function() {
    return {
     
    };
  },
  methods: {
    active: function(event) {   
        // event.stopPropagation();
        // update css
        event.target.classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => {
            if(link != event.target && link.classList.contains('active')) {
                link.classList.remove('active')
            }
        })
        // show content accordingly 
        this.$emit('checkoutContent', event.target.getAttribute('path'))
    },
    toggleRotate: function() {
    // passed $event to define el
        this.$el.querySelector(".dropdown-icon").classList.toggle("dropdown-icon-rotate");
        this.$el.classList.toggle('bg-dark')
    }
  },
};

</script>

<style scoped>
* {
  color: black;
}
.dropdown-icon {
  font-size: 1rem;
  transition: transform 0.3s ease-in-out;
}
.dropdown-icon.dropdown-icon-rotate {
  transform: rotate(-90deg);
}
.nav-link.active {
    background-color:	#4c4f54;
}
.nav-item.bg-dark {
    background-color: #181924;
}
.nav-item { 
    width: 100%;
}
.nav-item:hover {
    background-color: #4638c2;
}
</style>