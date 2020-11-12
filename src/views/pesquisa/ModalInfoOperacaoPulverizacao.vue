<template>
    <ion-modal
        :is-open="isOpenInfo"
        @onDidDismiss="handleDidDismissOperacaoPulverizacao()"
    >
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Informações</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1><b> DADOS DA OPERAÇÃO </b> </h1>
            <ion-item>
                <ion-label>Data da Operação: {{new Date(formInfoOperacaoPulverizacao.dataOperacao).getDate()}}/{{ new Date(formInfoOperacaoPulverizacao.dataOperacao).getMonth()+1}}/{{ new Date(formInfoOperacaoPulverizacao.dataOperacao).getFullYear()}}</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Estádio Da Cultura: {{formInfoOperacaoPulverizacao.estadioDaCultura}}</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Volume de Calda: {{formInfoOperacaoPulverizacao.volumeDeCalda}}</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Pulverização Parcial: {{formInfoOperacaoPulverizacao.pulverizacaoParcial}}</ion-label>
            </ion-item>
            <h1><b> PRODUTOS </b></h1>
            <div v-for="itemProduto in formInfoOperacaoPulverizacao.produtosDaOperacao" :key="itemProduto.id">
                <div v-if="itemProduto.dosagem!==''">
                    <ion-row class="row-nome">
                        <ion-col><h2>Nome: {{itemProduto.nomeProduto}} ({{itemProduto.unidadeProduto}})</h2></ion-col>
                    </ion-row>
                    <ion-row>
                      <ion-col>Classe de Uso:</ion-col><ion-col>{{itemProduto.classeDeUso}}</ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>Alvo Principal ou Função:</ion-col><ion-col>{{itemProduto.alvo}}</ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>Dosagem do Produto(Unidade/ha):</ion-col><ion-col>{{itemProduto.dosagem}}</ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col> Preço do Produto(R$/Unidade):</ion-col><ion-col>{{itemProduto.preco}} </ion-col>
                    </ion-row>
                </div>        
            </div>
            <ion-button expand="block" @click="handleDidDismissOperacaoPulverizacao()">Fechar</ion-button>
        </ion-content>
    </ion-page>
    </ion-modal>
</template>

<script lang="ts">
import {
    IonModal,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonButton,
} from "@ionic/vue";
import { defineComponent, SetupContext, reactive, watch } from "vue";

export default defineComponent({
  name: "ModalInfoOperacaoPulverizao",
  components: {
    IonModal,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonButton,
  },
  props: {
    isOpenInfo: {
      default: false,
      required: true,
    },
    initialValues: {
      default: {},
    },
  },
  setup(props: any, ctx: SetupContext) {
    const formInfoOperacaoPulverizacao = reactive<any>({
      dataOperacao: "",
      estadioDaCultura: "",
      volumeDeCalda: "",
      pulverizacaoParcial: "",
      produtosDaOperacao: [],
    });

    const classeDeUso = [];
    classeDeUso.push({
        nome: "Adjuvante"
    });
    classeDeUso.push({
        nome: "Herbicida"
    });
    classeDeUso.push({
        nome: "Fungicida"
    });

    watch(
      () => props.initialValues,
      (newVal) => {
        if (newVal) {
          Object.assign(formInfoOperacaoPulverizacao, props.initialValues);
        }
      }
    );

    const handleDidDismissOperacaoPulverizacao = () => {
      //emit evento
      ctx.emit("modal-info-fechado");
    };

    return {
      //functions
      handleDidDismissOperacaoPulverizacao,

      //proprieties
      formInfoOperacaoPulverizacao,
      classeDeUso,

      //icons
    };
  },
});
</script>

<style scoped>
    ion-row, ion-item {
        width: 100%;
    } 
    ion-row {
      border-bottom: 1px solid rgba(197, 197, 197, 0.89);
      padding: 2px;
    }
    h1{
        color: white;
        background-color: black;
        text-align: center;
        font-size: 20px;
    }
    h2{
        font-size: 16px;
        border-bottom: 1px solid black;
        margin-bottom: 0;
    }
    .row-nome{
      border-bottom: 0;
    }
</style>