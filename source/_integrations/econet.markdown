---
title: Rheem EcoNET Water Products
description: Instructions on how to integrate Rheem EcoNet water heaters into Home Assistant.
ha_category:
  - Water Heater
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_domain: econet
---

The `econet` water heater platform is consuming the information provided by a [EcoNet enabled Rheem water heater](https://www.rheem.com/EcoNet/Home). This platform allows you to set the temperature, the operation mode, and enable vacation mode.

## Configuration

To enable the `econet` water heater platform, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
water_heater:
  - platform: econet
    username: YOUR_ECONET_EMAIL
    password: YOUR_ECONET_PASSWORD
```

{% configuration %}
username:
  description: The username used to connect to your EcoNet account.
  required: true
  type: string
password:
  description: The password used to connect to your EcoNet account.
  required: true
  type: string
{% endconfiguration %}

### Service `econet.add_vacation`

You can use the service `econet.add_vacation` to create a new vacation for your EcoNet water heaters.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | The entity id of the water heater to add the vacation to.
| `start_date` | yes | This is a Unix timestamp for when the vacation should start.
| `end_date` | yes | this is a Unix timestamp for when the vacation should end.

<div class='note'>

The Unix timestamps can be obtained from the `input_datetime` component. This will allow you to graphically set the start and end date.

</div>

### Service `econet.delete_vacation`

You can use the service `econet.delete_vacation` to remove all vacations from an EcoNet water heater.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | The entity id of the water heater to remove the vacation from.

<div class='note'>

Econet water heaters use to live under the `climate` platform prior to release 0.81.

</div>
