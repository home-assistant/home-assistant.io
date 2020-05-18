---
title: Nuimo controller
description: Instructions on how to setup and use a Nuimo device in Home Assistant.
logo: nuimo.png
ha_category:
  - Hub
ha_release: 0.29
ha_iot_class: Local Polling
ha_domain: nuimo_controller
---

The `nuimo_controller` integration allows you to connect to a [Nuimo](https://www.senic.com/) device for receiving input events and displaying on the LED  matrix via the [Nuimo SDK for Python on Linux](https://github.com/getSenic/nuimo-linux-python).

To connect to a Nuimo device add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
nuimo_controller:
```

{% configuration %}
mac:
  description: Skip discovery and connect to this device address.
  required: false
  type: string
name:
  description: To handle more than one device by names, add the name of the device.
  required: false
  default: None
  type: string
{% endconfiguration %}

Example for testing rotation value and sending to the LED matrix:

```yaml
automation Nuimo_rotate_right:
  trigger:
    platform: event
    event_type: nuimo_input
    event_data:
      type: ROTATE
  condition:
    condition: template
    value_template: {% raw %}'{{ trigger.event.data.value > 100 }}'{% endraw %}
  action:
    service: nuimo_controller.led_matrix
    data:
      matrix:
            '........
             0000000.
             .000000.
             ..00000.
             .0.0000.
             .00.000.
             .000000.
             .000000.
             ........'
      interval: 0.5
```

Troubleshooting:

- use `hcitool lescan` to see the mac address of your device

- allow non-root user access to Bluetooth LE with `sudo setcap cap_net_raw+eip $(eval readlink -f $(which python))`

- install the newest version of [pygattlib](https://bitbucket.org/OscarAcena/pygattlib) from the repository, either because there is no binary package for your system or the pip version contains errors, with `pip install hg+https://bitbucket.org/OscarAcena/pygattlib --target $HOME/.homeassistant/deps`.
(Dependencies of pygattlib: `sudo apt-get install pkg-config libboost-python-dev libboost-thread-dev libbluetooth-dev libglib2.0-dev python-dev`)
Then invoke Home Assistant with `hass --skip-pip`.
