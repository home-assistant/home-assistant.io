---
title: "Gateway connected"
trigger: easywave.gateway_connected
domain: easywave
description: "Triggers when the RX11 USB transceiver is connected."
related_triggers:
  - easywave.gateway_disconnected
---

The **Gateway connected** trigger fires when the Easywave RX11 USB transceiver becomes connected again. Use it to clear alerts, resume related automations, or confirm that a USB reconnect succeeded.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), select the RX11 gateway device or its **Connection status** sensor.
5. From the triggers shown for that target, select **Gateway connected**.
6. Select **Save**.

### Options in the UI

This trigger has no additional options beyond the target.

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `easywave.gateway_connected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: easywave.gateway_connected
  target:
    entity_id: sensor.rx11_usb_transceiver_connection_status
{% endexample %}

This fires when the RX11 reconnects.

### Options in YAML

This trigger has no additional YAML options beyond the target.

{% include triggers/targets.md %}

## Good to know

- Target the RX11 **Connection status** sensor.
- This trigger fires on a transition to connected, not on every periodic health check while the stick stays connected.
- Changes to `unavailable` or `unknown` do not count as a connection event.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the RX11 reconnects

Use this to confirm that the USB transceiver is available again after a disconnect.

- **Trigger**: Gateway connected
  - **Target**: RX11 connection status sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a gateway reconnect notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave gateway reconnects"
  triggers:
    - trigger: easywave.gateway_connected
      target:
        entity_id: sensor.rx11_usb_transceiver_connection_status
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The Easywave RX11 USB transceiver is connected again."
{% endexample %}

{% enddetails %}

### Automation: turn on a status light when the gateway reconnects

Use this when a small indicator light should show that Easywave is online again.

- **Trigger**: Gateway connected
  - **Target**: RX11 connection status sensor
- **Action**: Turn on light
  - **Target**: Easywave status light

{% details "YAML example for turning on a status light on reconnect" %}

{% example %}
automation: |
  alias: "Turn on status light when Easywave gateway reconnects"
  triggers:
    - trigger: easywave.gateway_connected
      target:
        entity_id: sensor.rx11_usb_transceiver_connection_status
  actions:
    - action: light.turn_on
      target:
        entity_id: light.easywave_status
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
