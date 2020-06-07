<template>
  <div class="ferramenta-detalhe" v-show="mostrarDetalhes">
    <div class="imagem-ferramenta-detalhe">
      <img :src="require(`@/assets/semImagem.png`)" alt="Imagem da ferramenta" />
    </div>
    <div class="conteudo-ferramenta-detalhe">
      <div class="campos-ferramenta-detalhe">
        <div>
          <span class="chaves-ferramenta-detalhe">Nome:</span>
          <span v-show="!editing.status">{{item.name}}</span>
          <input
            class="input-ferramenta-detalhe"
            type="text"
            required
            v-model="itemEditing.name"
            v-show="editing.status"
            disabled
          />
        </div>
        <div>
          <span class="chaves-ferramenta-detalhe">Quantidade:</span>
          <span v-show="!editing.status">{{item.quant}}</span>
          <input
            class="input-ferramenta-detalhe"
            type="number"
            required
            v-model="itemEditing.quant"
            v-show="editing.status"
          />
        </div>
      </div>
      <div class="botoes-ferramenta-detalhe">
        <div v-show="editing.status">
          <b-button size="sm" variant="warning" @click="confirmEdicao">Aplicar</b-button>
          <b-button size="sm" class="ml-3" @click="cancelarEdicao">Cancelar</b-button>
        </div>
        <div v-show="ctrlGlobal.processing">
          <b-spinner type="grow" variant="info"></b-spinner>
        </div>
        <div v-show="!editing.status && !ctrlGlobal.processing">
          <b-icon
            variant="warning"
            icon="pencil-square"
            style="width: 26px; height: 26px; cursor: pointer;"
            @click="startEdit"
          ></b-icon>
          <b-icon
            variant="danger"
            icon="trash"
            class="ml-5"
            style="width: 26px; height: 26px; cursor: pointer;"
            @click="confirmExclusao"
          ></b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDetalhes",
  props: ["item", "mostrarDetalhes", "editing"],
  data: function() {
    return {
      itemEditing: {},
      ctrlGlobal: this.$store.state.global.ctrlGlobal
    };
  },
  methods: {
    startEdit() {
      this.itemEditing = { ...this.item };
      this.editing.status = true;
    },
    cancelarEdicao() {
      this.itemEditing = {};
      this.editing.status = false;
    },
    confirmEdicao() {
      this.$bvModal
        .msgBoxConfirm("Confirma a alteração?", {
          // title: 'Please Confirm',
          size: "sm",
          buttonSize: "sm",
          okVariant: "warning",
          okTitle: "Sim",
          cancelTitle: "Não",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.$emit("editar", this.itemEditing);
          } else {
            this.itemEditing = {};
          }
          this.editing.status = false;
        });
    },
    confirmExclusao() {
      this.$bvModal
        .msgBoxConfirm("Confirma a exclusão?", {
          // title: 'Please Confirm',
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Sim",
          cancelTitle: "Não",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.$emit("remove");
          }
        });
    }
  }
};
</script>

<style>
.ferramenta-detalhe {
  display: flex;
  flex-direction: column;
}
.imagem-ferramenta-detalhe {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}
.imagem-ferramenta-detalhe img {
  position: relative;
  margin: 0 auto;
  max-height: 120px;
}
.conteudo-ferramenta-detalhe {
  width: 100%;
  padding: 5px 0 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.campos-ferramenta-detalhe {
  padding: 5px 0;
  display: flex;
  flex-direction: column;
}
.campos-ferramenta-detalhe div {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 3px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 3px;
  font-size: 1rem;
}
.campos-ferramenta-detalhe span {
  display: block;
  width: 100%;
  text-align: left;
  padding: 1px 6px;
}
.campos-ferramenta-detalhe .chaves-ferramenta-detalhe {
  color: #888;
  width: 70%;
}
.input-ferramenta-detalhe {
  width: 100%;
  border: 1px solid orange;
  border-radius: 3px;
  padding: 1px 5px;
}
.botoes-ferramenta-detalhe div {
  height: 35px;
}
@media (max-width: 900px) {
  .imagem-ferramenta-detalhe {
    width: 100%;
  }
  .conteudo-ferramenta-detalhe {
    padding: 3px;
  }
  .campos-ferramenta-detalhe div {
    padding: 3px 5px;
  }
}
</style>