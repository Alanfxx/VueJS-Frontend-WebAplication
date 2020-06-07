<template>
  <div class="aside">
    <!-- header -->
    <div class="aside-title-bar">
      <div class="aside-title" v-show="!ctrlGlobal.reduce">
        <slot name="header"/>
      </div>

      <div class='aside-button' @click="toggleReduce">
        <b-icon v-show="!ctrlGlobal.reduce" icon='arrow-bar-left' class='h4 mb-0'></b-icon>
        <b-icon v-show="ctrlGlobal.reduce" icon='arrow-bar-right' class='h4 mb-0'></b-icon>
      </div>
    </div>

    <!-- content -->
    <div class="aside-content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data: function () {
    return {
      ctrlInventario: this.$store.state.inventario.ctrlInventario,
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    }
  },
  methods: {
    toggleReduce() {
      this.ctrlGlobal.reduce = !this.ctrlGlobal.reduce
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
  /* border-right: 1px solid #ddd; */
  font-size: 1rem;
  user-select: none;
}
.aside-title-bar {
  grid-area: titleBar;
  display: flex;
  border-bottom: 1px solid #ddd;
  color: #333;
  /* background: #eee; */
  background: rgb(237,242,247);
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
  background: rgb(237,242,247);
}
</style>