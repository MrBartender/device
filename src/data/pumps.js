/// #if DEV
import { gpio } from '@/data/gpio'
/// #else
import { Gpio as gpio } from 'onoff'
/// #endif

const nums = [ 2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26 ]

export class pump {
  constructor(id, pin, tube_length, ready_time){
    this.id = id
    this.gpio = new gpio(pin, 'high')
    this.tube_length = tube_length
    this.ready_time = ready_time
  }

  start () {
    // console.log('starting pump', this.id)
    this.gpio.writeSync(0)
    return this.gpio.readSync()
  }
  
  stop () {
    // console.log('stopping pump', this.id)
    this.gpio.writeSync(1)
    return this.gpio.readSync()
  }

  async pour_for (ms) {
    this.start()
    await new Promise(r => setTimeout(r, ms))
    this.stop()
    return this
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

export async function pour (order) {
  for (var pump of order.pumps) {
      let ms = pump.ms 
      await pumps[pump.id - 1].pour_for(ms)
  }
  return true
}