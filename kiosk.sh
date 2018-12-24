#!/bin/bash

# disable screen savers and timeouts
xset s noblank
xset s off
xset -dpms

# make the cursor disappear immediately
unclutter -root &

# set Chromium flags to prevent error alerts
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# Start the server with a process manager to recover from errors
forever start -o /home/pi/mrbartender/logs/output.log -e /home/pi/mrbartender/logs/errors.log /home/pi/mrbartender/index.js &

# Launch Chromium in Kiosk mode at the local server
/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk https://localhost:3000/ &
