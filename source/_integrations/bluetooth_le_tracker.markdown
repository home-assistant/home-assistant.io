---
title: Bluetooth LE Tracker
description: Instructions for integrating bluetooth low-energy tracking within Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.27
ha_domain: bluetooth_le_tracker
---

This tracker discovers new devices on boot and in regular intervals and tracks Bluetooth low-energy devices periodically based on interval_seconds value. It is not required to pair the devices with each other.

Devices discovered are stored with 'BLE_' as the prefix for device mac addresses in `known_devices.yaml`.

This platform requires pybluez to be installed. On Debian based installs, run

```bash
sudo apt install bluetooth
```

Before you get started with this platform, please note that:

 - This platform is incompatible with Windows
 - This platform requires access to the Bluetooth stack, see [Rootless Setup section](#rootless-setup) for further information

To use the Bluetooth tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_le_tracker
```

{% configuration %}
track_new_devices:
  description: If new discovered devices are tracked by default.
  required: false
  default: false
  type: boolean
interval_seconds:
  description: Seconds between each scan for new devices.
  required: false
  default: 12
  type: integer
device_id:
  description: The ID of the Bluetooth adapter to be used by the tracker, e.g., use `0` for `hci0`, `1` for `hci1`, and so on.
  required: false
  type: integer
  default: "`0` (`hci0` Bluetooth adapter)"
{% endconfiguration %}

As some BT LE devices change their MAC address regularly, a new device is only discovered when it has been seen 5 times.
Some BTLE devices (e.g., fitness trackers) are only visible to the devices that they are paired with. In this case, the BTLE tracker won't see this device.

## Rootless Setup

Normally accessing the Bluetooth stack is reserved for root, but running programs that are networked as root is a bad security wise. To allow non-root access to the Bluetooth stack we can give Python 3 and hcitool the missing capabilities to access the Bluetooth stack. Quite like setting the setuid bit (see [Stack Exchange](https://unix.stackexchange.com/questions/96106/bluetooth-le-scan-as-non-root) for more information).

```bash
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_raw,cap_net_admin+eip' `readlink -f \`which python3\``
sudo setcap 'cap_net_raw+ep' `readlink -f \`which hcitool\``
```

A restart of Home Assistant is required.

For additional configuration variables check the [Device tracker page](/integrations/device_tracker/).
