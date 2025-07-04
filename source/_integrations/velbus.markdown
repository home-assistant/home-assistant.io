---
title: Velbus
description: Access and control your Velbus devices.
ha_category:
  - Binary Sensor
  - Button
  - Climate
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_release: '0.50'
ha_config_flow: true
ha_codeowners:
  - '@Cereal2nd'
  - '@brefra'
ha_domain: velbus
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - diagnostics
  - light
  - select
  - sensor
  - switch
ha_integration_type: hub
---

The `velbus` integration is used to control [Velbus](https://www.velbus.eu/?lang=en) modules. It supports the Velbus USB, Velbus serial and a TCP/IP gateway.

The pushbutton LEDs of input modules are disabled by default. These can be enabled from the `Devices` panel in the `Configuration` page of the web interface.

## Configuration requirements

To use the Velbus integration, you need a Velbus USB interface or a Velbus TCP/IP interface. The Velbus USB interface is connected to the USB port of your Home Assistant device, while the TCP/IP interface is connected to your network.
In most cases the USB interface is automatically detected and shown in a list during the configuration process. The TCP/IP interface requires you to provide the hostname or IP address, port number, and password (if configured).

{% include integrations/config_flow.md %}

In the popup:
- select the connection type:
  - **USB**: if you have a Velbus USB interface connected to your Home Assistant device
  - **TCP/IP**: if you have a Velbus TCP/IP interface available in your network
- submit

Press `Submit` and the integration will show you a list of available Velbus interfaces. If you selected USB, the list will contain the detected USB interfaces. If you selected TCP/IP, you will need to fill in the required parameters to connect to the Velbus bus.

If you have selected USB, the integration will automatically detect the Velbus USB interface and show it in a list. Select the correct USB interface from the list and press `Submit`.

If you have selected TCP/IP, you will need to fill in the required parameters to connect to the Velbus bus. The parameters are:
{% configuration_basic %}
tls:
  description: "Enable TLS connection to the Velbus TCP/IP interface. _(default: off)_"
host:
  description: "Hostname or IP address of the Velbus TCP/IP interface."
port:
  description: "Port number of the Velbus TCP/IP interface. _(default: 27015 for Signum, 6000 for Velser)_"
password:
  description: "Password to authenticate to the Velbus TCP/IP interface. _(default: empty)_"
{% endconfiguration_basic %}

Once you have selected the USB interface or filled in the required parameters for the TCP/IP interface, press `Submit` again.
This will start the configuration process. If the connection is successful, the Velbus integration will be added to Home Assistant.

### Example: signum

- tls: yes
- host: your signum IP address
- port: 27015
- password: your signum password (if configured)

### Example: velserv

- tls: no
- host: your velser IP address
- port: 6000
- password: leave empty

### Example: Home Assistant add-on

- tls: depending on your configuration
- host: your Home Assistant IP address
- port: 27015 if you kept the default
- password: leave empty

{% note %}
The pushbutton LEDs of input modules are disabled by default. These can be enabled from the **Devices** panel in the **Configuration** page of the web interface.
{% endnote %}


## Actions
- `velbus.sync clock`: Synchronize Velbus time to local clock.
- `velbus.scan`: Scan the bus for new devices.
- `velbus.set_memo_text`: Show memo text on Velbus display modules.
- `velbus.clear_cache`: Clear the full velbuscache or the cache for one module only.

### Service `velbus.sync_clock`

You can use the service `velbus.sync_clock` to synchronize the clock of the Velbus modules to the clock of the machine running Home Assistant. This is the same as the 'sync clock' button at the VelbusLink software.

| Service data attribute | Optional | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `interface`            | no       | The port used to connect to the bus (the same one as used during configuration). |

### Service `velbus.scan`

You can use the service `velbus.scan` to synchronize the modules between the bus and Home Assistant. This is the same as the 'scan' button at the VelbusLink software.

| Service data attribute | Optional | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `interface`            | no       | The port used to connect to the bus (the same one as used during configuration). |


### Service `velbus.set_memo_text`

You can use the service `velbus.set_memo_text` to provide the memo text to be displayed at Velbus modules like VMBGPO(D) and VMBELO.

| Service data attribute | Optional | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `interface`            | no       | The port used to connect to the bus (the same one as used during configuration). |
| `address`              | no       | The module address in decimal format, which is displayed at the device list at the integration page. |
| `memo_text`            | yes      | Text to be displayed on module. When no memo text is supplied the memo text will be cleared. |

Example:

```yaml
script:
  trash_memo:
    alias: "Trash memo text"
    sequence:
    - data:
        address: 65
        memo_text: "It's trash day"
        interface: "tls://192.168.1.9:27015"
      service: velbus.set_memo_text
```

### Service `velbus.clear_cache`

You can use the service `velbus.clear_cache` to clear the cache of one module or the full cache. Once the clear happens, the integration will start a new scan.
Use this service when you make changes to your configuration via velbuslink.

| Service data attribute | Optional | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `interface`            | no       | The port used to connect to the bus (the same one used during configuration). |
| `address`              | no       | The module address in decimal format, which is displayed on the device list on the integration page, if provided the service will only clear the cache for this model, without an address, the full velbuscache will be cleared. |


## VMB7IN and the Energy dashboard

In some cases, the VMB7IN sensor does not report what the counter is counting. If the counter is related to an energy device, everything will work out of the box.
But if the VMB7IN sensor is a water or gas counter, you will need to specify this in your configuration.yaml file.

```yaml
homeassistant:
  customize:
    sensor.eau_counter:
      device_class: water
```

The device_class attribute can have 2 values:
- gas: if the counter represents a gas meter
- water: if the counter represents a water meter


## Example automation

The Velbus integration allows you to link a Velbus button (i.e., a button of a [VMBGPOD](https://www.velbus.eu/products/view/?id=416302&lang=en) module) to a controllable entity of Home Assistant.
The actual linking can be realized by two automation rules. One rule to control the device using the push button and a second rule to update the LED state of the push button as soon as the entity state changes.

```yaml
# Control light living from Velbus push_button_10
- id: 'Control_light_living_from_Velbus'
  alias: "Control light living using Velbus push_button_10"
  trigger:
  - entity_id: binary_sensor.push_button_10
    platform: state
    to: "on"
  condition: []
  action:
  - entity_id: light.living
    service: light.toggle

# Keep status LED push_button_10 in sync to status light living
- id: 'Update LED of push_button_10'
  alias: "Update LED state of push_button_10"
  trigger:
  - entity_id: light.living
    platform: state
    to: "on"
  - entity_id: light.living
    platform: state
    to: "off"
  condition: []
  action:
  - condition: or
    conditions:
    - condition: and
      conditions:
      - condition: state
        entity_id: light.led_push_button_10
        state: "on"
      - condition: state
        entity_id: light.living
        state: "off"
    - condition: and
      conditions:
      - condition: state
        entity_id: light.led_push_button_10
        state: "off"
      - condition: state
        entity_id: light.living
        state: "on"
  - entity_id: light.led_push_button_10
    service: light.toggle
```
