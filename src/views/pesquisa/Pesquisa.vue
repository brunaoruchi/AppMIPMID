<template>
  <ion-page>
    <ion-header>
        <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Pesquisa</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div>
        <modal-info-pesquisa
          :is-open="modalPesquisaInfo.show"
          @modal-info-fechado="handleModalInfoClosed"
        />
      </div>
      <div>
        <ion-item>
          <ion-row><b>Safra:</b>{{ ur }}</ion-row>
          <ion-button color="none" @click="showModalPesquisa">
            <ion-icon color="dark" :icon="eye" ></ion-icon>
          </ion-button>
          <ion-button color="medium">
            <ion-icon color="dark" :icon="bug" ></ion-icon>
          </ion-button>
          <ion-button color="success">
            <ion-icon color="light" :icon="leaf" ></ion-icon>
          </ion-button>  
          <ion-button color="dark" @click="() => router.push('/operacaoDePulverizacao')">
              <ion-icon color="light" :icon="medical" ></ion-icon>
          </ion-button>
          <ion-button color="warning">
            <ion-icon color="light" :icon="pencil" ></ion-icon>
          </ion-button>
          <ion-button color="danger">
              <ion-icon :icon="trash"></ion-icon>
            </ion-button>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonIcon,
  // IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonItem,
  IonBackButton,
  IonButton,
} from "@ionic/vue";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { eye, bug, medical,leaf, pencil, trash } from 'ionicons/icons';
import ModalInfoPesquisa from "./ModalInfoPesquisa.vue";

export default defineComponent({
  name: "Pesquisa",
  components: {
    IonItem,
    IonContent,
    // IonLabel,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    ModalInfoPesquisa,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      ur: "Safra 2020/2021",
    };
  },
  setup() {
    const modalPesquisaInfo = reactive<{ show: boolean }>({
      show: false,
    });

    const showModalPesquisa = () => {
        modalPesquisaInfo.show = true;
    };

    const handleModalInfoClosed = () => {
      modalPesquisaInfo.show = false;
    };

    return {
        modalPesquisaInfo,
        showModalPesquisa,
        handleModalInfoClosed,
        router: useRouter(),
        eye,
        medical,
        bug,
        leaf,
        pencil,
        trash
    };
  },
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
</style>