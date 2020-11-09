<template>
    <ion-modal
        :is-open= "isOpen"
        @onDidDismiss="handleDidDismiss(true)"
    >
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Add/Edit</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-item>
                    <ion-label position="stacked">Descrição</ion-label>
                    <ion-input v-model="formInfoAlvo.descricao"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ion-label>Classe de Uso:</ion-label>
                    <ion-select
                        placeholder="Selecionar"
                        :value="formInfoAlvo.classeDeUso"
                        @ionChange="formInfoAlvo.classeDeUso= $event.target.value"
                        ok-text="Confirmar" cancel-text="Cancelar"
                    >
                        <ion-select-option>Acaricida</ion-select-option>
                        <ion-select-option>Bactericida</ion-select-option>
                        <ion-select-option>Espelhante Adesivo</ion-select-option>
                        <ion-select-option>Fungicida</ion-select-option>
                        <ion-select-option>Estimulante</ion-select-option>
                        <ion-select-option>Herbicida</ion-select-option>
                        <ion-select-option>Inseticida</ion-select-option>
                        <ion-select-option>Outros</ion-select-option>
                        <ion-select-option>Adjuvante</ion-select-option>
                        <ion-select-option>Lesmicida/Moluscicida</ion-select-option>
                        <ion-select-option>Feromônio</ion-select-option>
                        <ion-select-option>Nematicida</ion-select-option>
                        <ion-select-option>Formicida</ion-select-option>
                        <ion-select-option>Regulador de Crescimento</ion-select-option>
                        <ion-select-option>Agente Biológico</ion-select-option>
                        <ion-select-option>Inseticida Biológico</ion-select-option>
                        <ion-select-option>Adubo Foliar</ion-select-option>
                        <ion-select-option>Sal Comum</ion-select-option>
                        <ion-select-option>Multiplas</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-button @click="handleDidDismiss(true)">Cancelar</ion-button>
                <ion-button @click="handleDidDismiss(false)" >Salvar</ion-button>
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
    IonItem,
    IonButton,
 } from "@ionic/vue";
import { defineComponent, SetupContext, reactive, computed, watch } from "vue";


export default defineComponent({
    name: 'ModalAlvos',
    components:{
        IonModal,
        IonPage,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonLabel,
        IonInput,

        IonItem,
        IonButton,
  
    },
    props: {
        isOpen : {
            default: false,
            required: true,
        },
        initialValues:{
            default: {},
        }
    },
    setup(props: any, ctx: SetupContext){   
        const formInfoAlvo = reactive<any> ({
            descricao: "",
            classeDeUso: "",
        });

        const inEditMode = computed(()=> props.initialValues?.id ? true : false);

        watch(
            () => props.initialValues,
            (newVal) => {
                if(newVal && inEditMode.value) {
                Object.assign( formInfoAlvo, props.initialValues);
                }
            }
        );

        const handleDidDismiss = (isCancelled: boolean) => {
            if(!props.isOpen) return;
            let payload = null;
            if(isCancelled){
                payload = {
                    isCancelled: true,
                    formInfoAlvo: null,
                };
            }else if(inEditMode.value) {
                //Alterando o alvo através do id
                payload = {
                    isCancelled: false,
                    formInfoAlvo: { ...formInfoAlvo, id: props.initialValues?.id}
                };
            }else{
                //Criando um novo alvo
                payload = {
                isCancelled: false,
                formInfoAlvo: { ...formInfoAlvo}
            };
            }

            //emit evento
            ctx.emit('modal-alvo-fechado', payload);

            //Limpa os campos
            Object.assign(formInfoAlvo, {
                descricao: "",
                classeDeUso: "",
                data: "",
            });
        };

        return{
            //functions
            handleDidDismiss,

            //proprieties
            formInfoAlvo,
            inEditMode,

            //icons


        };
    }
});

</script>