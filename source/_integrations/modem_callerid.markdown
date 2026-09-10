---
title: Phone Modem
description: Instructions on how to integrate the Caller ID sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: '0.40'
ha_iot_class: Local Polling
ha_domain: modem_callerid
ha_codeowners:
  - '@tkdrob'
ha_platforms:
  - button
  - sensor
ha_config_flow: true
ha_integration_type: device
---

The **Phone Modem** {% term integration %} uses an available modem for collecting caller ID information. It requires a Hayes AT compatible modem that supports caller ID detection (via AT+VCID=1). Usually any modem that uses a CX93001 will support this.

When a call is detected, the sensor changes to `ring`. Caller ID information can arrive separately from the ring event. When it is received, the sensor changes to `callerid`, and the available caller ID information is exposed in the `cid_name`, `cid_number`, and `cid_time` attributes. The sensor returns to `idle` once ringing stops.

If you want to trigger an automation using the caller's name or number, trigger on the `callerid` state rather than `ring`, so the caller ID attributes are available to the automation.

This integration also offers a button to pick up and then hang up the call to properly reject it (via ATA and ATH).

{% include integrations/config_flow.md %}

## Compatibility

Reported models with this integration include that work:
- [StarTech.com USB56KEMH2](https://www.startech.com/en-us/networking-io/usb56kemh2)
- Zoom USB Modem Model 3095

Devices that did not work:
- [StarTech.com USB56KEM3](https://www.startech.com/en-us/networking-io/usb56kem3)

## Examples

### Run actions when caller ID is received

The [Announce incoming phone calls blueprint](https://github.com/home-assistant/home-assistant.io/blob/current/source/blueprints/integrations/modem_callerid/announce-caller.yaml) can run actions when caller ID information is received. Select the Phone Modem incoming call sensor and configure the actions you want to run.

The blueprint provides `caller_name` and `caller_number` variables that can be used in templates in those actions. For example, you can use them to send a notification or announce the caller on a media player.
