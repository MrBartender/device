// import { Gpio as gpio } from 'onoff'  
import { gpio } from '@/data/gpio'

const nums = [ 2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26 ]

export const pumps = [
  [  1, new gpio(26, 'high'), 25, 110 ],
  [  2, new gpio(19, 'high'), 25, 110 ],
  [  3, new gpio(13, 'high'), 25, 110 ],
  [  4, new gpio( 6, 'high'), 25, 110 ],
  [  5, new gpio( 5, 'high'), 25, 110 ],
  [  6, new gpio( 2, 'high'), 25, 110 ],
  [  7, new gpio( 3, 'high'), 25, 110 ],
  [  8, new gpio( 4, 'high'), 25, 110 ],
  [  9, new gpio(17, 'high'), 25, 110 ],
  [ 10, new gpio(14, 'high'), 25, 110 ],
  [ 11, new gpio(15, 'high'), 25, 110 ],
  [ 12, new gpio(18, 'high'), 25, 110 ]
]

export const turn_on = (device) => {
  device.writeSync(0)
  return device.readSync()
}
export const turn_off = (device) => {
  device.writeSync(1)
  return device.readSync()
}

export const id_of = (pump) => pump[0]
export const power_to = (pump) => pump[1]
export const tube_length = (pump) => pump[2]

// time in ms for pump to fill tube
export const ready_time = (pump) => pump[4]
