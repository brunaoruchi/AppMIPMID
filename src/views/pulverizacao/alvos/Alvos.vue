<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pulverizacao"></ion-back-button>
        </ion-buttons>
        <ion-title>Alvos/Funções</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div>
        <modal-alvos :is-open="modalAlvoInfo.show" :initialValues= "modalAlvoInfo.data" @modal-alvo-fechado="handleModalClosed" />
      </div>
      <div>
        <modal-info-alvos :is-open="modalAlvoStatus.showAlvo" :initialValues= "modalAlvoStatus.data" @modal-info-fechado="handleModalInfoClosed" />
      </div>
      <div v-for="item in displayList" :key="item.id">
        <ion-item>
          <ion-label><b>Descrição:</b><br>{{item.descricao}}</ion-label>
          <div>
            <ion-button @click="handleReadAlvo(item)">
              <ion-icon :icon="reader" ></ion-icon>
            </ion-button>
            <ion-button color="warning" @click="handleEditAlvo(item)">
              <ion-icon color="light" :icon="pencil"></ion-icon>
            </ion-button>
            <ion-button color="danger" @click.self="handleDeleteAlvo(item)">
              <ion-icon :icon="trash" ></ion-icon>
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
import { add, pencil, trash, reader } from 'ionicons/icons';
import { useRouter } from 'vue-router';

import ModalAlvos from "./ModalAlvos.vue";
import dataStore from "../../../datastore";

import ModalInfoAlvos from "./ModalInfoAlvos.vue";

export default defineComponent({
  name: 'Alvos',
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
    ModalAlvos,
    IonIcon,
    ModalInfoAlvos,
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
      if(eventData.formInfoAlvo.id){
        addOrUpdateAlvo(eventData.formInfoAlvo, eventData.formInfoAlvo.id);
      }else{
        addOrUpdateAlvo(eventData.formInfoAlvo);
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
      trash,

      //properties
      modalAlvoInfo,
      listDataAlvo,
      displayList,
    }
  }

});
</script>

