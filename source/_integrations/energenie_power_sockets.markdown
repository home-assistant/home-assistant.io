---
title: Energenie Power-Sockets
description: Instructions on how to integrate Energenie Power-Strip switches into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: '2024.4'
ha_codeowners:
  - '@gnumpi'
ha_domain: energenie_power_sockets
ha_platforms:
  - switch
ha_integration_type: integration
---

This integration allows you to include [Energenie USB Power-Sockets](https://energenie.com/item.aspx?id=7556&lang=de) into your Home Assistant setup.

{% include integrations/config_flow.md %}

## Troubleshooting

Depending on your system configuration, it may be necessary to grant explicit user access rights to the USB device by creating a udev rule.

1. find the *vendor_id* and *product_id* of the USB device by calling `lsusb`:

```bash
lsusb

#e.g.: Bus 001 Device 005: ID 04b4:fd15 Cypress Semiconductor Corp. Energenie EG-PMS2
```

2. create an udev rule by calling:

```bash
sudo echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="04b4", ATTR{idProduct}=="fd15", MODE="0666"' > /lib/udev/rules.d/60-energenie-usb.rules
sudo udevadm control --reload-rules
sudo udevadm trigger
```
