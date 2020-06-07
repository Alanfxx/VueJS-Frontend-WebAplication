<template>
  <div class="novo-aparelho-background">
    <div class="novo-aparelho">
      <div class="novo-aparelho-titulo">Novo Aparelho</div>
      <div class="campo-novo-aparelho">
        <div>Tipo</div>
        <div>
          <select name="Tipo" v-model="tipo">
            <option v-for="tipo in ctrlAparelho.tipos" :key="tipo" :value="tipo">{{tipo}}</option>
          </select>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Modelo</div>
        <div>
          <input name="Modelo" type="text" v-model="modelo"/>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Marca</div>
        <div>
          <input name="Marca" type="text" v-model="marca"/>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Dono</div>
        <div>
          <select name="Dono" v-model="dono">
            <option :value="{}">Não cadastrado</option>
            <option v-for="cliente in clientes" :key="cliente.nome" :value="cliente">{{cliente.nome}}</option>
          </select>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Data de Entrada</div>
        <div>
          <input name="Data de Entrada" type="datetime-local" v-model="dte"/>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Estado</div>
        <div>
          <select name="Estado" v-model="estado">
            <option value="Pendente">Pendente</option>
            <option value="Consertado" disabled>Consertado</option>
            <option value="Sem Conserto" disabled>Sem Conserto</option>
          </select>
        </div>
      </div>
      <div class="campo-novo-aparelho">
        <div>Descrição</div>
        <div>
          <textarea name="Descrição" rows="4" cols="50" v-model="descricao"></textarea>
        </div>
      </div>
      <div class="bts-novo-aparelho" v-show="!ctrlGlobal.processing">
        <a href="#" @click="cancelar">Cancelar</a>
        <b-button size="sm" variant="success" class="ml-4 mr-3 px-3"
          @click="salvarNovo">Salvar</b-button>
      </div>
      <div class="bts-novo-aparelho" v-show="ctrlGlobal.processing">
        <b-spinner class='mr-5' type="grow" variant="info"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'novoAparelho',
  data: function() {
    return {
      ctrlGlobal: this.$store.state.global.ctrlGlobal,
      ctrlAparelho: this.$store.state.aparelhos.ctrlAparelho,
      tipo: null,
      marca: null,
      modelo: null,
      dono: null,
      dte: null,
      dts: null,
      estado: 'Pendente',
      descricao: null
    }
  },
  computed: {
    clientes() {
      return this.$store.getters.clientesList
    }
  },
  methods: {
    novoAparelhoToast(msg, variant) {
      this.$bvToast.toast(msg || "Sem mensagem", {
        title: "Inventário",
        variant: variant,
        solid: true
      });
    },
    async salvarNovo() {
      if(!this.tipo) return this.novoAparelhoToast('Tipo não informado', 'danger')
      if(!this.modelo) return this.novoAparelhoToast('Modelo não informado', 'danger')
      if(!this.marca) return this.novoAparelhoToast('Marca não informada', 'danger')
      if(!this.dono) return this.novoAparelhoToast('Dono não informada', 'danger')
      if(!this.dte) return this.novoAparelhoToast('Data não informada', 'danger')

      const novoAparelho = {
        tipo: this.tipo.trim(),
        marca: this.marca.trim(),
        modelo: this.modelo.trim(),
        dono: this.dono.id ? this.dono.id : null,
        dte: Date.parse(this.dte),
        dts: this.dts, //converter pra timestamp caso exista
        estado: this.estado,
        descricao: this.descricao ? this.descricao.trim() : null
      }
      const res = await this.$store.dispatch("saveAparelho", novoAparelho);
      if (res.tipo === "sucesso") {
        this.novoAparelhoToast(res.msg, "success");
        this.cancelar()
        const res2 = await this.$store.dispatch("loadAparelhos");
        if (res2.tipo === "erro") {
          return this.novoAparelhoToast(res2.msg, "danger");
        }
        // Adicionar id do aparelho criado à lista de aparelhos do cliente
        if(novoAparelho.dono) {
          const dono = this.clientes.filter(item => item.id === novoAparelho.dono)[0]
          dono.aparelhos.push(res.id)
          await this.$store.dispatch("saveCliente", dono)
          this.$store.dispatch("loadClientes")
        }
      } else {
        this.novoAparelhoToast(res.msg, "danger");
      }
    },
    cancelar() {
      this.tipo = null
      this.marca = null
      this.modelo = null
      this.dono = null
      this.dte = null
      this.dts = null
      this.descricao = null
      this.ctrlAparelho.novo = false
    },
  }
};
</script>

<style>
.novo-aparelho-background {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #0008;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}
.novo-aparelho {
  min-width: 290px;
  min-height: 500px;
  background: rgb(237, 242, 247);
  border-radius: 5px;
  box-shadow: 0 0 20px #0004;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.novo-aparelho-titulo {
  text-align: left;
  padding: 20px;
  font-weight: 600;
  color: darkgreen;
}
.campo-novo-aparelho {
  display: grid;
  min-height: 40px;
  grid-template-columns: 180px 1fr;
  padding: 5px 10px;
  color: #444;
}
.campo-novo-aparelho div:nth-child(1) {
  display: flex;
  justify-content: flex-end;
  padding: 8px 5px 0;
}
.campo-novo-aparelho div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* background: #0002; */
  padding: 0 5px;
}
.campo-novo-aparelho input,
.campo-novo-aparelho select,
.campo-novo-aparelho textarea {
  padding: 3px 5px;
}
.bts-novo-aparelho {
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: auto;
}
</style>