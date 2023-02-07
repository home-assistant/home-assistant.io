---
title: go-e Charger Cloud
description: Instructions on setting up go-e Charger within Home Assistant.
ha_category:
  - Car
  - Sensor
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_release: '2023.2'
ha_config_flow: true
ha_codeowners:
  - '@openkfw'
ha_domain: smartenergy_goecharger
ha_platforms:
  - sensor
ha_integration_type: hub
---

The go-e Charger Cloud integration allows you to monitor the go-e wallbox and the car connected to it. The integration currently supports the following features:

- connect to the wallbox via cloud API (v2) and retrieve the status
- portion of the retrieved status is displayed via sensors

{% include integrations/config_flow.md %}

## Sensors

The following sensors are available to monitor the wallbox (and the car respectively):

| Name                         | Description                                                    | go-e Charger API parameter |
| ---------------------------- | -------------------------------------------------------------- | -------------------------- |
| Access Control               | Access control for the device - 0/1.                           | `acs`                      |
| Car charging status          | State of the car - connected/charging/etc.                     | `car`                      |
| Car charging allowed         | Whether the car is allowed to charge at all.                   | `alw`                      |
| Charger name                 | Friendly name of the device.                                   | N/A                        |
| Current charging speed (max) | Requested max current for charging in A.                       | `amp`                      |
| Energy since car connected   | Energy in kWh since car is connected.                          | `wh`                       |
| Energy total                 | Total energy used in kWh.                                      | `eto`                      |
| Phase switch mode            | Phase switch mode - auto/1/3.                                  | `psm`                      |
| Number of connected phases   | Number of connected phases - relates to the Phase switch mode. | `pnp`                      |
