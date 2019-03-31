export const status = (device) => device.readSync()

export const turn_on = (device) => {
  device.writeSync(0)
  return device.readSync()
}

export const turn_off = (device) => {
  device.writeSync(1)
  return device.readSync()
}
