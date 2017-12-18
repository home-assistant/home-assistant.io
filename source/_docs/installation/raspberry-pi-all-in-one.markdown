---
layout: page
title: "Raspberry Pi All-In-One Installer"
date: 2016-05-12 01:39
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation-raspberry-pi-all-in-one/
---

<p class='note warning'>
  The All-In-One Installer is deprecated, you will have problems updating Home Assistant in 2018. Please move to another [installation method](https://home-assistant.io/getting-started/). 
</p>

### To upgrade the All-In-One setup manually in the future:
 
 *  Login to Raspberry Pi `ssh pi@your_raspberry_pi_ip`
 *  Change to homeassistant user `sudo su -s /bin/bash homeassistant`
 *  Change to virtual environment `source /srv/homeassistant/homeassistant_venv/bin/activate`
 *  Update Home Assistant `pip3 install --upgrade homeassistant`
 *  Type `exit` to logout the hass user and return to the `pi` user.
 
 **If you deployed Home Assistant via the AiO installer prior to December 2016**
 *  Login to Raspberry Pi `ssh pi@your_raspberry_pi_ip`
 *  Change to homeassistant user `sudo su -s /bin/bash hass`
 *  Change to virtual environment `source /srv/hass/hass_venv/bin/activate`
 *  Update Home Assistant `pip3 install --upgrade homeassistant`
 *  Type `exit` to logout the hass user and return to the `pi` user.
   
 After upgrading, you can restart Home Assistant a few different ways:
 
 * Restarting the Raspberry Pi `sudo reboot`
 * Restarting the Home-Assistant Service `sudo systemctl restart home-assistant.service`
