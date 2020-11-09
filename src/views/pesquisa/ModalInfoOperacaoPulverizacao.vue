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
        <ion-content>
            <ion-label><b> DADOS DA OPERAÇÃO </b> </ion-label>
            <ion-item>
                <ion-label position="floating">Data da Operação </ion-label>
                <ion-icon slot="end" color="tertiary" :icon="calendar"></ion-icon>
                <ion-datetime
                    display-format="DD-MM-YYYY"
                    v-model="formInfoOperacaoPulverizacao.dataOperacao"
                >
                </ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Estádio Da Cultura</ion-label>
                <ion-input v-model="formInfoOperacaoPulverizacao.estadioDaCultura"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Volume de Calda</ion-label>
                <ion-input v-model="formInfoOperacaoPulverizacao.volumeDeCalda"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Pulverização Parcial</ion-label>
                <ion-input v-model="formInfoOperacaoPulverizacao.pulverizacaoParcial"></ion-input>
            </ion-item>
            <ion-label><b> PRODUTOS </b></ion-label>
            <div v-for="itemClasseDeUso in classeDeUso" :key="itemClasseDeUso.nome">
                <ion-item-divider>
                    <ion-label>{{itemClasseDeUso.nome}}</ion-label>
                </ion-item-divider>
            <ion-list v-for="itemProduto in formInfoOperacaoPulverizacao.produtosDaOperacao" :key="itemProduto.id">
                <ion-item v-if="itemProduto.classeDeUso===itemClasseDeUso.nome">
                    <ion-row>
                        <ion-label> Nome: {{itemProduto.nomeProduto}}</ion-label>
                    </ion-row>
                    <ion-row>
                        <ion-label position="stacked">Alvo Principal ou Função</ion-label>
                        <ion-select
                            placeholder="Selecionar"
                            :value="itemProduto.alvo"
                            @ionChange="itemProduto.alvo= $event.target.value"
                            ok-text="Confirmar" cancel-text="Cancelar"                    
                        >
                            <div v-for="itemAlvo in alvo" :key="itemAlvo.id" >
                                <ion-select-option v-if="itemAlvo.classeDeUso===itemClasseDeUso.nome">
                                    {{itemAlvo.nome}}                   
                                </ion-select-option>
                            </div>
                        </ion-select>
                    </ion-row>
                    <ion-row>
                        <ion-label position="stacked">Dosagem do Produto(Unidade/ha)</ion-label>
                        <ion-input type="number" v-model="itemProduto.dosagem"></ion-input>
                    </ion-row>
                    <ion-row>
                        <ion-label position="stacked">Preço do Produto(R$/Unidade)</ion-label>
                        <ion-input type="number" v-model="itemProduto.preco"></ion-input>
                    </ion-row>
                </ion-item>        
            </ion-list>
            </div>

            <ion-button @click="handleDidDismissOperacaoPulverizacao()">Fechar</ion-button>
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
    IonInput,
    IonDatetime,
    IonItem,
    IonButton,
    IonIcon,
} from "@ionic/vue";
import { defineComponent, SetupContext, reactive, watch } from "vue";
import { calendar } from "ionicons/icons";

export default defineComponent({
  name: "ModalInfoOperacaoPulverizao",
  components: {
    IonModal,
    IonPage,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonInput,
    IonDatetime,
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
      calendar,
    };
  },
});
</script>

<style scoped>
    ion-row, ion-item {
        width: 100%;
    } 
    ion-row {
        display: block;
    }
</style>