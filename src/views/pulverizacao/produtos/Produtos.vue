<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pulverizacao"></ion-back-button>
        </ion-buttons>
        <ion-title>Gerenciamento de Produtos</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div>
        <modal-produtos :is-open="modalAlvoInfo.show" :initialValues= "modalAlvoInfo.data" @modal-alvo-fechado="handleModalClosed" />
      </div>
      <div>
        <modal-info-produtos :is-open="modalAlvoStatus.showAlvo" :initialValues= "modalAlvoStatus.data" @modal-info-fechado="handleModalInfoClosed" />
      </div>
      <div v-for="item in displayList" :key="item.id">
        <ion-item>
          <ion-label>
            <div class="ion-text-wrap"> <b>Nome:</b> {{item.nome}}</div>
          </ion-label>
          <div>
            <ion-button @click="handleReadAlvo(item)" >
              <ion-icon :icon="reader"></ion-icon>
            </ion-button>
            <ion-button color="warning" @click="handleEditAlvo(item)" >
              <ion-icon color="light" :icon="pencil"></ion-icon>
            </ion-button>
            <ion-button color="danger" @click.self="handleDeleteAlvo(item)">
              <ion-icon :icon="trashSharp"></ion-icon>
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
import { add, pencil, trashSharp, reader } from 'ionicons/icons';
import { useRouter } from 'vue-router';

import ModalProdutos from "./ModalProdutos.vue";

import ModalInfoProdutos from "./ModalInfoProdutos.vue";
import dataStore from "../../../datastoreProduto";


export default defineComponent({
  name: 'Produtos',
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
    ModalProdutos,
    IonIcon,
    ModalInfoProdutos,
    IonButton,
  },

  setup() {
    const { listDataAlvo, deleteAlvo, addOrUpdateAlvo } = dataStore()

    const modalAlvoInfo = reactive<{ show: boolean; data: any}>({
      show: false,
      data: null,
    });

    const displayList = computed(()=> Array.from(listDataAlvo.values()));

    const showModalAlvo = () => {
      modalAlvoInfo.show = true;
    };

    //Edit Alvo
    const handleEditAlvo = (item: any) => {
      modalAlvoInfo.show = true;
      modalAlvoInfo.data = item;
    }

    //Delete Alvo
    const handleDeleteAlvo = (item: any) => {
      deleteAlvo(item);
    }

    const handleModalClosed = (eventData: any) => {
      modalAlvoInfo.show = false;
      if(eventData.formInfoProduto.id){
        addOrUpdateAlvo(eventData.formInfoProduto, eventData.formInfoProduto.id);
      }else{
        addOrUpdateAlvo(eventData.formInfoProduto);
      }
      modalAlvoInfo.data = null;
      
    };

    //Modal 2
    const modalAlvoStatus = reactive<{ showAlvo: boolean; data: any}>({
      showAlvo: false,
      data: null,
    });

    const handleReadAlvo = (item: any) => {
      modalAlvoStatus.showAlvo = true;
      modalAlvoStatus.data = item;
    };

    const handleModalInfoClosed = () => {
      modalAlvoStatus.showAlvo = false;
      modalAlvoStatus.data = null;
    };

    return {
      router: useRouter(),

      //function
      showModalAlvo,
      handleModalClosed,
      handleDeleteAlvo,
      handleEditAlvo,

      handleModalInfoClosed,
      handleReadAlvo,
      modalAlvoStatus,

      //icon
      add,
      reader,
      pencil,
      trashSharp,

      //properties
      modalAlvoInfo,
      listDataAlvo,
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