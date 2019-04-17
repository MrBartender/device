export class gpio {

    constructor(pin, pwr){
        this.pin = pin
        this.pwr = pwr
        this.state = 0
    }    

    writeSync(state){
        this.state = state
        return state
    }

    readSync(){
        return this.state
    }
}