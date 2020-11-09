<template>
    <ion-modal
        :is-open= "isOpen"
        @onDidDismiss="handleDidDismiss(true)"
    >
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Adicionar Produtos</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div v-for="itemProduto in formInfoOperacaoPulverizacao.produto" :key="itemProduto.id">
                    <ion-item>
                        <ion-label position="stacked">Classe de Uso do Produto Utilizado</ion-label>
                        <ion-input v-model="itemProduto.classeDeUso"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Alvo Principal ou Função</ion-label>
                        <ion-input v-model="itemProduto.alvo"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Produto(Unidade)</ion-label>
                        <ion-input v-model="itemProduto.nomeProduto"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Dosagem do Produto(Unidade/ha)</ion-label>
                        <ion-input v-model="itemProduto.dosagem"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Preço do Produto(R$/Unidade)</ion-label>
                        <ion-input v-model="itemProduto.preco"></ion-input>
                    </ion-item>
                </div>
                 <!-- <ion-item>
                    <ion-label position="stacked">Classe de Uso do Produto Utilizado</ion-label>
                    <ion-input v-model="formInfoOperacaoPulverizacao.classeDeUso"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Alvo Principal ou Função</ion-label>
                    <ion-input v-model="formInfoOperacaoPulverizacao.alvo"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Produto(Unidade)</ion-label>
                    <ion-input v-model="formInfoOperacaoPulverizacao.produto"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Dosagem do Produto(Unidade/ha)</ion-label>
                    <ion-input v-model="formInfoOperacaoPulverizacao.dosagem"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Preço do Produto(R$/Unidade)</ion-label>
                    <ion-input v-model="formInfoOperacaoPulverizacao.preco"></ion-input>
                </ion-item> -->
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
    name: 'ModalAddProdutoAlvos',
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
        const formInfoOperacaoPulverizacao = reactive<any> ({
            produto: []
        });

        const inEditMode = computed(()=> props.initialValues?.id ? true : false);

        watch(
            () => props.initialValues,
            (newVal) => {
                if(newVal && inEditMode.value) {
                Object.assign( formInfoOperacaoPulverizacao, props.initialValues);
                }
            }
        );

        const handleDidDismiss = (isCancelled: boolean) => {
            if(!props.isOpen) return;
            let payload = null;
            if(isCancelled){
                payload = {
                    isCancelled: true,
                    formInfoOperacaoPulverizacao: null,
                };
            }else if(inEditMode.value) {
                //Alterando o alvo através do id
                payload = {
                    isCancelled: false,
                    formInfoOperacaoPulverizacao: { ...formInfoOperacaoPulverizacao, id: props.initialValues?.id}
                };
            }else{
                //Criando um novo alvo
                payload = {
                isCancelled: false,
                formInfoOperacaoPulverizacao: { ...formInfoOperacaoPulverizacao}
            };
            }

            //emit evento
            ctx.emit('modal-add-produto-fechado', payload);

            //Limpa os campos
            Object.assign(formInfoOperacaoPulverizacao, {
                dataOperacao: "",
                estadioDaCultura: "",
                volumeDeCalda: "",
                pulverizacaoParcial:"",
                classeDeUso: "",
                alvo: "",
                produto: "",
                dosagem: "",
                preco: "",
            });
        };

        return{
            //functions
            handleDidDismiss,

            //proprieties
            formInfoOperacaoPulverizacao,
            inEditMode,

            //icons


        };
    }
});

</script>