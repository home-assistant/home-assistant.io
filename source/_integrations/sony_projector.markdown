---
title: Sony Projector
description: Instructions on how to integrate Sony Projector switches into Home Assistant.
ha_category:
  - Multimedia
ha_iot_class: Local Polling
ha_release: 0.89
ha_domain: sony_projector
ha_platforms:
  - switch
ha_integration_type: integration
ha_quality_scale: legacy
---

The `sony_projector` switch platform allows you to control the state of SDCP compatible network-connected projectors from [Sony](https://www.sony.com/).

## Configuration

To use your Sony Projector in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: sony_projector
    host: "192.168.1.47"
    name: "Projector"
```

{% configuration %}
host:
  description: The hostname or IP address of the projector.
  required: true
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
{% endconfiguration %}

Under your projector's web interface **Advanced Menu**, you may need to:
- Enable/start the **PJ Talk** service.
- Add the IP of your Home Assistant server to the **Host Address** field.
