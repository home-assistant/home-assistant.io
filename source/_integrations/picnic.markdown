---
title: Picnic
description: How to setup and use the Picnic integration in Home Assistant.
ha_category:
  - Other
ha_release: 2021.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@corneyl'
ha_domain: picnic
ha_platforms:
  - sensor
---

The Picnic component allows one te get information from [Picnic](https://picnic.app) about orders, deliveries and cart contents.

{% include integrations/config_flow.md %}

## Sensors

This integration provides the following sensors. The term delivery and order

| Name                           | Description                                                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Completed deliveries           | Number of delivered orders.                                                                                                                     |
| Total orders                   | Total amount of orders, including canceled orders, deliveries in progress and completed deliveries.                                                |
| Cart items count               | The amount of different products currently in the cart.                                                                                             |
| Cart total price               | The total price for products currently in the cart.                                                                                                 |
| Selected slot start            | Start of the selected delivery slot, `unavailable` if none is selected.                                                                             |
| Selected slot end              | End of the selected delivery slot, `unavailable` if none is selected.                                                                               |
| Selected slot max order time   | Maximum time it's still possible to place an order for the selected delivery slot, `unavailable` if none is selected.                               |
| Selected slot min order value  | The minimum order value needed to be able to place an order for the selected delivery window slot, `unavailable` if none is selected.               |
| Last order slot start          | Start of the last placed order's delivery slot                                                                                                      |
| Last order slot end            | End of the last placed order's delivery slot                                                                                                        |
| Last order status              | Status of the last order, either `CURRENT`, `CANCELLED` or `COMPLETED`. Will only transition to `COMPLETED` after the invoice email has been sent.  |
| Last order ETA start           | Start of the ETA window of the last order, will get more precise if the driver is underway.                                                         |
| Last order ETA end             | End of the ETA window of the last order.                                                                                                            |
| Last order delivery time       | The delivery time of the last order, `unavailable` if not yet delivered.                                                                            |
| Last order total price         | The total price of the last order.                                                                                                                  |