import { gpio } from '@/data/gpio'


const nums = [ 2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26 ]

class pump {
  constructor(id, pin, tube_length, ready_time){
    this.id = id
    this.gpio = new gpio(pin, 'high')
    this.tube_length = tube_length
    this.ready_time = ready_time
  }

  start () {
    this.gpio.writeSync(0)
    return this.gpio.readSync()
  }

  stop () {
    this.gpio.writeSync(1)
    return this.gpio.readSync()
  }
}

export const pumps = [
  new pump(  1, 26, 25, 110 ),
  new pump(  2, 19, 25, 110 ),
  new pump(  3, 13, 25, 110 ),
  new pump(  4,  6, 25, 110 ),
  new pump(  5,  5, 25, 110 ),
  new pump(  6,  2, 25, 110 ),
  new pump(  7,  3, 25, 110 ),
  new pump(  8,  4, 25, 110 ),
  new pump(  9, 17, 25, 110 ),
  new pump( 10, 14, 25, 110 ),
  new pump( 11, 15, 25, 110 ),
  new pump( 12, 18, 25, 110 )
]

export const id_of = (pump) => pump.id
export const power_to = (pump) => pump.gpio
export const tube_length = (pump) => pump.tube_length

// time in ms for pump to fill tube
export const ready_time = (pump) => pump.ready_time
