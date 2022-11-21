---
title: Blue Current
description: Instructions on how to integrate Blue Current chargepoints within Home Assistant.
ha_category:
  - Sensor
  - Car
ha_release: 2022.12
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@Floris272'
  - '@gleeuwen'
ha_domain: bluecurrent
ha_platforms:
  - sensor
---

[BlueCurrent](https://www.bluecurrent.nl/) is an Dutch company that makes electric car chargers.

The Blue Current integration allows you to connect to your blue current account to Home Assistant and monitor your chargepoint(s).

## Prerequisites

1. Login to the [Blue Current driver portal](https://bo.bluecurrent.nl/)
2. goto settings and enable developer mode
3. Generate an api token

{% include integrations/config_flow.md %}

## Sensor

The Blue Current integration provides the following sensors:
<br>
<br>

### chargepoint sensors

---

- average current
- average voltage
- total kW (estimate)
- energy usage in kWh
- started on
- stopped on
- offline since
- total cost in EUR
- vehicle status
- activity
- max usage in Amps
  - the max amps the charge point can use.

disabled by default:

- current phase 1-3
- voltage phase 1-3
- smart charging max usage
- offline max usage
- remaining current

<br>

### grid sensors

---

- grid max current
- grid average current

disabled by default

- grid current phase 1-3
