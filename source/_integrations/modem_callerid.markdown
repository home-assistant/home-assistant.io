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
  - sensor
ha_config_flow: true
---

The `modem_callerid` integration uses an available modem for collecting caller ID information. It requires a Hayes AT compatible modem that supports caller ID detection (via AT+VCID=1). Usually any modem that uses a CX93001 will support this.

When the sensor detects a new call, its state changes to 'ring' for each ring and 'callerid' when caller id information is received. It returns to 'idle' once ringing stops. The state event includes an attribute payload that includes the time of the call, name and number.

This integration also offers two services. `modem_callerid.reject_call` to pick up and then hang up the call to properly reject a call (via ATA anf ATH). `modem_callerid.hangup_call` to hang up an existing call (via ATH).

{% include integrations/config_flow.md %}

## Examples

Some example automations:

{% raw %}

```yaml
automation:
  - alias: Notify CallerID
    trigger:
      platform: state
      entity_id: sensor.phone_modem
      to: "callerid"
    action:
      service: notify.notify
      data:
        message: "Call from {{ state_attr('sensor.phone_modem', 'cid_name') }} at {{ state_attr('sensor.phone_modem', 'cid_number') }} "
  - alias: Notify CallerID webui
    trigger:
      platform: state
      entity_id: sensor.phone_modem
      to: "callerid"
    action:
      service: persistent_notification.create
      data:
        title: "Call from"
        message: "{{ state_attr('sensor.phone_modem', 'cid_time').strftime("%I:%M %p") }} {{ state_attr('sensor.phone_modem', 'cid_name') }}  {{ state_attr('sensor.phone_modem', 'cid_number') }} "
  - alias: Say CallerID
    trigger:
      platform: state
      entity_id: sensor.phone_modem
      to: "callerid"
    action:
      service: tts.google_say
      data:
        message: "Call from {{ state_attr('sensor.phone_modem', 'cid_name') }}"
```

{% endraw %}

## Extra instructions for the Home Assistant Core installation type

To find the path of your USB modem, run:

```bash
ls /dev/ttyACM*
```

If Home Assistant (`hass`) runs with another user (e.g., `homeassistant`) give access to the stick with:

```bash
sudo usermod -a -G dialout homeassistant
```

Depending on what's plugged into your USB ports, the name found above may change. You can lock in a name, such as `/dev/modem`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/).
