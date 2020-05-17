<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.svg" alt="Logo" />
            <!-- Input email -->
            <div role="group" style="width: 100%; margin-bottom: 20px;">
                <b-form-input type="email" id="input-live" v-model="user.email" style="margin-bottom: 0px;"
                    :state="emailState" aria-describedby="input-live-help input-live-feedback"
                    placeholder="Digite seu email" trim @keyup.enter="signin"></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                    Digite um email válido
                </b-form-invalid-feedback>
            </div>
            <!-- Input senha -->
            <div role="group" style="width: 100%; margin-bottom: 20px;">
                <b-form-input type="password" id="input-live2" v-model="user.password" style="margin-bottom: 0px;"
                    :state="passwordState" aria-describedby="input-live-help2 input-live-feedback2"
                    placeholder="Senha" trim @keyup.enter="signin"></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback2">
                    Digite uma senha válida
                </b-form-invalid-feedback>
            </div>
            <!-- Botão entrar -->
            <b-button id="bt1" :disabled="showLoading" variant="primary" @click="signin" style="width: 100%">
                <b-spinner small type="grow" v-show="showLoading"></b-spinner> {{showLoading ? ' Verificando..' : 'Entrar'}}
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
        authToast(msg, variant) {
            this.$bvToast.toast(msg || 'Sem mensagem', {
                title: 'Autenticação',
                variant: variant,
                solid: true
            })
        },
        isEmail(email) {
            let atpos=email.indexOf("@")
            let dotpos=email.lastIndexOf(".")
            let emptySpace=email.indexOf(' ')
            if (emptySpace > 0 || atpos < 1 || dotpos < atpos+2 || dotpos+2 >= email.length) return false
            return true
        },
        signin() {
            if(!this.user.email) {
                this.user.email = ''
                return this.authToast('Email não informado', 'warning')
            }
            if(!this.user.password) {
                this.user.password = ''
                return this.authToast('Senha não informada', 'warning')
            }
            if(!this.emailState || !this.passwordState)
                return this.authToast('Dados inválidos', 'danger')
            this.showLoading = true

            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.authToast("Autorizado", 'success') //trocar isso pra tooltip ou popup
                    this.showLoading = false
                    setTimeout(() => {
                        this.$store.dispatch('adicionarUser', res.data)
                        // this.$store.commit("setUser", res.data);
                        localStorage.setItem(userKey, JSON.stringify(res.data));
                        this.$router.push({ path: "/" });
                    }, 1000)
                })
                .catch(e => {
                    this.authToast(e.response ? e.response.data : 'Você ta sem internet', 'primary')
                    this.authToast('Não autenticado', 'danger')
                    this.showLoading = false
                })
        }
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
    /* background-color: rgb(238, 255, 238); */
    background-image: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
}
.auth-modal {
    background-color: #fff;
    width: 350px;
    height: 380px;
    padding: 20px 30px 30px;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.auth-modal img {
    width: 150px;
    margin: 10px 0 40px;
    user-select: none;
}
@media (max-width: 768px) {
    .auth-modal {
        background: none;
        box-shadow: none;
    }
}
</style>