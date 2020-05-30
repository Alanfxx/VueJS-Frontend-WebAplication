<template>
  <div class="peca-detalhe" v-show="mostrarDetalhes">
    <div class="imagem-peca-detalhe">
      <img :src="require(`@/assets/pecas/${item.name}.png`)" alt="Sem imagem" />
    </div>
    <div class="conteudo-peca-detalhe">
      <div class="campos-peca-detalhe">
        <div>
          <span class="chaves-peca-detalhe">Nome:</span>
          <span v-show="!editing.status">{{item.name}}</span>
          <input
            class="input-peca-detalhe"
            type="text"
            required
            v-model="itemEditing.name"
            v-show="editing.status"
            disabled
          />
        </div>
        <div>
          <span class="chaves-peca-detalhe">Referência:</span>
          <span v-show="!editing.status">{{item.ref}}</span>
          <input
            class="input-peca-detalhe"
            type="text"
            required
            v-model="itemEditing.ref"
            v-show="editing.status"
          />
        </div>
        <div>
          <span class="chaves-peca-detalhe">Quantidade:</span>
          <span v-show="!editing.status">{{item.quant}}</span>
          <input
            class="input-peca-detalhe"
            type="number"
            required
            v-model="itemEditing.quant"
            v-show="editing.status"
          />
        </div>
      </div>
      <div class="botoes-peca-detalhe">
        <div v-show="editing.status">
          <b-button size="sm" variant="warning" @click="confirmEdicao">Aplicar</b-button>
          <b-button size="sm" class="ml-3" @click="cancelarEdicao">Cancelar</b-button>
        </div>
        <div v-show="processing.status">
          <b-spinner type="grow" variant="info"></b-spinner>
        </div>
        <div v-show="!editing.status && !processing.status">
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
      // editing: false,
      itemEditing: {},
      processing: this.$store.state.global.processing
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
.peca-detalhe {
  display: flex;
  flex-direction: column;
}
.imagem-peca-detalhe {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}
.imagem-peca-detalhe img {
  position: relative;
  margin: 0 auto;
  max-height: 120px;
}
.conteudo-peca-detalhe {
  width: 100%;
  padding: 5px 0 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.campos-peca-detalhe {
  padding: 5px 0;
  display: flex;
  flex-direction: column;
}
.campos-peca-detalhe div {
  display: flex;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 6px;
}
.campos-peca-detalhe span {
  display: block;
  width: 100%;
  text-align: left;
  padding: 1px 6px;
}
.campos-peca-detalhe .chaves-peca-detalhe {
  color: #888;
  width: 70%;
}
.input-peca-detalhe {
  width: 100%;
  border: 1px dashed #bbb;
  border-radius: 5px;
  padding: 0 5px;
}
.botoes-peca-detalhe div {
  height: 35px;
}
@media (max-width: 900px) {
  .imagem-peca-detalhe {
    width: 100%;
  }
  .conteudo-peca-detalhe {
    padding: 3px;
  }
  .campos-peca-detalhe div {
    padding: 3px 5px;
  }
}
</style>