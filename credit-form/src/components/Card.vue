<template>
    <div class="card" :class="{back_card: isBack}">
        <div class="front">
            <div class="card-type">
                <icon-base v-if="cardType=='4'" class="icon icon-visa"  viewBox="0 0 504 504" height="60" width="120" icon-name="visa"><icon-visa/></icon-base>
                <icon-base v-else-if="cardType=='5'" class="icon icon-mc"  viewBox="0 0 291 291" height="60" width="120" icon-name="mastercard"><icon-mc/></icon-base>  
                <icon-base v-else-if="cardType=='3'" class="icon icon-ae"  viewBox="0 0 449 449" height="60" width="120" icon-name="amex"><icon-ae/></icon-base>  
                <icon-base v-else class="icon icon-card"  viewBox="0 0 512 512" height="60" width="120" icon-name="card"><icon-card/></icon-base>  
            </div>
            <div class="number" :class="{number_border: focusElements.isNumberFocused}">
                <p>{{cardNumber}}</p>
            </div>
            <div class="bottom">
                <div class="holder" :class="{holder_border:focusElements.isHolderFocused}">
                    <span>Card Holder</span>
                    <p>{{cardHolder}}</p>
                </div>
                <div class="expires" :class="{expires_border:focusElements.isExpFocused}">
                    <span>Expires</span>
                    <p>{{expires}}</p>
                </div>
            </div>
        </div>
        <div class="back">
            <div class="line"></div>
            <div class="cvv" :class="{cvv_border: focusElements.isCvvFocused}">
                <span>CVV</span>
                <p>{{cvv}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {eventEmitter} from '../main.js';
export default {
    components: {
        IconBase: () => import('./icons/IconBase'),
        IconVisa: () => import('./icons/IconVisa'),
        IconMc: () => import('./icons/IconMC'),
        IconAe: () => import('./icons/IconAE'),
        IconCard: () => import('./icons/IconCard')
    },
    data() {
        return {
            cardType: '1',
            cardEmty: '#### #### #### ####',
            cardNumber: '',
            cardHolder: '',
            expires: 'MM/YY',
            cvv: '',
            isBack: false,
            focusElements: {
                isExpFocused: false,
                isNumberFocused: false,
                isHolderFocused: false,
                isCvvFocused: false
            }
        }
    },
    created() {
        this.cardNumber = this.cardEmty;
        eventEmitter.$on('numberUpdated',(num)=> {
            this.clearFocus();
            this.focusElements.isNumberFocused = true;
            if(num.length<=0)
                this.cardNumber = this.cardEmty;
            else 
                this.cardNumber = num + this.cardEmty.substr(num.length,this.cardEmty.length - num.length);
            if(this.cardType != this.cardNumber[0])
                this.cardType = this.cardNumber[0];
        });
        eventEmitter.$on('holderUpdated',(name)=>{
            this.clearFocus();
            this.focusElements.isHolderFocused = true;
            this.cardHolder = name;
        });
        eventEmitter.$on('expiredUpdated',(date)=> {
            this.clearFocus();
            this.focusElements.isExpFocused = true;
            this.expires = date;
        });
        eventEmitter.$on('cvvUpdated',(data)=> {
            this.cvv = '*'.repeat(data.length);   
        });
        eventEmitter.$on('cvvFocus',() => {
            this.clearFocus();
            this.focusElements.isCvvFocused = true;
            this.isBack = true;
        });
        eventEmitter.$on('numberFocus',()=>{
            this.clearFocus();
            this.focusElements.isNumberFocused = true;
            this.isBack = false;
        });
        eventEmitter.$on('holderFocus',()=>{
            this.clearFocus();
            this.focusElements.isHolderFocused = true;
            this.isBack = false;
        });
        eventEmitter.$on('expiredFocus',()=>{
            this.isBack = false;
        })
    },
    methods: {
        clearFocus(){
            for(let key in this.focusElements){
                this.focusElements[key] = false;
            }
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';
    @import '../styles/card';
</style>