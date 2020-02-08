class Card {
    constructor(){
        this.cardType = 'card';
        this.number = '################';
        this.owner = 'Card Holder';
        this.cvv = '###';
    }
}

export default {
    state: {
        card: new Card()
    },
    mutations: {
        setType(state,payload){
            state.card.cardType = payload;
        },
        setNumber(state,payload){
            //eslint-disable-next-line
            console.log('numberChange',payload);
            state.card.number = payload;
        },
        setOwner(state,payload){
            state.card.owner = payload;
        },
        setCvv(state,payload){
            state.card.cvv = payload;
        }
    },
    actions: {

    },
    getters: {
        cardType(state){
            return state.card.cardType;
        },
        cardNumber(state){
            return state.card.number;
        },
        cardOwner(state){
            return state.card.owner;
        },
        cardCvv(state){
            return state.card.cvv;
        }
    }
}