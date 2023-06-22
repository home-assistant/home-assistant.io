---
title: EnergyID
description: Instructions on how to integrate EnergyID into Home Assistant.
ha_category:
  - Energy
  - Hub
ha_iot_class: Cloud Push
ha_domain: energyid
ha_integration_type: integration
ha_release: 2023.6
ha_config_flow: true
ha_codeowners:
    - '@JrtPec'
---

The `Energyid` integration makes it possible to transfer measurements collected with Home Assistant to [EnergyID](https://www.energyid.eu/), a cloud based energy management platform.

The integration works by listening to changes in the state of selected entities within Home Assistant. When a change is detected, the new state is sent via HTTP POST to the [EnergyID Webhooks](https://app.energyid.eu/integrations/WebhookIn)

## Grabbing your Webhook URL

Go to the [Incoming Webhook App](https://app.energyid.eu/integrations/WebhookIn) in EnergyID and click on the `Activate` button. You will be asked to choose which Record to send the data to, and a name to give the webhook. Click `Create`, and you wil be presented with a Webhook URL. Copy this URL, as you will need it later.

The URL will look something like this:

```
https://app.energyid.eu/integrations/WebhookIn/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

{% include integrations/config_flow.md %}

Next, you are asked to fill in the required fields:

- **EnergyID Webhook URL**: The URL of the EnergyID Webhook you created earlier.
- **Home Assistant Entity ID**: The entity ID of the Home Assistant entity you want to send to EnergyID. The drop-down is populated with the entities that are available in Home Assistant.
- **EnergyID Metric**: The metric that is being measured. The drop-down is populated with the metrics that are available in EnergyID. You can also find the list on our [documentation website](https://api.energyid.eu/docs.html#webhook).
- **EnergyID Metric Kind**: Choose from `cumulative`, `total`, `delta` or `gauge`. This describes how we should interpret the values.:
  - `cumulative`: A value that only accumulates over time. For example, the total energy measured by a smart meter.
  - `total`: The change in a value during a time interval. The timestamp indicates the *start of the time interval*.
  - `delta`: The change in a value during a time interval. The timestamp indicates the *end of the time interval*.
  - `gauge`: An instantaneous measurement of a value. An example of a gauge metric is the current temperature.
- **Unit of Measurement**: The unit of the metric. Can be `kWh, Wh, l, m³, kg, km, °C, %, count`. The drop-down is populated with the units that are available in EnergyID. You can also find the list on our [documentation website](https://api.energyid.eu/docs.html#webhook).

### Optional fields

By clicking `configure`, after you have filled in the required fields, you can change optional fields:

- **EnergyID Data Interval**: Defines the resolution of the data that EnergyID will retain. Can be `P1M` (monthly), `P1D` (daily), `PT1H` (hourly), `PT15M` (quarter-hourly), `PT5M` (five-minute). The default is `P1D`. If multiple values are sent within the same interval, the last value will be retained. Note that some shorter intervals will require a paid subscription.
- **Upload Interval (seconds)**: Defines, in seconds, how long the integration will wait before listening for the next value. The default is `300` (5 minutes).
