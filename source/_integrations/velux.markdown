---
title: Velux
description: Instructions on how to integrate Velux KLF 200 integration with Home Assistant.
ha_category:
  - Scene
  - Cover
ha_release: 0.49
ha_iot_class: Local Polling
ha_codeowners:
  - '@Julius2342'
ha_domain: velux
---

[Velux](https://www.velux.com/) integration for Home Assistant allows you to connect to a Velux KLF 200 interface, to control [io-homecontrol](http://www.io-homecontrol.com) devices like windows and blinds. The module allows you to start scenes configured within KLF 200.

At least firmware version > 2.0.0.0 is required on the KLF 200 device. The firmware images may be obtained [here](https://www.velux.com/api/klf200) and may be imported via the webinterface of your KLF 200.

There is currently support for the following device types within Home Assistant:

- Cover
- Scene

## Configuration

A `velux` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
velux:
  host: "192.168.1.23"
  password: "VELUX_PASSWORD"
```

{% configuration %}
host:
  description: The IP address or hostname of the KLF 200 to use.
  required: true
  type: string
password:
  description: The password of the KLF 200 interface. Note that this is the same as the Wi-Fi password (in the upper box on the back), *not* the password for the web login.
  required: true
  type: string
{% endconfiguration %}
