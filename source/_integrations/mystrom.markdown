---
title: myStrom
description: Instructions on how to integrate myStrom WiFi Bulbs into Home Assistant.
ha_category:
  - Light
  - Binary Sensor
  - Switch
ha_release: 0.43
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: mystrom
ha_platforms:
  - binary_sensor
  - light
  - switch
---

The `mystrom` light platform allows you to control your [myStrom](https://mystrom.ch/en/) WiFi Bulbs.

There is currently support for the following device types within Home Assistant:

- [Light](#light)
- [Binary Sensor](#binary-sensor)
  - [Setup of myStrom Buttons](#setup-of-mystrom-buttons)
- [Switch](#switch)
  - [Setup](#setup)
  - [Get the current power consumption](#get-the-current-power-consumption)

## Light

To use your myStrom WiFi Bulb in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mystrom
    host: IP_ADDRESS
    mac: MAC_ADDRESS
```

{% configuration %}
host:
  description: "The IP address of your myStrom WiFi Bulb, e.g., `192.168.1.32`."
  required: true
  type: string
mac:
  description: "The MAC address of your myStrom WiFi Bulb, e.g., `5AAC8CA542F3`."
  required: true
  type: string
name:
  description: The name to use when displaying this bulb.
  required: false
  type: string
  default: myStrom Bulb
{% endconfiguration %}

Check if you are able to access the light located at `IP_ADRRESS`. The details about your light is provided as a JSON response.

```bash
$ curl http://[IP_ADDRESS]/api/v1/device/[MAC_ADDRESS]

{
  "MAC_ADDRESS": {
    "type": "rgblamp",
    "battery": false,
    "reachable": true,
    "meshroot": false,
    "on": true,
    "color": "0;0;100",
    "mode": "hsv",
    "ramp": 409,
    "power": 5.1,
    "fw_version": "2.25"
  }
}
```

## Binary Sensor

The `mystrom` binary sensor platform allows you to use [myStrom Wifi Buttons](https://mystrom.ch/wifi-button/) with Home Assistant. The myStrom Wifi Buttons support three and the myStrom WiFi Button + four different push pattern:

- `single`: Short push (approx. 1/2 seconds)
- `double`: 2x sequential short pushes (within 2 seconds)
- `long`: Long push (approx. 2 seconds)
- `touch`: Touch of the button's surface (only affective for WiFi Button +)

The first usage of the pattern will create the binary sensor for the pattern. If the WiFi Button is pushed one time then a binary sensor for the `single` pattern will be created. The same applies for the other patterns. With the second usage of the pattern the binary sensors become fully functional.

The buttons will give you feedback with its built-in LED:

- white then green: Pattern was submitted successfully
- white then red: There is a problem with the communication

To use your myStrom WiFi Button in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: mystrom
```

<div class='note'>
The firmware version 2.56 doesn't support TLS/SSL. This means that you are only able to use the WiFi Buttons if you are using plain-text communication between Home Assistant and the clients/entities.
</div>

### Setup of myStrom Buttons

You need to configure every button to make it work with Home Assistant. First connect the Wifi Buttons to your wireless network. Once a button is connected you have three minutes to set the actions for the push patterns if the button is not charging. The fastest way is to use `curl`. Check the [documentation](https://mystrom.ch/wp-content/uploads/REST_API_WBP.txt) of the WiFi Button for further details about the implementation (`http://` is replaced by `get://` or `post://`). `action` is the name of the corresponding push pattern (see above).

The endpoint that is receiving the data is `http://[IP address Home Assistant]:8123/api/mystrom`. If you have set an [`api_password`](/integrations/http/) then this needs to be included in the URL.

With `api_password:`

```bash
curl -d "[action]=get://[IP address Home Assistant]:8123/api/mystrom?api_password%3D[api_password]%26[action]%3D[ID of the button]" \
    http://[IP address of the button]/api/v1/device/[MAC address of the button]
```

Without `api_password`:

```bash
$ curl -d "[action]=get://[IP address Home Assistant]:8123/api/mystrom?[action]%3D[ID of the button]" \
    http://[IP address of the button]/api/v1/device/[MAC address of the button]
{
  "[MAC address of the button]": {
    "type": "button",
    "battery": true,
    "reachable": true,
    "meshroot": false,
    "charge": true,
    "voltage": 4.292,
    "fw_version": "2.56",
    "single": "get://[IP address Home Assistant]:8123/api/mystrom?single=[id of the button]",
    "double": "",
    "long": "",
    "touch": ""
  }
}
```

A complete command to set the URL for a double click could look like the example below:

```bash
curl -d "double=get://192.168.1.3:8123/api/mystrom?double%3DButton1" http://192.168.1.12/api/v1/device/4D5F5D5CD553
```

With an `api_password`:

```bash
curl -d "double=get://192.168.1.3:8123/api/mystrom?api_password%3Dapi_password%26double%3DButton1" http://192.168.1.12/api/v1/device/4D5F5D5CD553
```

The command-line tool [`mystrom`](https://github.com/fabaff/python-mystrom) is a helper to configure myStrom buttons.

If you have set [`login_attempts_threshold`](/integrations/http/) and forget to include the `api_password` for an action and that action is triggered then after the threshold is reached will the button no longer work because it is banned. See [IP filtering and banning](/integrations/http/#ip-filtering-and-banning) about how to revert the banning.

## Switch

The `mystrom` switch platform allows you to control the state of your [myStrom](https://mystrom.ch/en/) switches. The built-in sensor is measuring the power consumption while the switch is on.

### Setup

Make sure that you have enabled the REST API under **Advanced** in the web frontend of the switch.

<p class='img'>
  <img src='/images/integrations/mystrom/switch-advanced.png' />
</p>

To use your myStrom switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mystrom
    host: IP_ADRRESS
```

{% configuration %}
host:
  description: "The IP address of your myStrom switch, e.g., `192.168.1.32`."
  required: true
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: myStrom Switch
{% endconfiguration %}

Check if you are able to access the device located at `http://IP_ADRRESS`. The details about your switch is provided as a JSON response.

```bash
$ curl -X GET -H "Content-Type: application/json" http://IP_ADDRESS/report
{
  "power": 0,
  "relay": false
}
```

or change its state:

```bash
curl -G -X GET http://IP_ADDRESS/relay -d 'state=1'
```

### Get the current power consumption

The switch is measuring the current power consumption. To expose this as a sensor use a [`template` sensor](/integrations/template).

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      power:
        friendly_name: "Current Power"
        unit_of_measurement: "W"
        value_template: "{{ state_attr('switch.office', 'current_power_w') }}"
```

{% endraw %}
