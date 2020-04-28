---
title: Hunter Douglas PowerView
description: Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant.
ha_category:
  - Cover
  - Scene
ha_release: 0.15
ha_domain: hunterdouglas_powerview
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
---

The `hunterdouglas_powerview` integration allows you to integrate your [Hunter Douglas PowerView](https://www.hunterdouglas.com/operating-systems/powerview-motorization/support) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Cover
- Scene

To add `Hunter Douglas PowerView` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Hunter Douglas PowerView**.

Alternatively, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
hunterdouglas_powerview:
  - host: IP_ADDRESS
```

```yaml
# Example configuration.yaml with multiple hubs
hunterdouglas_powerview:
  - host: IP_ADDRESS
  - host: IP_ADDRESS_2
```

{% configuration %}
host:
  description: IP address of the PowerView Hub, e.g., 192.168.1.10.
  required: true
  type: string
{% endconfiguration %}

## Example Automations

``` yaml
- alias: "blinds closed at night"
  trigger:
    platform: time
    at: "18:00:00"
  action:
    - service: scene.turn_on
      entity_id: scene.10877
```
