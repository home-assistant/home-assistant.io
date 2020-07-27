---
title: "OpenRGB"
description: "Open Source Desktop RGB Controller"
ha_release: "0.114"
ha_category: Light
ha_iot_class: "Local Polling"
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@bahorn'
ha_domain: openrgb
---

The `OpenRGB` integration allows you to control various desktop RGB lighting products via the [OpenRGB SDK Server](https://gitlab.com/CalcProgrammer1/OpenRGB).

## Configuration via frontend

To connect to OpenRGB using the Home Assistant frontend:

* Navigate to **Configuration -> Integrations**
* Click the **+** in the bottom corner.
* Find **OpenRGB** in the dropdown menu.
* Fill in the connection details.

Your RGB lighting should now be available to Home Assistant!

## Configuration by YAML

Add the following to your `configuration.yaml`, adjusting the host and port as required.

```yaml
openrgb:
    host: locahost
    port: 6742
```

{% configuration %}
host:
    description: The host the OpenRGB SDK Server is running on.
    required: true
    type: string
port:
    description: The port number the OpenRGB SDK Server is running on.
    required: false
    default: 6742
    type: integer
client_id:
    description: The client name to provide to the server.
    required: false
    default: "Home Assistant"
    type: string
{% endconfiguration %}
