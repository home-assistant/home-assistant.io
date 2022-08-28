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
ha_integration_type: integration
---

The `modem_callerid` integration uses an available modem for collecting caller ID information. It requires a Hayes AT compatible modem that supports caller ID detection (via AT+VCID=1). Usually any modem that uses a CX93001 will support this.

When the sensor detects a new call, its state changes to 'ring' for each ring and 'callerid' when caller id information is received. It returns to 'idle' once ringing stops. The state event includes an attribute payload that includes the time of the call, name, and number.

This integration also offers a button to pick up and then hang up the call to properly reject it (via ATA and ATH).

{% include integrations/config_flow.md %}

## Examples

An example automation:

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
