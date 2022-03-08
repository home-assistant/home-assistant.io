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

## Services

### Service `picnic.search`

Search for a product using the `picnic.search` service. The first 5 results will be published using the `picnic_serach_result` event.
The search result order is determined by Picnic, and can e.g. depend on what was bought previously using the account.

| Service data attribute | Optional | Description                                                                     |
|------------------------|----------|---------------------------------------------------------------------------------|
| `device_id`            | yes      | The Picnic service to search against, defaults to the first registered service. |
| `product_name`         | no       | The product name to search for.                                                 |

Search result attributes:

| Search result attribute | Optional |
|-------------------------|----------|
| `id`                    | no       |
| `name`                  | no       |
| `price`                 | no       |
| `quantity`              | no       |
| `discount_price`        | yes      |
| `discount_label`        | yes      |
| `discount_validity`     | yes      |


Example automation action to search for a product.
  ```yaml 
  - service: picnic.search
    data:
      product_name: "Yoghurt"
  ```

Example of the published event data:
```json
{
    "11474159": {
        "id": "11474159",
        "name": "Beyond Meat vegan burger",
        "price": 3.99,
        "quantity": "2 x 113 gram",
        "discount_price": 3.19,
        "discount_label": "20% korting",
        "discount_validity": "2022-03-13"
    },
    "11474164": {
        "id": "11474164",
        "name": "Beyond Meat vegan worst",
        "price": 3.99,
        "quantity": "2 x 100 gram",
        "discount_price": 3.19,
        "discount_label": "20% korting",
        "discount_validity": "2022-03-13"
    },
    "11474167": {
        "id": "11474167",
        "name": "Beyond Meat vegan balletjes",
        "price": 3.99,
        "quantity": "200 gram"
    },
    "11474170": {
        "id": "11474170",
        "name": "Beyond Meat vegan gehakt",
        "price": 3.99,
        "quantity": "300 gram"
    }
}
```

### Service `picnic.add_product`

Add a product to you cart using the `picnic.add_product` service, either using a product ID found with the `picnic.search` service or using a product name.
A search will be done and the first result will be added to the cart when one adds a product using a product name.
The service call will fail when no product could be found or when no `product_id` or `product_name` were specified. 

| Service data attribute | Optional | Description                                                                      |
|------------------------|----------|----------------------------------------------------------------------------------|
| `device_id`            | yes      | The Picnic service to search against, defaults to the first registered service.  |
| `product_id`           | yes      | The Picnic product ID.                                                           |
| `product_name`         | yes      | A product name to search for, the first search result will be added to the cart. |

```yaml
# Example automation action to add a product to the cart by name.
- service: picnic.add_product
  data:
    product_name: "Picnic cola zero"
```