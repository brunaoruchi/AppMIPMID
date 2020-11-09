<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pesquisa"></ion-back-button>
        </ion-buttons>
        <ion-title>Operações de Pulverização</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div>
        <modal-operacao-pulverizacao :is-open="modalPulverizaoInfo.show" :initialValues= "modalPulverizaoInfo.data" @modal-operacao-fechado="handleModalClosed" />
      </div>
      <div>
        <modal-info-operacao-pulverizacao :is-open="modalOperacaoPulverizacaoStatus.showOperacaoPulverizacao" :initialValues= "modalOperacaoPulverizacaoStatus.data" @modal-info-fechado="handleModalInfoClosed" />
      </div>
      
      <div v-for="item in displayList" :key="item.id">
        <ion-item>
          <ion-label>
            <div class="ion-text-wrap">Data: {{ new Date(item.dataOperacao).getDate()}}-{{ new Date(item.dataOperacao).getMonth()+1}}-{{ new Date(item.dataOperacao).getFullYear()}}</div>
            <div class="ion-text-wrap">Responsável Técnico: {{item.responsavelTecnico}}</div>
            <div class="ion-text-wrap">Última Alteração: {{ new Date(item.ultimaAlteracao).getDate()}}-{{ new Date(item.ultimaAlteracao).getMonth()+1}}-{{ new Date(item.ultimaAlteracao).getFullYear()}}</div>
          </ion-label>
          
          <div>
            <ion-button @click="handleReadOperacaoPulverizacao(item)" slot="end">
              <ion-icon :icon="reader" slot="icon-only" ></ion-icon>
            </ion-button>
            
            <ion-button color="warning" @click="handleEditOperacaoPulverizacao(item)" slot="end">
              <ion-icon color="light" :icon="pencil" slot="icon-only" ></ion-icon>
            </ion-button>
            <ion-button @click.self="handleDeleteOperacaoPulverizacao(item)" slot="end" fill="clear">
              <ion-icon color="danger" :icon="trashSharp" slot="icon-only" ></ion-icon>
            </ion-button>
          </div>
        </ion-item>
      </div>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="showModalAlvo">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonIcon, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonBackButton, IonButton, IonFabButton, IonFab } from '@ionic/vue';
import { computed, defineComponent, reactive, } from 'vue';
import { add, pencil, trashSharp, reader, shareSharp } from 'ionicons/icons';
import { useRouter } from 'vue-router';

import ModalOperacaoPulverizacao from "./ModalOperacaoPulverizacao.vue";
import dataStore from "../../datastoreOperacaoPulverizacao";

import ModalInfoOperacaoPulverizacao from "./ModalInfoOperacaoPulverizacao.vue";


export default defineComponent({
  name: 'OperacaoDePulverizacao',
  components: {
    IonItem,
    IonContent,
    IonLabel,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFabButton,
    IonFab,
    IonButtons,
    IonBackButton,
    ModalOperacaoPulverizacao,
    IonIcon,
    ModalInfoOperacaoPulverizacao,
    IonButton,
  },

  setup() {
    const { listDataOperacaoPulverizacao, deleteOperacaoPulverizacao, addOrUpdateOperacaoPulverizacao } = dataStore()

    const modalPulverizaoInfo = reactive<{ show: boolean; data: any}>({
      show: false,
      data: null,
    });

    const displayList = computed(()=> Array.from(listDataOperacaoPulverizacao.values()));

    const showModalAlvo = () => {
      modalPulverizaoInfo.show = true;
    };

    //Edit Alvo
    const handleEditOperacaoPulverizacao = (item: any) => {
      modalPulverizaoInfo.show = true;
      modalPulverizaoInfo.data = item;
    }

    //Delete Alvo
    const handleDeleteOperacaoPulverizacao = (item: any) => {
      deleteOperacaoPulverizacao(item);
    }

    const handleModalClosed = (eventData: any) => {
      modalPulverizaoInfo.show = false;
      if(eventData.isCancelled){
        alert("Cancelado")
      }else{
        if(eventData.formInfoOperacaoPulverizacao.id){
          addOrUpdateOperacaoPulverizacao(eventData.formInfoOperacaoPulverizacao, eventData.formInfoOperacaoPulverizacao.id);
        }else{
          addOrUpdateOperacaoPulverizacao(eventData.formInfoOperacaoPulverizacao);
        }
        modalPulverizaoInfo.data = null;
      }
    };

    //Modal 2
    const modalOperacaoPulverizacaoStatus = reactive<{ showOperacaoPulverizacao: boolean; data: any}>({
      showOperacaoPulverizacao: false,
      data: null,
    });

    const handleReadOperacaoPulverizacao = (item: any) => {
      modalOperacaoPulverizacaoStatus.showOperacaoPulverizacao = true;
      modalOperacaoPulverizacaoStatus.data = item;
    };

    const handleModalInfoClosed = () => {
      modalOperacaoPulverizacaoStatus.showOperacaoPulverizacao = false;
      modalOperacaoPulverizacaoStatus.data = null;
    };
    

    return {
      router: useRouter(),

     

      //function
      showModalAlvo,
      handleModalClosed,
      handleDeleteOperacaoPulverizacao,
      handleEditOperacaoPulverizacao,

      handleModalInfoClosed,
      handleReadOperacaoPulverizacao,
      modalOperacaoPulverizacaoStatus,

      //icon
      add,
      reader,
      pencil,
      trashSharp,
      shareSharp,

      //properties
      modalPulverizaoInfo,
      listDataOperacaoPulverizacao,
      displayList,
    }
  }

});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>