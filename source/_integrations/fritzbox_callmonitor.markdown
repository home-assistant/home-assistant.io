---
title: AVM FRITZ!Box Call Monitor
description: Instructions on how to integrate a phone call monitor for AVM FRITZ!Box routers into Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.27
ha_iot_class: Local Polling
ha_domain: fritzbox_callmonitor
---

The `fritzbox_callmonitor` sensor monitors the call monitor exposed by [AVM FRITZ!Box](https://avm.de/produkte/fritzbox/) routers on TCP port 1012. It will assume the values `idle`, `ringing`, `dialing` or `talking` with the phone numbers involved contained in the state attributes.
It can also access the internal phone book of the router to look up the names corresponding to the phone numbers and store them in the state attributes.

## Setup

To activate the call monitor on your FRITZ!Box, dial **#96\*5\*** from any phone connected to it.

## Configuration

To add the AVM FRITZ!Box Call Monitor integration to your installation, go to **Configuration** -> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **AVM FRITZ!Box Call Monitor**.

## Examples

### Send notifications on state change

This example shows how to send notifications whenever the sensor's state changes. You will get notified both when you receive a call and also when a call is placed.

{% raw %}

```yaml
# Example configuration.yaml entry.
automation:
  - alias: "Notify about phone state"
    trigger:
      - platform: state
        entity_id: sensor.phone
    action:
      - service: notify.notify
        data:
          title: "Phone"
          message: >-
            {% if is_state("sensor.phone", "idle") %}
              Phone is idle
            {% elif is_state("sensor.phone", "dialing") %}
              Calling {{ state_attr('sensor.phone', 'to_name') }} ({{ state_attr('sensor.phone', 'to') }})
            {% elif is_state("sensor.phone", "ringing") %}
              Incoming call from {{ state_attr('sensor.phone', 'from_name') }} ({{ state_attr('sensor.phone', 'from') }})
            {% else %}
              Talking to {{ state_attr('sensor.phone', 'with_name') }} ({{ state_attr('sensor.phone', 'with') }})
            {% endif %}
```

{% endraw %}
