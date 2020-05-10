<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.svg" alt="Logo" />

            <div role="group" style="width: 100%; margin-bottom: 20px;">
                <!-- <label for="input-live">Email</label> -->
                <b-form-input id="input-live" v-model="user.email" style="margin-bottom: 0px;"
                    :state="emailState" aria-describedby="input-live-help input-live-feedback"
                    placeholder="Digite seu email" trim></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                    Digite um email válido.
                </b-form-invalid-feedback>
            </div>
            <div role="group" style="width: 100%; margin-bottom: 20px;">
                <!-- <label for="input-live">Email</label> -->
                <b-form-input type="password" id="input-live2" v-model="user.password" style="margin-bottom: 0px;"
                    :state="passwordState" aria-describedby="input-live-help2 input-live-feedback2"
                    placeholder="Senha" trim></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback2">
                    Digite uma senha.
                </b-form-invalid-feedback>
            </div>

            <!-- <input v-model="user.password" name="password" type="password" placeholder="Senha" @keyup.enter="signin" /> -->

            <b-button id="bt1" :disabled="showLoading" variant="primary" @click="signin">
                <b-spinner small v-show="showLoading"></b-spinner> {{showLoading ? ' Verificando..' : 'Entrar'}}
            </b-button>
            <!-- <b-tooltip target="bt1" variant="success" placement="bottom">Iniciar <strong>autenticação</strong></b-tooltip> -->
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
            user: {
                email: null,
                password: null
            }
        };
    },
    computed: {
        emailState() {
            if(this.user.email === null) return null
            if(!this.user.email) return false
            return this.isEmail(this.user.email) ? true : false
        },
        passwordState() {
            if(this.user.password === null) return null
            if(!this.user.password) return false
            return this.user.password.length > 5 ? true : false
        }
    },
    methods: {
        toast1(msg, variant) {
            this.$bvToast.toast(msg || 'Sem mensagem', {
                title: 'Autenticação',
                variant: variant,
            })
        },
        isEmail(email) {
            let atpos=email.indexOf("@")
            let dotpos=email.lastIndexOf(".")
            if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= email.length) {
                return false
            }
            return true
        },
        signin() {
            if(!this.user.email) {
                this.user.email = ''
                return this.toast1('Email não informado.', 'warning')
            }
            if(!this.user.password) {
                this.user.password = ''
                return this.toast1('Senha não informada.', 'warning')
            }
            this.showLoading = true

            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.toast1("Autorizado.", 'success')
                    this.$store.commit("setUser", res.data);
                    localStorage.setItem(userKey, JSON.stringify(res.data));
                    this.$router.push({ path: "/" });
                })
                .catch(e => {
                    this.toast1(e.response ? e.response.data : 'Você ta sem internet', 'danger')
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
    padding: 35px 30px;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.auth-modal img {
    width: 150px;
    margin-bottom: 40px;
    user-select: none;
}
.auth-modal input {
    border: 1px solid rgb(77, 110, 77, 0.4);
    border-radius: 4px;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}
.auth-modal #bt1 {
    align-self: flex-end;
    transition: .5s ease;
    transform: 1s ease;
}
</style>