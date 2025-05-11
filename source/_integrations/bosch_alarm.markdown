---
title: Bosch Alarm
description: Integrate Bosch Alarms.
ha_category:
  - Alarm
  - Switch
  - Sensor
ha_release: 2025.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mag1024'
  - '@sanjay900'
ha_domain: bosch_alarm
ha_platforms:
  - alarm_control_panel
  - switch
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Bosch Alarm Panel** {% term integration %} allows you to connect your [Bosch Alarm Panel](https://www.boschsecurity.com) to Home Assistant to control and monitor your Bosch Alarm Panel.

{% include integrations/config_flow.md %}

## Supported devices

- _Solution 2000/3000/4000_
- B Series: _B3512/B4512/B5512/B6512_
- G Series: _B8512G/B9512G_
- _AMAX 2100/3000/4000_
- _D7412GV4/D9412GV4_ [^1]

[^1]: Firmware 2.0+

## Provided entities

The following {% term entities %} are provided:

- [Alarm Control Panel](#alarm-control-panel)
- [Switch](#switch)
- [Sensor](#sensor)

### Alarm Control Panel

This integration adds an Alarm Control Panel device for each configured area, with the ability to issue arm/disarm commands.
This entity reports state (_disarmed_, _armed_away_, etc.).
 
### Switch

A switch is added for each output configured on the panel. Note that for some panels, only outputs with the type set to **remote output** can be controlled via _Mode 2_ API.

Three switches are added per door, which allow for locking, securing, or momentarily unlatching the door.

### Sensor

A sensor is provided per area that lists how many points are currently in a faulted state.

## Authentication

The primary means of authentication for the _Mode 2_ API is the _Automation_ passcode. It needs to be at least 10 characters long, and it is different from the _User_ code -- a shorter numeric pin used to arm/disarm the panel.
The integration will prompt for the required passcodes, which depend on the panel type.

| Panel    | Code       |
| -------- | ---------- |
| Solution | User [^2]  |
| B Series | Automation |
| G Series | Automation |
| AMAX     | Both       |

[^2]: The user needs to have the "master code functions" authority if you wish to interact with history events.

{% important %}
Since the _Mode 2_ automation user has "superuser" privileges, it bypasses the regularly configured alarm pin: you will _not_ be prompted for a _User_ code when arming/disarming through the integration.
{% endimportant %}

## Data updates

The **Bosch Alarm** {% term integration %} fetches data from the device every 30 seconds.
Newer devices and firmware revisions have the possibility to push data instead of needing to rely on {% term polling %}.
At startup, the integration checks whether your panel supports push data updates and falls back to {% term polling %} if not.

## Troubleshooting

### Issues with Bosch Solution 2000/3000/4000 panels

We have found that some panels end up with a configuration on them that is incompatible with the integration. 
When this happens, you will get a connection error when attempting to communicate with the panel, even if the credentials are correct.
If you continue to have connection errors even after rebooting your panel, then you have an issue with your configuration.
The easiest way to solve this is to follow the full reset and restore procedure outline below.

#### Resetting the configuration and restoring the integration

1. Update firmware (Recommended).
   1. Download and install the latest firmware for the control panel and IP module from the Bosch Security website.
2. Back up the existing configuration.
   1. Connect to the panel via A-Link Plus.
   2. Perform an upload of the panel configuration.
   3. Save the configuration to your computer.
3. Default the control panel.
   1. Press the default/reset button on the panel.
   2. Use installer code 1234.
   3. Set:
      1. Location 0081 = 3 (Enables IP module mode)
      2. Location 4456 = 4 (Enables RSC+ communication)
   4. Set date and time using master code `25806#`.
4. Initial Home Assistant test.
   1. Wait 2 to 5 minutes after resetting the panel.
   2. Set up the integration on the panel using its IP address.
   3. Home Assistant should connect using default configuration and show panel status.
5. Restore your original configuration.
   1. Reconnect to the panel using A-Link Plus.
   2. Modify zones, outputs, and user codes to match the original setup.
   3. Save and download the updated config to the panel.
   4. Wait 2 to 5 minutes.
6. Reconnect to Home Assistant.
   1. Open Home Assistant.
   2. The integration should now detect the updated configuration.
   3. All relevant entities (zones, partitions, outputs) should appear automatically.

#### Restarting a panels network stack

We have found that the Solution panels have a bug where they can get into a state where the network module stops letting us use the _Mode 2_ API.
If your configuration information is correct, but you are still unable to connect to your panel, then you are likely encountering this bug.
This can be resolved by restarting the network modules, which can be done with the following steps.

##### Resetting network module 1

Using the codepad, enter your master code, followed by the `[9][4][1]` and `[#]` keys.

##### Resetting network module 2

Using the codepad, enter your master code, followed by the `[9][4][2]` and `[#]` keys.

### Issues with the Bosch B/G Series (B3512/B4512/B5512/B8512/B9512)

The following procedure can be used to configure the panel correctly so that it will work with the integration.

#### Panel configuration procedure

1. Update Firmware (Recommended).
   1. Use RPS to update the control panel and B426 (IP module if used) to the latest firmware.
   2. Download firmware from the Bosch Security website.
2. Set IP Address.
   1. Configure the panel’s IP settings using RPS or via the codepad.
   2. Use DHCP for initial setup (optional), or assign a static IP.
3. Configure the automation device.
   1. In RPS:
      1. Set **Automation Device** to **Mode 2** (Bosch Standard Protocol).
      2. Set your automation passcode (used for Home Assistant authentication).
4. Wait for changes to apply.
   1. Wait 2 to 5 minutes for the panel to reboot and apply settings.
5. Connect to Home Assistant.
   1. Set up the integration using the panel’s IP address.
   2. Enter the automation passcode in the Home Assistant configuration.
   3. Home Assistant should connect and display panel status, zones, and partitions.

#### TLS issues

Some older firmwares for these panels use outdated certificates that are no longer trusted by Home Assistant. If you have issues connecting and see a TLS error in your logs, update the firmware on your panel.

## Known limitations

- The integration does not allow you to configure the panel; you can instead do this via the panel's configuration utility.
- Some older firmware versions for the Solution / AMAX series panels only support a single connection at a time. If you try to have a cloud connection and use the integration on these panels simultaneously, the panel's network stack can lock up, and the integration will stop working.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
