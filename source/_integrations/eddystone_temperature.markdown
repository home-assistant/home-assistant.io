---
title: Eddystone
description: Instructions on how to integrate Eddystone beacons with Home Assistant in order to receive temperature data.
ha_category:
  - DIY
ha_release: 0.42
ha_iot_class: Local Polling
ha_domain: eddystone_temperature
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `eddystone_temperature` sensor {% term integration %} reads temperature information from Bluetooth LE advertisements transmitted by [Eddystone](https://en.wikipedia.org/wiki/Eddystone_(Google)) beacons. Your beacons must be configured to transmit UID frames (for identification) and TLM frames (for temperature).
All beacons that support the Eddystone protocol, have a temperature sensor and can transmit TLM frames are compatible with this {% term integration %}. For example [Gimbal](https://store.gimbal.com/collections/beacons/), [Estimote](https://estimote.com/) or [kontakt.io](https://kontakt.io/).

## Requirements

As this {% term integration %} uses `bluez` to scan for Bluetooth LE devices **a Linux OS with bluez installed** is required. In addition to that, the `libbluetooth` headers need to be installed:

```bash
sudo apt-get install libbluetooth-dev
```

Scanning for Bluetooth LE devices also requires special permissions. To grant these to the Python executable execute the following:

```bash
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_raw,cap_net_admin+eip' $(readlink -f $(which python3))
```

To use your Eddystone beacon in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: eddystone_temperature
    bt_device_id: 0  # optional
    beacons:
      living_room:
        namespace: "112233445566778899AA"
        instance: "000000000001"
      kitchen:
        namespace: "112233445566778899AA"
        instance: "000000000002"
```

{% configuration %}
bt_device_id:
  description: The id of the Bluetooth device that should be used for scanning (hci*X*). You can find the correct one using `hcitool dev`.
  required: false
  default: 0
  type: integer
beacons:
  description: The beacons that should be monitored.
  required: true
  type: list
  keys:
    entry:
      description: Name of the beacon.
      required: true
      type: list
      keys:
        namespace:
          description: Namespace ID of the beacon in hexadecimal notation. Must be exactly 20 characters (10 bytes) long.
          required: true
          type: string
        instance:
          description: Instance ID of the beacon in hexadecimal notation. Must be exactly 12 characters (6 bytes) long.
          required: true
          type: string
        name:
          description: Friendly name of the beacon.
          required: false
          type: string
{% endconfiguration %}
