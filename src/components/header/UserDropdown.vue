<template>
    <div class="user-dropdown">
        <div class="user-buttom">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <b-icon style="width:40px; height:40px; margin:0 8px 0 12px;" icon="person-bounding-box"></b-icon>
            </div>
            <b-icon icon="chevron-down"></b-icon>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "UserDropdown",
    computed: mapState(["user"])
};
</script>

<style>
.user-buttom {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>