---
title: Picnic
description: How to setup and use the Picnic integration in Home Assistant.
ha_category:
  - Other
ha_release: 2021.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@corneyl'
ha_domain: picnic
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Picnic integration allows one to get information from [Picnic](https://picnic.app) about orders, deliveries and cart content.

{% include integrations/config_flow.md %}

## Sensors

This integration provides the following sensors. Some sensors are disabled by default when adding the integration.

| Name                           | Description                                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cart items count               | The amount of different products currently in the cart.                                                                                             |
| Cart total price               | The total price for products currently in the cart.                                                                                                 |
| Selected slot start            | Start of the selected delivery slot, `unknown` if none is selected.                                                                             |
| Selected slot end              | End of the selected delivery slot, `unknown` if none is selected.                                                                               |
| Selected slot max order time   | Maximum time it's still possible to place an order for the selected delivery slot, `unknown` if none is selected.                               |
| Selected slot min order value  | The minimum order value needed to be able to place an order for the selected delivery window slot, `unknown` if none is selected.               |
| Last order slot start          | Start of the last placed order's delivery slot                                                                                                      |
| Last order slot end            | End of the last placed order's delivery slot                                                                                                        |
| Last order status              | Status of the last order, either `CURRENT`, `CANCELLED` or `COMPLETED`. Will only transition to `COMPLETED` after the invoice email has been sent.  |
| Last order max order time      | Maximum time it is/was still possible to add products to the last order. |
| Last order delivery time       | The delivery time of the last order, `unavailable` if not yet delivered. |
| Last order total price         | The total price of the last order. |
| Next delivery ETA start        | Start of the ETA window of the next delivery, will get more precise if the driver is underway. |
| Next delivery ETA end          | End of the ETA window of the next delivery. |
| Next delivery slot start       | Start of the next delivery's delivery slot. |
| Next delivery slot end         | End of the next delivery's delivery slot. |
