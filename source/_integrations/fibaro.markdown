---
title: Fibaro
description: Instructions on how to setup Fibaro Z-Wave hubs (HCL and HC2) and configure devices within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Cover
  - Light
  - Lock
  - Sensor
  - Scene
  - Switch
ha_release: 0.83
ha_iot_class: Local Push
ha_domain: fibaro
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - scene
  - sensor
  - switch
---

The [Fibaro](https://fibaro.com/) hub is a controller mainly connecting to Z-Wave devices.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Cover
- Climate
- Light
- Lock
- Sensor
- Scene
- Switch

They will be automatically added when the `fibaro` hub is connected to Home Assistant.

## Configuration

To use Fibaro devices in your installation, add the following to your `configuration.yaml` file using the IP and port number of your Fibaro controller:

```yaml
fibaro:
  gateways:
    - url: http://192.168.1.161/api/
      username: your_username
      password: your_password
      device_config:
        light_device_name_123:
          color: false
          white_value: false
          reset_color: true
        binary_device_name_123:
          device_class: "garage_door"
          icon: mdi:open
```

{% configuration %}
gateways:
  description: List of gateway configurations.
  requires: true
  type: list
url:
  description: The URL for your Fibaro HomeCenter device.
  required: true
  type: string
username:
  description: The username for your Fibaro account.
  required: true
  type: string
password:
  description: The password for your Fibaro account.
  required: true
  type: string
plugins:
  description: Whether to import plugin-generated devices from Fibaro HomeCenter, such as Netatmo and Sonos devices, etc.
  required: false
  type: boolean
  default: false
device_config:
  description: Lists device specific parameter or behavior overrides.
  required: false
  type: list
  default: None
{% endconfiguration %}

<div class='note'>

  It is recommended to assign a static IP address to your Fibaro controller. This ensures that it won't change its IP address, so you won't have to change the `url` if the controller reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Fibaro, check the label on the bottom.

</div>

### Using Z-Wave devices in automation

If you want to use a Z-Wave device from the Fibaro controller in Home Assistant automation, you'll need the entity id. In the Home Assistant UI you'll find all entities listed under **Developer Tools** -> **States**. Look for entities that contain 'fibaro_id' in their attributes, and you'll find the entity id on the left.
