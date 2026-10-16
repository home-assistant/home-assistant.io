---
title: "Gateway disconnected"
trigger: easywave.gateway_disconnected
domain: easywave
description: "Triggers when the RX11 USB transceiver is disconnected."
related_triggers:
  - easywave.gateway_connected
---

The **Gateway disconnected** trigger fires when the Easywave RX11 USB transceiver goes offline. Use it to send an alert when the stick is unplugged, loses USB power, or cannot be reached.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the RX11 gateway device or its **Connection status** sensor.
5. From the triggers shown for that target, select **Gateway disconnected**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.gateway_disconnected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.gateway_disconnected
  target:
    entity_id: sensor.rx11_usb_transceiver_connection_status
{% endexample %}

This fires when the RX11 disconnects.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- Target the RX11 **Connection status** sensor.
- After a disconnect, transmitter and neo sensor entities become unavailable until the stick reconnects.
- Changes to `unavailable` or `unknown` do not count as a disconnect event by themselves; this trigger follows the gateway connection status transition.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the RX11 disconnects

Use this to learn quickly when the USB transceiver is unplugged or offline.

- **Trigger**: Gateway disconnected
  - **Target**: RX11 connection status sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a gateway disconnect notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave gateway disconnects"
  triggers:
    - trigger: easywave.gateway_disconnected
      target:
        entity_id: sensor.rx11_usb_transceiver_connection_status
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The Easywave RX11 USB transceiver is disconnected."
{% endexample %}

{% enddetails %}

### Automation: turn off a status light when the gateway disconnects

Use this when an indicator light should go off while Easywave is offline.

- **Trigger**: Gateway disconnected
  - **Target**: RX11 connection status sensor
- **Action**: Turn off light
  - **Target**: Easywave status light

{% details "YAML example for turning off a status light on disconnect" %}

{% example %}
automation: |
  alias: "Turn off status light when Easywave gateway disconnects"
  triggers:
    - trigger: easywave.gateway_disconnected
      target:
        entity_id: sensor.rx11_usb_transceiver_connection_status
  actions:
    - action: light.turn_off
      target:
        entity_id: light.easywave_status
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
