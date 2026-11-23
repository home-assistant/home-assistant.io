---
description: Instructions on how to integrate Samsung Family Hub refrigerator cameras within Home Assistant.
ha_release: '0.70'
ha_domain: familyhub
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Samsung Family Hub** {% term integration %} allows you to get images of the inside of your [Samsung Family Hub refrigerator](https://www.samsung.com/us/explore/family-hub-refrigerator/connected-hub/) in Home Assistant.

## Configuration

To enable your Family Hub camera in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
camera:
  - platform: familyhub
    ip_address: "IP_ADDRESS"
```

{% configuration %}
ip_address:
  description: The IP address of your refrigerator.
  required: true
  type: string
{% endconfiguration %}
