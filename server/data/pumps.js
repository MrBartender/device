import { Gpio as gpio } from 'onoff'

const nums = [ 2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26 ]
const pumps = [
  (  1, new gpio(26, 'high'), 25, false, 110 ),
  (  2, new gpio(19, 'high'), 25, false, 110 ),
  (  3, new gpio(13, 'high'), 25, false, 110 ),
  (  4, new gpio( 6, 'high'), 25, false, 110 ),
  (  5, new gpio( 5, 'high'), 25, false, 110 ),
  (  6, new gpio( 2, 'high'), 25, false, 110 ),

  (  7, new gpio( 3, 'high'), 25, false, 110 ),
  (  8, new gpio( 4, 'high'), 25, false, 110 ),
  (  9, new gpio(17, 'high'), 25, false, 110 ),
  ( 10, new gpio(14, 'high'), 25, false, 110 ),
  ( 11, new gpio(15, 'high'), 25, false, 110 ),
  ( 12, new gpio(18, 'high'), 25, false, 110 )
]
// id
// device itself
// length of tube
// tubes filled
// time (in ms) for liquid to fill tube
