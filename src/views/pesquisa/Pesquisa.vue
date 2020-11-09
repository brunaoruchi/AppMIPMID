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
          <ion-label>
            <div class="ion-text-wrap"><b>Safra:</b> {{ ur }}</div>
          </ion-label>
          <ion-button color="warning" @click="showModalPesquisa" slot="end">
            <ion-icon color="light" :icon="pencil" slot="icon-only" ></ion-icon>
          </ion-button>
          <ion-button expand="block" @click="() => router.push('/operacaoDePulverizacao')">Pulverizações
              <ion-icon color="warinig" slot="icon-only" ></ion-icon>
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
  IonLabel,
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
import { pencil } from 'ionicons/icons';
import ModalInfoPesquisa from "./ModalInfoPesquisa.vue";

export default defineComponent({
  name: "Pesquisa",
  components: {
    IonItem,
    IonContent,
    IonLabel,
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
      ur: "Cornélio Procópio",
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
        pencil,
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