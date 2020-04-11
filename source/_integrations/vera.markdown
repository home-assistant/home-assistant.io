---
title: Vera
description: Instructions on how to setup Vera Z-Wave hubs and configure devices within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Cover
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
  - Climate
ha_release: pre 0.7
ha_domain: vera
---

The [Vera](https://getvera.com/) hub is a controller mainly for connecting to Z-Wave devices.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Cover
- Light
- Lock
- Scene
- Sensor
- Switch
- Climate

and will be automatically added when HA connects to your Vera controller.

## Configuration

To use Vera devices in your installation, add the following to your `configuration.yaml` file using the IP and port number of your Vera controller:

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
```

{% configuration %}
vera_controller_url:
  description: The URL for your Vera device.
  required: true
  type: string
{% endconfiguration %}

<div class='note'>

  It is recommended to assign a static IP address to your Vera Controller. This ensures that it won't change IP addresses, so you won't have to change the `vera_controller_url` if it reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Vera, check the label on the bottom.

</div>

### Configure devices

By default your switches will be added to Home Assistant as switches, however, if some of them are light switches, you can tell Home Assistant this using the optional `lights` parameter as shown below.

Vera imports detailed Z-Wave devices into Home Assistant. This can include system devices and other devices that you don't use; you can tell Home Assistant not to load these devices using the `exclude:` parameter as shown below.

You can find the Vera device id either via the advanced properties of the device in the Vera UI or by checking the `Vera Device Id` attribute on each device imported into Home Assistant (under the developer tools).

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
  # Optional to exclude devices - this is a list of vera device ids
  exclude: [ 13, 14, 16, 20, 23, 72, 73, 74, 75, 76, 77, 78, 88, 89, 99]
  # Optional to import switches as lights - this is a list of vera device ids
  lights: [15, 17, 19, 21, 22, 24, 26, 43, 64, 70, 87]
```

### Using Z-Wave devices in automation

If you want to use a Z-Wave device from the Vera controller in Home Assistant automation, you'll need the entity id. In the Home Assistant UI you'll find all entities listed under the <img src='/images/screenshots/developer-tool-states-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> icon of the Developer Tools section. Look for entities that contain 'Vera Device Id' in their attributes, and you'll find the entity id on the left.

### Sensor

The `vera` platform allows you to get data from your [Vera](https://getvera.com/) sensors from within Home Assistant.

Please note that some Vera sensors (such as _motion_ and _flood_  sensors) are _armable_ which means that Vera will send alerts (email messages to txts) when they are _armed_ and change state.

Home Assistant will display the state of these sensors regardless of the _armed_ state.

To allow you to change the _armed state_ - Home Assistant will create a switch as well as a sensor for each _Armable_ sensor. You can hide these switches using customization if you wish.
