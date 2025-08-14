---
title: Egardia
description: Instructions on how to setup Egardia / Woonveilig within Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Hub
ha_release: 0.65
ha_iot_class: Local Polling
ha_codeowners:
  - '@jeroenterheerdt'
ha_domain: egardia
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Egardia** {% term integration %} enables the ability to control an [Egardia](https://egardia.com/)/[Woonveilig](https://woonveilig.nl) control panel. These alarm panels are known under different brand names across the world, including Woonveilig in the Netherlands. This was tested on the WL-1716, GATE-01, GATE-02 and GATE-03 versions of the Egardia/Woonveilig platform. Not only will you integrate your alarm control panel, supported sensors (door contacts at this moment) will be added automatically.

You will need to know the IP of your alarm panel on your local network. Test if you can login to the panel by browsing to the IP address and log in using your Egardia/Woonveilig account.

## Basic configuration

To enable the {% term integration %} with your alarm panel, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

 ```yaml
    # Example configuration.yaml entry
    egardia:
      host: YOUR_HOST
      username: YOUR_USERNAME
      password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The local IP address of the Egardia/Woonveilig alarm panel.
  required: true
  type: string
username:
  description: Username for the Egardia/Woonveilig account.
  required: true
  type: string
password:
  description: Password for Egardia/Woonveilig account.
  required: true
  type: string
version:
  description: The version of the Egardia system. `GATE-01`, `GATE-02` and `GATE-03` are currently supported.
  required: false
  type: string
  default: "GATE-01"
port:
  description: The port of the alarm panel.
  required: false
  type: integer
  default: 80
report_server_enabled:
  description: Enable reporting by server.
  required: false
  type: string
  default: false
report_server_port:
  description:  Port of the Egardia server.
  required: false
  type: integer
  default: 52010
report_server_codes:
  description: Map of list of codes for the different states.
  required: false
  type: map
  keys:
    arm:
      description: List of codes for the 'arm' state.
      required: false
      type: list
    disarm:
      description: List of codes for the 'disarm' state.
      required: false
      type: list
    armhome:
      description: List of codes for the 'armhome' state.
      required: false
      type: list
    triggered:
      description: List of codes for the 'triggered' state.
      required: false
      type: list
    ignore:
      description: List of codes that will be ignored.
      required: false
      type: list
{% endconfiguration %}

Note that this basic configuration will only enable you to read the armed/armed away/disarmed status of your alarm and will **not** update the status if the alarm is triggered. This is because of how Egardia built their system. The alarm triggers normally go through their servers.
You can change this, however, using the following procedure. This is a more advanced (and more useful) configuration.

{% note %}
There seem to be multiple versions of software running on GATE-02 devices; we have received reports from GATE-02 users who successfully run this package in GATE-02 mode. Others have reported they needed to specify GATE-03 as their version to integrate their GATE-02.
{% endnote %}

## Advanced configuration

1. Log in to your alarm system's control panel. You will need to access http://[IP of your control panel]. You know this already since you need it in the basic configuration from above. Log in to the control panel with your Egardia/Woonveilig username and password.
2. Once logged in, go to *System Settings*, *Report* and change the Server Address for your primary server to the IP or hostname of your Home Assistant machine. You can leave the port number set to 52010 or change it to anything you like. **Make sure to change the settings of the primary server otherwise the messages will not come through. Note that this will limit (or fully stop) the number of alarm messages you will get through Egardia's / Woonveilig services.** Maybe, that is just what you want. Make sure to save your settings by selecting 'OK'. **If the system support XMPP, disable XMPP by invalidating the configuration in the XMPP menu (for example by changing the username). This is required for recent firmwares of the GATE-03 system as it does not use the Reporting server at all in the case of a valid XMPP configuration.**
3. The Egardia integration relies on capturing the status codes that your alarm emits when something happens (status change or trigger). These codes will be unique for every situation - i.e., the code emitted by the alarm when a sensor is triggered is unique to that sensor. Also, if you have multiple users or remotes, each remote has unique codes that are emitted by the alarm when status is changed using that remote or by that user. For the Egardia integration to work correctly you will need to capture the codes. To do this, on your Home Assistant machine run `$ sudo python3 egardiaserver.py`. Refer to the [python-egardia repository](https://github.com/jeroenterheerdt/python-egardia) for detailed documentation on parameters. This will receive status codes from your alarm control panel and display them. Record the codes shown as well as the status they relate to (see step 4 below). Make sure to change the status of your alarm to all states (disarm, arm, home) by all means possible (all users, remotes, web login, app) as well as trigger the alarm in all ways possible to get 100% coverage of all the codes the alarm system generates. You will need to run this script once and stop it once you have captured all the possible codes. Also, if you ever add users, remotes or sensors to your alarm system, make sure to re-run the script to capture the extra codes so you can update your configuration (see step 4 below). **For comfort, before triggering the alarm it might be good to disable the siren temporarily (can be done in Panel Settings).**
4. Once you have the codes, update your {% term "`configuration.yaml`" %}:
   ```yaml
   # Example configuration.yaml entry
   egardia:
   host: YOUR_HOST
   username: YOUR_USERNAME
   password: YOUR_PASSWORD
     report_server_enabled: true
     report_server_port: PORT_OF_EGARDIASERVER (optional, defaults to 52010)
     report_server_codes:
       arm: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
       disarm: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
       armhome: XXXXXXXXXXXXXXXX
       triggered: XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX, XXXXXXXXXXXXXXXX
       ignore: XXXXXXXXXXXXXXXX
   ```
Note that for all code groups (*arm*,*disarm*, etc) multiple codes can be entered since each sensor triggers with a different code and each user of the system has its own arm and disarm codes. Also note that your system will do regular system checks which will be reported as well. Since Home Assistant provides no way of handling them properly, you can enter those codes as *ignore* (again, multiple codes can be used here). The egardia integration will ignore these codes and continue returning the old status if it receives any of the codes that are listed as ignore. This is useful for example when you have armed your alarm at night: normally a system check will occur at least once during the night and if that code is not specified anywhere Home Assistant will set the status of the alarm to its default, which is unarmed. This is in fact wrong. Listing the code as ignore changes this behavior and Home Assistant will continue to show the status the alarm is in (disarm, arm, home, triggered) even when system checks occur.
5. Test your setup and enjoy. The integration will update if the alarm status changes, including triggers. You can use this to build your own automations and send notifications as you wish. *Note*: previous versions required a separate egardiaserver to be set up. This is no longer necessary and corresponding system services can be removed (using systemctl).

## Binary sensor

The `egardia` platform allows you to get data from your [Egardia](https://www.egardia.com)/[Woonveilig](https://www.woonveilig.nl) binary sensors from within Home Assistant.
Currently only door contacts are supported. IR sensors are not supported and will probably never be since their status cannot be read outside of the alarm control panel. Smoke sensors and others might be added but currently are not supported.
