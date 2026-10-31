---
description: Instructions on how to integrate Flo by Moen into Home Assistant.
ha_domain: flo
ha_release: 0.115
---

The **Flo** {% term integration %} integrates
[Flo by Moen smart water shutoff valves](https://www.moen.com/flo) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Binary sensor**: reports whether there are any pending alerts. It stays on while any alert remains pending, so its state does not change when another alert is raised while one is already pending.
- **Event**: fires when the valve reports a new alert, or when an alert that is already pending occurs again, including while earlier alerts are still pending. Flo is polled once a minute, so repeats within one poll are reported as a single event. Alerts raised while Home Assistant is not running are not reported. The event type is the alert's severity (`info`, `warning`, or `critical`), and the event data includes the Flo alarm type ID and how many of that alert are pending. Use this entity to trigger automations on new alerts.
- **Sensor**: reports on the device's system mode, water flow rate, temperature, water pressure, and daily water consumption.
- **Switch**: allows you to open and close the valve on the water shutoff device.

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}
