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
            <!-- <div>
                <modal-add-produto :is-open="modalAddProdutoStatus.showAddProduto" :initialValues= "modalAddProdutoStatus.data" @modal-add-produto="handleModalAddProdutoClosed" />
            </div> -->
            <ion-label><b> DADOS DA OPERAÇÃO </b> </ion-label>
            <ion-item>
                <ion-label position="floating">Data da Operação </ion-label>
                <ion-icon slot="end" color="tertiary" :icon="calendar"></ion-icon>
                <ion-datetime
                    display-format= "DD-MM-YYYY"
                    v-model="formInfoOperacaoPulverizacao.dataOperacao"
                >
                </ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Estádio Da Cultura</ion-label>
                <ion-input v-model="formInfoOperacaoPulverizacao.estadioDaCultura"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Volume de Calda</ion-label>
                <ion-input v-model="formInfoOperacaoPulverizacao.volumeDeCalda"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Pulverização Parcial</ion-label>
                <ion-input v-model="formInfoOperacaoPulverizacao.pulverizacaoParcial"></ion-input>
            </ion-item>
            <ion-label><b> PRODUTOS </b></ion-label>
            <div v-for="itemClasseDeUso in classeDeUso" :key="itemClasseDeUso.nome">
                <ion-item-divider>
                    <ion-label>{{itemClasseDeUso.nome}}</ion-label>
                </ion-item-divider>
                
                <ion-list v-for="itemProduto in formInfoOperacaoPulverizacao.produtosDaOperacao" :key="itemProduto.id">
                    <ion-item v-if="itemProduto.classeDeUso===itemClasseDeUso.nome">
                        <ion-row>
                            <ion-label> Nome: {{itemProduto.nomeProduto}}</ion-label>
                        </ion-row>
                        <ion-row>
                            <ion-label position="stacked">Alvo Principal ou Função</ion-label>
                            <ion-select
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
                        </ion-row>
                        <ion-row>
                            <ion-label position="stacked">Dosagem do Produto(Unidade/ha)</ion-label>
                            <ion-input type="number" v-model="itemProduto.dosagem"></ion-input>
                        </ion-row>
                        <ion-row>
                            <ion-label position="stacked">Preço do Produto(R$/Unidade)</ion-label>
                            <ion-input type="number" v-model="itemProduto.preco"></ion-input>
                        </ion-row>
                    </ion-item>        
                </ion-list>
            </div>

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
    IonDatetime,
    IonItem,
    IonButton,
    IonIcon,
    
 } from "@ionic/vue";
import { defineComponent, SetupContext, reactive, computed, watch } from "vue";
import { calendar,shareSharp } from 'ionicons/icons';
import dataStore from "../../datastoreOperacaoPulverizacao";
//import ModalAddProduto from "./ModalAddProduto.vue";

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
        //ModalAddProduto,
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
        // classeDeUso.push({
        //     nome: "Acaricida"           
        // });
        // classeDeUso.push({
        //     nome: "Bactericida"
        // });
        // classeDeUso.push({
        //     nome: "Espelhante Adesivo"
        // });
        
        // classeDeUso.push({
        //     nome: "Estimulante"
        // });
        
        // classeDeUso.push({
        //     nome: "Inseticida"
        // });
        // classeDeUso.push({
        //     nome: "Outros"
        // });
        
        // classeDeUso.push({
        //     nome: "Lesmicida/Moluscicida"
        // });
        // classeDeUso.push({
        //     nome: "Feromônio"
        // });
        // classeDeUso.push({
        //     nome: "Nematicida"
        // });
        // classeDeUso.push({
        //     nome: "Formicida"
        // });
        // classeDeUso.push({
        //     nome: "Regulador de Crescimento"
        // });
        // classeDeUso.push({
        //     nome: "Agente Biológico"
        // });
        // classeDeUso.push({
        //     nome: "Inseticida Biológico"
        // });
        // classeDeUso.push({
        //     nome: "Adubo Foliar"
        // });
        // classeDeUso.push({
        //     nome:"Sal Comum"
        // });
        // classeDeUso.push({
        //     nome: "Multiplas"
        // });

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
                pulverizacaoParcial:"",
                produtosDaOperacao: []
            });
        };
        // const { listDataOperacaoPulverizacao, deleteOperacaoPulverizacao, addOrUpdateOperacaoPulverizacao } = dataStore()
        // const modalAddProdutoStatus = reactive<{ showAddProduto: boolean; data: any}>({
        //     showAddProduto: false,
        //     data: null,
        // })
        // const handleAddProdutoOperacaoPulverizacao = (item: any) => {
        //     modalAddProdutoStatus.showAddProduto = true;
        //     modalAddProdutoStatus.data = item;
        // }

        // const handleModalAddProdutoClosed = (eventData: any) => {
        //     modalAddProdutoStatus.showAddProduto = false;
        //     modalAddProdutoStatus.data = null;

        //     if(eventData.isCancelled){
        //         alert("Cancelado")
        //     }else{
        //         addOrUpdateOperacaoPulverizacao(eventData.formInfoOperacaoPulverizacao, eventData.formInfoOperacaoPulverizacao.id);
        //         modalAddProdutoStatus.data = null;
        //     }
        // };

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
            calendar,
            shareSharp,

            // modalAddProdutoStatus,
            // handleAddProdutoOperacaoPulverizacao,
            // handleModalAddProdutoClosed,
        };
    }
});

</script>

<style scoped>
    ion-row, ion-item {
        width: 100%;
    } 
    ion-row {
        display: block;
    }
</style>