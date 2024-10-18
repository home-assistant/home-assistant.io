---
title: IntelliFire
description: Instructions on the IntelliFire Fireplace integration for Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Fan
  - Light
  - Number
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 2022.2
ha_codeowners:
  - '@jeeftor'
ha_domain: intellifire
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - climate
  - fan
  - light
  - number
  - sensor
  - switch
ha_dhcp: true
ha_integration_type: integration
---

IntelliFire Wi-Fi fireplace modules provide app-based and Alexa control to various fireplaces. The modules do expose an unencrypted HTTP endpoint on the network that provides status information. This integration will read that URL and create a set of sensors displaying the current fireplace state.

{% include integrations/config_flow.md %}


## API Credentials

To fully configure the IntelliFire integration you will need to enter your IntelliFire credentials which are the same ones you would use with the mobile app.

### Entities

The following controllable entities are available:

### Switch

- **Flame** - Turn fireplace on/off.
- **Pilot Light** - Turn pilot light on/off.

### Fan

If your unit is equipped with a fan - this entry will be present. There are 5 possible fan control values:

- `0%` - Off
- `25%` - Quiet
- `50%` - Low
- `75%` - Medium
- `100%` - High

### Climate

- **Thermostat** - This entity will be present if your unit has thermostatic control.


### Light

The integration provides a light entity if the unit is equipped with lights.

### Number

The integration uses a Number entity to control flame height. Valid flame height vales are `1-5`.

### Sensor Types

The following sensors are available as a **binary sensor** when dealing with on/off.

### Binary sensors

- **Flame Sensor**: Whether the fire is on.
- **Pilot Light Sensor**: Whether the pilot light is turned on.
- **Timer Sensor**: Whether the sleep timer is turned on.
- **Thermostat Sensor**: Whether the thermostat is turned on.

### Sensor

- **Flame Height**: Numerical indicator of flame height, where `1` is the lowest setting and `5` is the highest setting.
- **Temperature**: Current ambient temperature as read by the fireplace remote.
- **Target Temperature**: If the thermostat is engaged this is the target temperature the fireplace will try to reach, as measured by the remote.
- **Fan Speed**: Numerical indicator of fan speed.
- **Timer End Time**: If the sleep timer is enabled, this is time it will finish.

### Diagnostic Sensors

- **Connection Quality** - Local network connection quality _(disabled by default)_.
- **Downtime** - Unit downtime. Will read `Unknown` if there is currently no downtime.
- **ECM Latency** - Electronic Control Module Latency value _(disabled by default)_.
- **IP** - IP Address of the unit.
- **Uptime** - Unit uptime.
- **Errors** - Error status (see below)

#### Binary Error Sensors

The following is a description of the various diagnostic error sensors and what they mean:

*The following details the various error states and the descriptions associated with them in the IntelliFire Android application.*

 - **Accessory** - Your appliance has detected that an AUX port or accessory is not functional. Please contact your dealer and report this issue.
 - **Disabled** - Appliance Safely Disabled: Your appliance has been disabled. Please contact your dealer and report this issue.
 - **ECM Offline** - ECM is offline.
 - **Fan** - Fan Error. Your appliance has detected that an accessory is not functional. Please contact your dealer and report this issue.
 - **Fan Delay** - Fan Information: Fan will turn on within 3 minutes. Your appliance has a built-in delay that prevents the fan from operating within the first 3 minutes of turning on the appliance. This allows the air to be heated prior to circulation.
 - **Flame** - Pilot Flame Error. Your appliance has been safely disabled. Please contact your dealer and report this issue.
 - **Lights** - Lights Error. Your appliance has detected that an accessory is not functional. Please contact your dealer and report this issue.
 - **Maintenance** - Maintenance: Your appliance is due for a routine maintenance check. Please contact your dealer to ensure your appliance is operating at peak performance.
 - **Offline** - Your appliance is currently offline.
 - **Pilot Flame** - Pilot Flame Error: Your appliance has been safely disabled. Please contact your dealer and report this issue.
 - **Soft Lock Out** - Sorry your appliance did not start. Try again by pressing Flame ON.


### Troubleshooting

The IFT module can suffer a variety of issues that will render it inoperable. Some of these have been confirmed by the manufacturer and some appear to be random. There are two paths to try when attempting to reset the module:

#### Enabling Debugging

To turn on debug logging modify your {% term "`configuration.yaml`" %} file in the `/config` directory and add the following:


```yaml
logger:
  logs:
   homeassistant.components.intellifire: debug
   intellifire4py: debug
```

#### Issue a Soft Reset

There is a debug web interface available at [iftapi.net/webaccess](http://iftapi.net/webaccess/login.html). From here you can log in and then navigate to your individual fireplace unit and issue a **Soft Reset** as follows:

![soft_reset.png](/images/integrations/intellifire/soft_reset.png)

In some cases, this will restore control to the fireplace, but if it doesn't you are best to try the following method.

#### Power Cycle

The sure fire way to reset the IFT module is to just power-cycle it. This will work just about every time.
