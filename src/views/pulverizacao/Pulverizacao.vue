<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Pulverização</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" >
      <div id="container">
        <ion-button expand="block" @click="() => router.push('/alvos')">Alvos</ion-button>
        <ion-button expand="block" @click="() => router.push('/produtos')">Produtos</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { 
    IonContent, 
    IonHeader, 
    IonPage,
    IonTitle, 
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'Pulverizacao',
    components: {
      IonContent, 
      IonHeader, 
      IonPage,
      IonTitle, 
      IonToolbar,
      IonButton,
      IonButtons,
      IonBackButton,
    },
    setup() {
      return {
        router: useRouter()
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
</style>