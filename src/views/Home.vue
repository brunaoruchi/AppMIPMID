<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false"></ion-menu-button>
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" >
      <div id="container">
        <ion-button expand="block" @click="() => router.push('/pesquisa')">Pesquisa</ion-button>
        <ion-button expand="block" @click="() => router.push('/pulverizacao')">Pulverização</ion-button>
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
    IonMenuButton
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'Home',
    components: {
      IonContent, 
      IonHeader, 
      IonPage,
      IonTitle, 
      IonToolbar,
      IonButton,
      IonButtons,
      IonMenuButton,
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