---
title: Climaveneta
description: Instructions on how to integrate Mitsubishi-Climaveneta i-MXW and Sabiana Carisma Fly fan coil unit into Home Assistant.
ha_category:
  - Climate
ha_release: 2023.8
ha_codeowners:
  - "@Tadiern"
ha_iot_class: Local Polling
ha_domain: climaveneta_imxw
ha_platforms:
  - climate
  - sensor
ha_integration_type: integration
---

Integrates [Climaveneta i-MXW](https://www.melcohit.com/en/products/2597) and Sabiana Carisma Fly [Carisma Fly](https://www.sabiana.it/en/products/carisma-fly) fan coil unit into Home Assistant and possibly other rebranded units.

Requires an MC3 Modbus Intefacing Board, for Mitsubishi-Climaveneta the product code is 5573048000.

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example yaml:  typical serial connection
modbus:
  - name: modbus_hub
    type: serial
    port: /dev/ttyUSB0
    baudrate: 9600
    bytesize: 8
    method: rtu
    parity: N
    stopbits: 1
```

Then proceed adding the integration via UI. During the configuration, insert "modbus_hub" as hub name and the i-MXW device modbus address.

<div class='note'>

This integration requires the [Modbus](/integrations/modbus/) integration to be set up to work

</div>

DIP-switch settings on the MC3 board, selecting address 21:
1=ON, 2=OFF, 3=ON, 4=OFF, 5=ON, 6=OFF
