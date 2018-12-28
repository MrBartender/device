# Device
This repository is the On-Device code for a bartender in the MrBartender suite.

## Required Software

Start with Raspbian Lite Image.

- node.js (`v10.12`)
- forever (npm - `forever`)
- unclutter
- chromium-browser
- xorg
- openbox
- lightdm
- git

## Setup Instructions

- Install required software
- Create user `kiosk-user`
- Edit `/etc/lightdm/lightdm.conf` to have the following values:
```
autologin-user=kiosk-user
user-session=openbox
```
- Edit `/etc/xdg/openbox/autostart` to contain the values in the `kiosk/autostart` file in this repo
- Create folder `/home/kiosk-user/mrbartender`, then enter it
- Run `git clone https://github.com/MrBartender/device.git .` to clone the repo into this folder
- Run `npm install` to install the dependencies for the app

Reboot, and it should be good to go!

_Note, it might be necessary to set boot mode to GUI autologin._

## Updating MrBartender App

Enter the MrBartender folder with:
`$ cd /home/kiosk-user/mrbartender`
and run
`$ git pull`
once that finishes, update the dependencies
`$ npm install`

That's it!

## Updating OS

Run the following commands:
`$ sudo apt update`
`$ sudo apt upgrade`

That should update everything necessary.


## Developing

Development watch script (from root dir):
`$ watchify src/core.js -o public/js/bundle.js & nodemon index.js`
_Note: Don't forget to run `kill` on the background process when canceling!_

Make Production:
`$ browserify src/core.js -o public/js/bundle.js`
