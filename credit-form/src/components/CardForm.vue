<template>
    <div class="card-form">
        <Card></Card>
        <form @submit="submit">
            <div class="number form-block">
                <label>Card Number</label>
                <input 
                    v-model="cardNumber" 
                    @input="numberChange" 
                    @focus="numberFocus"
                    @blur="$v.cardNumber.$touch()" 
                    :class="{input_invalid: $v.cardNumber.$error}"
                    type="text" 
                    autofocus 
                    maxlength="19"
                >
                <div class="invalid-msg" v-if="$v.cardNumber.$error&&!$v.cardNumber.required">this field is required</div>
                <div class="invalid-msg" v-if="$v.cardNumber.$error&&!$v.cardNumber.numericCardNumber">card number invalid</div>
            </div>
            <div class="owner form-block">
                <label>Card Owner</label>
                <input 
                    v-model="cardHolder" 
                    @input="holderChange" 
                    @focus="holderFocus" 
                    @blur="$v.cardHolder.$touch()" 
                    :class="{input_invalid: $v.cardHolder.$error}"
                    type="text" 
                >
                <div class="invalid-msg" v-if="$v.cardHolder.$error&&!$v.cardHolder.required">this field is required</div>
            </div>
            <div class="info form-block">
                <div class="date">
                    <label>Expiry Date</label>
                    <select v-model="expiredMonth" @change="expiredChange" @focus="expiredFocus">
                        <option  v-for="month in months" v-bind:key="month">{{month}}</option>
                    </select>
                    <span>/</span>
                    <select class="exp-year" v-model="expiredYear" @change="expiredChange" @focus="expiredFocus">
                        <option v-for="year in years" v-bind:key="year">{{year}}</option>
                    </select>
                </div>
                <div class="cvv">
                    <label>CVV Code</label>
                    <input 
                        ref='cvv-input' 
                        class="cvv_input" 
                        type="password" 
                        v-model="cvv" 
                        @input="cvvChange" 
                        @focus="cvvFocus"
                        @blur="$v.cvv.$touch()"
                        :class="{input_invalid: $v.cvv.$error}"
                        maxlength="6"
                    >
                    <div class="show-btn" @click="showCvv">
                        <icon-base v-if="isCvvShow" class="icon icon-eye"  viewBox="0 0 469.333 469.333" height="22px" width="22px" icon-name="eye"><icon-eye/></icon-base>
                        <icon-base v-if="!isCvvShow" class="icon icon-hidden"  viewBox="0 0 469.333 469.333" height="22px" width="22px" icon-name="hidden"><icon-hidden/></icon-base>
                    </div>
                    <div class="invalid-msg" v-if="$v.cvv.$error&&!$v.cvv.required">this field is required</div>
                    <div class="invalid-msg" v-if="$v.cvv.$error&&!$v.cvv.numericCvvNumber">code is invalid</div>
                </div>
            </div>
            <button type="submit" :disabled="$v.$invalid">Submit</button>
        </form> 
        <!-- <pre>
            {{$v}}
        </pre>    -->
    </div>    
</template>

<script>
import {eventEmitter} from '../main';
import {required, minLength} from 'vuelidate/lib/validators';
export default {
    components: {
       Card: () => import('./Card'),
       IconBase: () => import('./icons/IconBase'),
    //    IconCheck: () => import('./icons/IconCheck'),
       IconEye: () => import('./icons/IconEye'),
       IconHidden: () => import('./icons/IconHidden')
    },
    data(){
        return {
            cardNumber: '',
            cardHolder: '',
            expiredMonth: 'MM',
            expiredYear: 'YY',
            cvv: '',
            months: ['MM','01','02','03','04','05','06','07','08','09','10','11','12'],
            years: ['YY'],
            isCvvShow: false,
            isNumberInvalid: false
        }
    },
    validations: {
        cardNumber: {
            required,
            minLength: minLength(19),
            numericCardNumber: function(number){
                const cardNum = number.split(' ').join('');
                if((cardNum.match(/[A-zа-я]/))||(cardNum.length>0&&cardNum.length<16))
                {
                    return false;
                }    
                return true;
            }
        },
        cardHolder: {
            required
        },
        expired:{
            dateSelected: function(){
                if(this.expiredMonth.match(/[A-zа-я]/)||this.expiredYear.match(/[A-zа-я]/))
                    return false;
                return true;
            }
        },
        cvv:{
            required,
            numericCvvNumber: function(cvv){
                if(cvv.match(/[A-zа-я]/)){
                    return false;
                }
                return true;
            }
        }
    },
    created() {
        let year = new Date(Date.now()).getFullYear();
        for(let i=0;i<20;i++) {
            this.years.push(year + i);
        }    
    },
    methods: {
        numberChange() {
            const arr = this.cardNumber.split(' ').join('').split('');
            for(let i = 4; i<arr.length; i+=5){
                arr.splice(i,0,' ');
            }
            this.cardNumber = arr.join('');
            eventEmitter.$emit('numberUpdated',this.cardNumber);
        },
        holderChange() {
            eventEmitter.$emit('holderUpdated',this.cardHolder);
        },
        expiredChange(){
            eventEmitter.$emit('expiredUpdated',this.expiredMonth + '/' + this.expiredYear);
        },
        cvvChange() {
            eventEmitter.$emit('cvvUpdated',this.cvv);
        },
        cvvFocus() {
            eventEmitter.$emit('cvvFocus');
        },
        numberFocus() {
            eventEmitter.$emit('numberFocus');
        },
        holderFocus() {
            eventEmitter.$emit('holderFocus');
        },
        expiredFocus() {
            eventEmitter.$emit('expiredFocus');
        },
        showCvv(){
            this.isCvvShow = !this.isCvvShow;
            const cvv = this.$refs['cvv-input'];
            if(cvv.getAttribute('type')=='password'){
                cvv.setAttribute('type','text');
            }
            else {
                cvv.setAttribute('type','password');
            }
        },
        submit(event) {
            event.preventDefault();
            this.$v.$touch();

            if(this.$v.$invalid){
                //eslint-disable-next-line
                console.log('INVALID');
                return;
            }

        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';
    @import '../styles/customSelect';
    @import '../styles/form';
</style>