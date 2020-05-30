<template>
  <div class="aside">
    <!-- header -->
    <div class="aside-title-bar">
      <div class="aside-title" v-show="!reduce.status">
        <slot name="header"/>
      </div>

      <div class='aside-button' @click="toggleReduce">
        <b-icon v-show="!reduce.status" icon='arrow-bar-left' class='h4 mb-0'></b-icon>
        <b-icon v-show="reduce.status" icon='arrow-bar-right' class='h4 mb-0'></b-icon>
      </div>
    </div>

    <!-- content -->
    <div class="aside-content">
      <b-input-group class="p-2 my-2" size='sm'>
        <b-input-group-prepend>
          <b-button 
            :id="idToggle"
            variant="outline-dark" @click="buscar">
            <b-icon icon='search' size='sm'></b-icon>
          </b-button>
        </b-input-group-prepend>
        <b-form-input v-show="!reduce.status" placeholder='Buscar'
          type="text" id='aside-pesquisa'></b-form-input>
      </b-input-group>
      
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  props: ['reduce'],
  computed: {
    idToggle() {
      if(this.reduce.status) return 'aside-bt-pesquisa'
      return ''
    }
  },
  methods: {
    toggleReduce() {
      this.reduce.status = !this.reduce.status
    },
    buscar() {
      if(this.reduce.status === true) {
        this.reduce.status = false
        setTimeout(() => {
          document.querySelector("#aside-pesquisa").focus()
        }, 100)
      }
      // ...
    }
  }
}
</script>

<style>
.aside {
  grid-area: aside;
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "titleBar" "content";
  border-right: 1px solid #ccc;
  font-size: 1rem;
  user-select: none;
}
.aside-title-bar {
  grid-area: titleBar;
  display: flex;
  border-bottom: 1px solid #ccc;
  color: #333;
  background: #eee;
}
.aside-title-bar .aside-title {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.aside-button {
  width: 44px;
  height: 34px;
  margin: 3px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.aside-button:hover {
  background: #0001;
}
.aside-content {
  grid-area: content;
  overflow-y: auto;
  overflow-x: hidden;
  color: #333;
  font-size: 1.1rem;
}
#aside-pesquisa {
  max-width: 500px;
  border: 1px solid #444;
}
#aside-bt-pesquisa {
  border-radius: 6px;
  border: 1px solid transparent;
}
#aside-bt-pesquisa:hover {
  background: #0001;
  color: #111;
}
</style>