---
title: "TP-Link Smart Home Devices"
description: "Instructions on integrating TP-Link Smart Home Devices to Home Assistant."
logo: tp-link.png
ha_category:
  - Hub
  - Switch
  - Light
  - Presence Detection
ha_release: 0.89
ha_iot_class: Local Polling
---

The `tplink` integration allows you to control your [TP-Link Smart Home Devices](https://www.tp-link.com/kasa-smart/) such as smart plugs and smart bulbs.

There is currently support for the following device types within Home Assistant:

- **Light**
- **Switch**
- [Presence Detection](#presence-detection)

In order to activate the support, you will have to enable the integration inside the config panel.
The supported devices in your network are automatically discovered, but if you want to control devices residing in other networks you will need to configure them manually as shown below.

## Supported Devices

This integration supports devices that are controllable with the [KASA app](https://www.tp-link.com/us/kasa-smart/kasa.html).
The following devices are known to work with this component.

### Plugs

- HS100
- HS103
- HS105
- HS110

### Wall Switches

- HS200
- HS210
- HS220 (acts as a light)

### Bulbs

- LB100
- LB110
- LB120
- LB130
- LB230
- KL110
- KL120
- KL130

## Configuration

```yaml
# Example configuration.yaml
tplink:
```

{% configuration %}
discovery:
  description: Whether to do automatic discovery of devices.
  required: false
  type: boolean
  default: true
light:
  description: List of light devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
switch:
  description: List of on/off switch devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
dimmer:
  description: List of dimmable switch devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
{% endconfiguration %}

## Manual configuration example

```yaml
# Example configuration.yaml entry with manually specified addresses
tplink:
  discovery: false
  light:
    - host: 192.168.200.1
    - host: 192.168.200.2
  switch:
    - host: 192.168.200.3
    - host: 192.168.200.4
  dimmer:
    - host: 192.168.200.5
    - host: 192.168.200.6
```

## Extracting Energy Sensor data

In order to get the power consumption readings from supported devices, you'll have to create a [template sensor](/integrations/switch.template/).
In the example below, change all of the `my_tp_switch`'s to match your device's entity ID.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      my_tp_switch_amps:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Current"
        value_template: '{{ states.switch.my_tp_switch.attributes["current_a"] | float }}'
        unit_of_measurement: 'A'
      my_tp_switch_watts:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Current Consumption"
        value_template: '{{ states.switch.my_tp_switch.attributes["current_power_w"] | float }}'
        unit_of_measurement: 'W'
      my_tp_switch_total_kwh:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Total Consumption"
        value_template: '{{ states.switch.my_tp_switch.attributes["total_energy_kwh"] | float }}'
        unit_of_measurement: 'kWh'
      my_tp_switch_volts:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Voltage"
        value_template: '{{ states.switch.my_tp_switch.attributes["voltage"] | float }}'
        unit_of_measurement: 'V'
      my_tp_switch_today_kwh:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Today's Consumption"
        value_template: '{{ states.switch.my_tp_switch.attributes["today_energy_kwh"] | float }}'
        unit_of_measurement: 'kWh'
```
{% endraw %}

## Presence detection

The `tplink` platform allows you to detect presence by looking at connected devices to a [TP-Link](https://www.tp-link.com) router.

Currently supported devices includes the following:

- Archer C7 firmware version 150427
- Archer C9 firmware version 150811
- EAP-225 AP with latest firmware version
- Archer D9 firmware version 0.9.1 0.1 v0041.0 Build 160224 Rel.59129n

<div class='note'>
TP-Link devices typically only allow one login at a time to the admin console.  This integration will count towards your one allowed login. Depending on how aggressively you configure device_tracker you may not be able to access the admin console of your TP-Link device without first stopping Home Assistant. Home Assistant takes a few seconds to login, collect data, and log out. If you log into the admin console manually, remember to log out so that Home Assistant can log in again.
</div>

### Configuration

To enable this device tracker, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: tplink
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., 192.168.1.1.
  required: true
  type: string
username:
  description: The username of an user with administrative privileges, usually *admin*. The Archer D9 last firmware does not require a username.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}

For Archer C9 models running firmware version 150811 or later please use the encrypted password you can retrieve like this:

1. Go to the login page of your router. (default: 192.168.0.1)
2. Type in the password you use to login into the password field.
3. Click somewhere else on the page so that the password field is not selected anymore.
4. Open the JavaScript console of your browser (usually by pressing F12 and then clicking on "Console").
5. Type `document.getElementById("login-password").value;` or `document.getElementById("pcPassword").value;`, depending on your firmware version.
6. Copy the returned value to your Home Assistant configuration as password.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.

For Archer D9 model the default IP is 192.168.1.1, the username is not necessary and you can leave that field blank.
