---
layout: page
title: "Egardia / Woonveilig Alarm Control Panel"
description: "Instructions how to integrate Egardia / Woonveilig into Home Assistant."
date: 2016-07-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: egardia.png
ha_release: 0.51
ha_category: Alarm
---

The `egardia` platform enables the ability to control an [Egardia](http://egardia.com/)/Woonveilig control panel. These alarm panels are known under different brand names across the world, including Woonveilig in the Netherlands. This was tested on a Gate01 version of the Egardia/Woonveilig platform.

You will need to know the IP of your alarm panel on your local network. Test if you can login to the panel by browsing to the IP address and log in in using your Egardia/Woonveilig account.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: egardia
    host: YOUR_HOST
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **host** (*Required*): The local IP address of the Egardia/Woonveilig alarm panel.
- **username** (*Required*): Username for the Egardia/Woonveilig account.
- **password** (*Required*): Password for Egardia/Woonveilig account.
- **port** (*Optional*): The port of the alarm panel. Defaults to 80.
- **name** (*Optional*): Name to use for the alarm panel. Defaults to `Egardia`.
- **report_server_enabled** (*Optional*): Enable reporting by server. Defaults to `False`.
- **report_server_port** (*Optional*): Port of the Egardia server. Defaults to 85.
- **report_server_codes** list (*Optional*): List of codes for the different states.

Note that this basic configuration will only enable you to read the armed/armed away/disarmed status of your alarm and will **not** update the status if the alarm is triggered. This is because of how Egardia built their system. The alarm triggers normally go through their servers.
You can change this, however, using the following procedure. This is a more advanced configuration.

1. Log in into your alarm system's control panel. You will need to access http://[ip of your control panel]. You know this already since you need it in the basic configuration from above. Log in to the control panel with your Egardia/Woonveilig username and password.
2. Once logged in, go to *System Settings*, *Report* and change the Server Address for your primary server to the IP or hostname of your Home Assistant machine. Also, update the port number 85 or to anything you like. The provided software that you will set up in the next steps runs on port 85 by default. **Make sure to change the settings of the primary server otherwise the messages will not come through. Note that this will limit (or fully stop) the number of alarm messages you will get through Egardia's / Woonveilig services.** Maybe, that is just what you want. Make sure to save your settings by selecting 'OK'.
3. On your Home Assistant machine run `$ sudo python3 egardiaserver.py`. This will receive status codes from your alarm control panel and display them. You will need the codes to include in your configuration.yaml. Make sure to change the status of your alarm to all states (disarm, arm, armhome) as well as trigger the alarm in all ways possible to get 100% coverage. **Before triggering the alarm it might be good to disable the siren temporarily (can be done in Panel Settings).**
4. Once you have the codes, update your `configuration.yaml`:
```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: egardia
    host: YOUR_HOST
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    report_server_enabled: True
    report_server_port: PORT_OF_EGARDIASERVER (85 as per the instructions above)
    report_server_codes:
      arm: XXXXXXXXXXXXXXXX
      disarm: XXXXXXXXXXXXXXXX
      armhome: XXXXXXXXXXXXXXXX
      triggered: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
      standby: XXXXXXXXXXXXXXXX
```
  Note that you can have more than one code for triggered since every sensor generates its own code. arm, disarm, armhome and standby will all be one code.
5. Start the `egardiaserver.py` script on boot of your Home Assistant machine, for example by adding the following to your `/etc/rc.local`:
```bash
 python3 [path/to/]egardiaserver.py &
```
 **Do not forget the trailing & here; otherwise you will be having a hard time logging back into the machine.**
6. Test your setup and enjoy. The component will update if the alarm status changes, including triggers. You can use this to build your own automations and send notifications as you wish.
