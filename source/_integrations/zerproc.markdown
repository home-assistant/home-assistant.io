---
title: Zerproc Bluetooth Lights
description: Instructions for integrating Zerproc bluetooth lights within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: "0.111"
ha_domain: zerproc
---

This integration discovers nearby Zerproc lights and adds them to Home Assistant.

## Setup

This integration requires `pybluez` to be installed. On Debian based installs, run

```bash
sudo apt install bluetooth
```

Before you get started with this integration, please note that:

 - Not compatible with Windows
 - Requires access to the Bluetooth stack, see [Rootless Setup section](#rootless-setup) for further information

## Configuration

This integration can be configured using the integrations page in Home Assistant.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and search for **Zerproc**.

The integration will scan for nearby devices, and is completed if any are found. No additional configuration is required. The integration will perform a BLE scan every 60 seconds to search for new devices.

## Rootless Setup

Normally accessing the Bluetooth stack is reserved for `root`, but running programs that are networked as `root` is a bad security wise. To allow non-root access to the Bluetooth stack we can give Python 3 and `hcitool` the missing capabilities to access the Bluetooth stack. Quite like setting the setuid bit (see [Stack Exchange](https://unix.stackexchange.com/questions/96106/bluetooth-le-scan-as-non-root) for more information).

```bash
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_raw,cap_net_admin+eip' `readlink -f \`which python3\``
sudo setcap 'cap_net_raw+ep' `readlink -f \`which hcitool\``
```

A restart of Home Assistant is required.
