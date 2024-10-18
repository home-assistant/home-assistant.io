---
title: Kuler Sky
description: Instructions for integrating Brightech Kuler Sky Bluetooth floor lamps with Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 2020.12
ha_domain: kulersky
ha_codeowners:
  - '@emlove'
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

This integration connects Brightech Kuler Sky floor lamps to Home Assistant.

{% include integrations/config_flow.md %}

{% details "Notes for Home Assistant Core Installations" %}

This integration requires `pybluez` to be installed. On Debian based installs, run:

```bash
sudo apt install bluetooth
```

Before you get started with this integration, please note that:

- Requires access to the Bluetooth stack, see [Rootless Setup section](#rootless-setup) for further information

## Rootless setup

Normally accessing the Bluetooth stack is reserved for `root`, but running programs that are networked as `root` is a bad security wise. To allow non-root access to the Bluetooth stack we can give Python 3 and `hcitool` the missing capabilities to access the Bluetooth stack. Quite like setting the setuid bit (see [Stack Exchange](https://unix.stackexchange.com/questions/96106/bluetooth-le-scan-as-non-root) for more information).

```bash
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_raw,cap_net_admin+eip' `readlink -f \`which python3\``
sudo setcap 'cap_net_raw+ep' `readlink -f \`which hcitool\``
```

{% enddetails %}
