<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.svg" alt="Logo" />
            <!-- <hr /> -->
            <!-- <div class="auth-title">Login</div> -->
            <input v-model="user.email" name="email" type="text" placeholder="E-mail" />
            <input v-model="user.password" name="password" type="password" placeholder="Senha" />
            <!-- <button @click="signin">Entrar</button> -->
            <b-button class="bt1" :disabled="showLoading" variant="primary" @click="signin">
                <b-spinner small v-show="showLoading"></b-spinner> {{showLoading ? ' Carregando...' : 'Entrar'}}
            </b-button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";
export default {
    name: "Auth",
    data: function() {
        return {
            showLoading: false,
            showSignup: false,
            user: {}
        };
    },
    methods: {
        signin() {
            this.showLoading = true
            axios.post(`${baseApiUrl}/signin`, this.user)
            .then(res => {
                this.$store.commit("setUser", res.data);
                localStorage.setItem(userKey, JSON.stringify(res.data));
                this.$router.push({ path: "/" });
            })
            .catch(() => {
                this.showLoading = false
            })
        }
        // signup() {
        //     axios.post(`${baseApiUrl}/signup`, this.user)
        //         .then(() => {
        //             this.$toasted.global.defaultSuccess()
        //             this.user = {}
        //             this.showSignup = false
        //         })
        //         .catch(showError)
        // }
    }
};
</script>

<style>
.auth-content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(238, 255, 238);
}
.auth-modal {
    background-color: #fff;
    width: 350px;
    padding: 35px;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.auth-modal img {
    width: 150px;
    margin-bottom: 40px;
}
.auth-modal input {
    border: 1px solid rgb(77, 110, 77, 0.4);
    border-radius: 4px;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}
/* .auth-title {
    font-size: 1.5rem;
    font-weight: 100;
    margin-bottom: 10px;
} */
/* .auth-modal button {
    align-self: flex-end;
    background-color: #2460ae;
    color: #fff;
    padding: 5px 15px;
} */

.auth-modal .bt1 {
    align-self: flex-end;
    transition: 0.5 cubic-bezier(0.165, 0.84, 0.44, 1);
}
/* .auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0)
    );
} */
</style>