<template>
    <ion-modal
        :is-open= "isOpen"
        @onDidDismiss="handleDidDismiss(true)"
    >
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Adicionar e Editar</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1><b>DADOS DA OPERAÇÃO</b></h1>
            <ion-item>
                <ion-label>Data da Operação </ion-label>
                <ion-datetime
                    display-format= "DD/MM/YYYY"
                    v-model="formInfoOperacaoPulverizacao.dataOperacao"
                >
                </ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label>Estádio Da Cultura</ion-label>
                <ion-select
                    placeholder="Selecionar"
                    :value="formInfoOperacaoPulverizacao.estadioDaCultura"
                    @ionChange="formInfoOperacaoPulverizacao.estadioDaCultura= $event.target.value"
                    ok-text="Confirmar" cancel-text="Cancelar"
                >
                  <ion-select-option>Pré-emergência</ion-select-option>
                  <ion-select-option >VE</ion-select-option>
                  <ion-select-option>VC</ion-select-option>
                  <ion-select-option>V1</ion-select-option>
                  <ion-select-option>V2</ion-select-option>
                  <ion-select-option>V3</ion-select-option>
                  <ion-select-option>V4</ion-select-option>
                  <ion-select-option>V5</ion-select-option>
                  <ion-select-option>V6</ion-select-option>
                  <ion-select-option>V7</ion-select-option>
                  <ion-select-option>V8</ion-select-option>
                  <ion-select-option>V9</ion-select-option>
                  <ion-select-option>VE</ion-select-option>
                  <ion-select-option>VC</ion-select-option>
                  <ion-select-option>V1</ion-select-option>
                  <ion-select-option>V2</ion-select-option>
                  <ion-select-option>V3</ion-select-option>
                  <ion-select-option>V4</ion-select-option>
                  <ion-select-option>V5</ion-select-option>
                  <ion-select-option>V6</ion-select-option>
                  <ion-select-option>V7</ion-select-option>
                  <ion-select-option>V8</ion-select-option>
                  <ion-select-option>V9</ion-select-option>
                </ion-select>
              </ion-item>
            <ion-item>
                <ion-label>Volume de Calda</ion-label>
                <ion-input type="number" v-model="formInfoOperacaoPulverizacao.volumeDeCalda"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Pulverização Parcial</ion-label>
                <ion-select
                    placeholder="Selecionar"
                    :value="formInfoOperacaoPulverizacao.pulverizacaoParcial"
                    @ionChange="formInfoOperacaoPulverizacao.pulverizacaoParcial= $event.target.value"
                    ok-text="Confirmar" cancel-text="Cancelar"
                >
                  <ion-select-option>Não</ion-select-option>
                  <ion-select-option>Sim</ion-select-option>
                </ion-select>
            </ion-item>
            <h1><b> PRODUTOS </b> </h1>
            <div v-for="itemClasseDeUso in classeDeUso" :key="itemClasseDeUso.nome">
                <h2>
                    {{itemClasseDeUso.nome}}
                </h2>
                <div v-for="itemProduto in formInfoOperacaoPulverizacao.produtosDaOperacao" :key="itemProduto.id"> 
                    <div v-if="itemProduto.classeDeUso===itemClasseDeUso.nome">
                        <ion-row>
                            <ion-col>Nome:</ion-col> 
                            <ion-col>{{itemProduto.nomeProduto}} ({{itemProduto.unidadeProduto}})</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>Alvo Principal/Função</ion-col>
                            <ion-col><ion-select
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
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>Dosagem do Produto<br>(Unidade/ha)</ion-col>
                            <ion-col><ion-input type="number" v-model="itemProduto.dosagem"></ion-input></ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>Preço do Produto<br>(R$/Unidade)</ion-col>
                            <ion-col><ion-input type="number" v-model="itemProduto.preco"></ion-input></ion-col>
                        </ion-row>
                    </div>
                </div>
            </div>
            <ion-button class="botao-cancelar" color="danger" expand="block" @click="handleDidDismiss(true)">
                <ion-icon :icon="closeOutline"></ion-icon>Cancelar</ion-button>
            <ion-button color="success" expand="block" @click="handleDidDismiss(false)">
                <ion-icon :icon="checkmarkOutline"></ion-icon>Salvar</ion-button>            
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
import { defineComponent, SetupContext, reactive, computed, watch } from "vue";
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
export default defineComponent({
    name: 'ModalOperacaoPulverizacao',
    components:{
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
        
        const produto = [];    
        produto.push({
            id: 1,
            classeDeUso: "Herbicida",
            nomeProduto: "Roundup Wg", 
            unidadeProduto: "KG"
        });
        produto.push({
            id: 6,
            classeDeUso: "Herbicida",
            nomeProduto: "Teste", 
            unidadeProduto: "KG"
        });
        produto.push({
            id: 2,
            classeDeUso: "Adjuvante",
            nomeProduto: "Agral", 
            unidadeProduto: "L"
        });
        produto.push({
            id: 3,
            classeDeUso: "Fungicida",
            nomeProduto: "Fox", 
            unidadeProduto: "L"
        });
        produto.push({
            id: 4,
            classeDeUso: "Herbicida",
            nomeProduto: "Rou2", 
            unidadeProduto: "KG"
        });

        
        const alvo = [];
        alvo.push({
            id: 1,
            nome: "Ferrugem Asiática",
            classeDeUso: "Fungicida"
        });
        alvo.push({
            id: 2,
            nome: "Adjuvante",
            classeDeUso: "Adjuvante"
        });
        alvo.push({
            id: 3,
            nome: "Folhas Estreitas (Pós-emergência)",
            classeDeUso: "Herbicida"
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

        const formInfoOperacaoPulverizacao = reactive<any> ({
            dataOperacao: "",
            estadioDaCultura: "",
            volumeDeCalda: "",
            pulverizacaoParcial:"",
            produtosDaOperacao: [],
            
        });
        produto.forEach(function(item, index) {
            formInfoOperacaoPulverizacao.produtosDaOperacao.push({
                id: index,
                classeDeUso: item.classeDeUso,
                alvo: "",
                nomeProduto: item.nomeProduto,
                unidadeProduto: item.unidadeProduto,
                dosagem: "",
                preco: "",
            });
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
            ctx.emit('modal-operacao-fechado', payload);

            //Limpa os campos
            Object.assign(formInfoOperacaoPulverizacao, {
                dataOperacao: "",
                estadioDaCultura: "",
                volumeDeCalda: "",
                pulverizacaoParcial:""
            });
        };

        return{
            //functions
            handleDidDismiss,
            classeDeUso,
            produto,
            alvo,
            //proprieties
            formInfoOperacaoPulverizacao,
            inEditMode,

            //icons
            checkmarkOutline,
            closeOutline
        };
    }
});

</script>

<style scoped>
    ion-row, ion-item {
        width: 100%;
    } 
    h1{
        color: white;
        background-color: black;
        text-align: center;
        font-size: 20px;
    }
    h2{
        font-size: 16px;
        border-bottom: 1px solid black;
        margin-bottom: 0;
    }
    .lista{
        margin-top: 4px;
    }
    ion-row {
        border-bottom: 1px solid rgba(197, 197, 197, 0.89);
    }
    .botao-cancelar{
        margin-top: 20px;
    }
</style>