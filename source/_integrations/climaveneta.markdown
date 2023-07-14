---
title: Climaveneta
description: Instructions on how to integrate Mitsubishi-Climaveneta i-MXW and Sabiana Carisma Fly fan coil unit into Home Assistant.
ha_category:
  - Climate
ha_release: 2023.8
ha_codeowners:
  - '@Tadiern'
ha_iot_class: Local Polling
ha_domain: climaveneta_imxw
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates [Climaveneta i-MXW](https://www.melcohit.com/en/products/2597) and Sabiana Carisma Fly [Carisma Fly](https://www.sabiana.it/en/products/carisma-fly) fan coil unit into Home Assistant and possibly other rebranded units.

Requires an MC3 Modbus Intefacing Board, for Mitsubishi-Climaveneta the product code is 5573048000.

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: climaveneta_imxw
    slave: 21
```

{% configuration %}
slave:
  description: The slave ID of the modbus adapter, set using DIP-switches.
  required: true
  type: integer
name:
  description: Displayed name of the fan coil unit.
  required: false
  type: string
hub:
  description: The name of the hub where this slave is located.
  required: false
  default: default
  type: string
{% endconfiguration %}

<div class='note'>

This integration requires the [Modbus](/integrations/modbus/) integration to be set up to work

</div>

Full configuration example including modbus setup shown below:

DIP-switch settings on the MC3 board:
1=ON, 2=OFF, 3=ON, 4=OFF, 5=ON, 6=OFF

```yaml
# Full example configuration.yaml entry
modbus:
  type: serial
  method: rtu
  port: /dev/ttyUSB0
  baudrate: 9600
  stopbits: 1
  bytesize: 8
  parity: N

climate:
  - platform: climaveneta_imxw
    name: "Dining room"
    slave: 21
```
