export class gpio {
    constructor(pin, pwr){
        this.pin = pin
        this.state = (pwr == 'high') ? 1 : 0
    }    

    writeSync(state){
        this.state = state
        return this.state
    }

    readSync(){
        return this.state
    }
}
