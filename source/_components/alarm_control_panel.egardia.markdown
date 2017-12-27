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

The `egardia` platform enables the ability to control an [Egardia](http://egardia.com/)/[Woonveilig](http://woonveilig.nl) control panel. These alarm panels are known under different brand names across the world, including Woonveilig in the Netherlands. This was tested on a GATE-01 and GATE-02 version of the Egardia/Woonveilig platform.

You will need to know the IP of your alarm panel on your local network. Test if you can login to the panel by browsing to the IP address and log in using your Egardia/Woonveilig account.

To enable the integration with your alarm panel, add the following lines to your `configuration.yaml` file:

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
- **version** (*Optional*): The version of the Egardia system. `GATE-01` and `GATE-02` are currently supported. Defaults to `GATE-01`.
- **port** (*Optional*): The port of the alarm panel. Defaults to 80.
- **name** (*Optional*): Name to use for the alarm panel. Defaults to `Egardia`.
- **report_server_enabled** (*Optional*): Enable reporting by server. Defaults to `False`.
- **report_server_port** (*Optional*): Port of the Egardia server. Defaults to 52010.
- **report_server_codes** list (*Optional*): List of codes for the different states.

Note that this basic configuration will only enable you to read the armed/armed away/disarmed status of your alarm and will **not** update the status if the alarm is triggered. This is because of how Egardia built their system. The alarm triggers normally go through their servers.
You can change this, however, using the following procedure. This is a more advanced configuration.

1. Log in into your alarm system's control panel. You will need to access http://[IP of your control panel]. You know this already since you need it in the basic configuration from above. Log in to the control panel with your Egardia/Woonveilig username and password.
2. Once logged in, go to *System Settings*, *Report* and change the Server Address for your primary server to the IP or hostname of your Home Assistant machine. You can leave the port number set to 52010 or change it to anything you like. **Make sure to change the settings of the primary server otherwise the messages will not come through. Note that this will limit (or fully stop) the number of alarm messages you will get through Egardia's / Woonveilig services.** Maybe, that is just what you want, because it removes the need to pay for their subscription. Make sure to save your settings by selecting 'OK'.
3. On your Home Assistant machine run `$ sudo python3 egardiaserver.py`. Refer to the [python-egardia repository](https://github.com/jeroenterheerdt/python-egardia) for detailed documentation on parameters. This will receive status codes from your alarm control panel and display them. You will need the codes to include in your configuration.yaml. Make sure to change the status of your alarm to all states (disarm, arm, home) by all means possible (all users, remotes, web login, app) as well as trigger the alarm in all ways possible to get 100% coverage. **Before triggering the alarm it might be good to disable the siren temporarily (can be done in Panel Settings).**
4. Once you have the codes, update your `configuration.yaml`:
```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: egardia
    host: YOUR_HOST
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    report_server_enabled: True
    report_server_port: PORT_OF_EGARDIASERVER (optional, defaults to 52010)
    report_server_codes:
      arm: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
      disarm: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
      home: XXXXXXXXXXXXXXXX
      triggered: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
      ignore: XXXXXXXXXXXXXXXX
```

Note that for *triggered*, *arm* and *disarm* multiple codes can be entered since each sensor triggers with a different code and each user of the system has its own arm and disarm codes. Also note that your system will do regular system checks which will be reported as well. Since Home Assistant provides no way of handling them properly, you can enter those codes as *ignore* (again, multiple codes can be used here). The egardia component will ignore these codes and continue returning the old status if it receives any of the codes that are listed as ignore. This is useful for example when you have armed your alarm at night: normally a system check will occur at least once during the night and if that code is not specified anywhere Home Assistant will set the status of the alarm to its default, which is unarmed. This is in fact wrong. Listing the code as ignore changes this behavior and Home Assistant will continue to show the status the alarm is in (disarm, arm, home, triggered) even when system checks occur.

5. Test your setup and enjoy. The component will update if the alarm status changes, including triggers. You can use this to build your own automations and send notifications as you wish. *Note*: previous versions required a separate egardiaserver to be set up. This is no longer necessary and corresponding system services can be removed (using systemctl).
