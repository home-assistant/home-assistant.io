---
title: Nissan Leaf
description: Instructions for how to integrate Nissan Leaf(s) into Home Assistant.
ha_category:
  - Car
ha_release: 0.89
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@filcole'
ha_domain: nissan_leaf
ha_platforms:
  - binary_sensor
  - button
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `nissan_leaf` {% term integration %} offers integration with the [NissanConnect EV](https://www.nissan.co.uk/dashboard.html) cloud service. NissanConnect EV was previously known as Nissan Carwings.

{% important %}
Please be aware that the `nissan_leaf` {% term integration %} only works with Nissan vehicles from before 2019. Newer vehicles will not work with this integration.
{% endimportant %}

The {% term integration %} offers offers:

- sensors for the battery status, range and charging status.
- a switch to start and stop the climate control.
- a button to request the car starts charging.
- action to request updates from the car.

## Configuration

To use Nissan Leaf in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
nissan_leaf:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  region: "YOUR_REGION"
```

{% configuration %}
username:
  description: The username associated with your NissanConnect EV account. Enclose in quotes.
  required: true
  type: string
password:
  description: The password for your given NissanConnect EV account. Enclose in quotes.
  required: true
  type: string
region:
  description: The region where the NissanConnect EV account is registered. Should be one of the following, NE (for Europe), NNA (USA), NCI (Canada), NMA (Australia), NML (Japan).
  required: true
  type: string
update_interval:
  description: The interval between updates if the climate control is off and the car is not charging. Set in any time unit (e.g.,  minutes, hours, days!). Providing a low interval will cause the service to refresh more frequently and can negatively impact your 12V battery. 
  required: false
  default: 1 hour
  type: time
update_interval_charging:
  description: The interval in minutes between updates if charging.
  required: false
  default: 15
  type: time
update_interval_climate:
  description: The interval in minutes between updates if climate control on.
  required: false
  default: 5
  type: time
{% endconfiguration %}

## Full configuration sample

A more advanced example for setting the update interval:

```yaml
# Example configuration.yaml entry
nissan_leaf:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  region: "YOUR_REGION"
  update_interval:
    hours: 1
  update_interval_charging:
    minutes: 15
  update_interval_climate:
    minutes: 5
  force_miles: true
```

## Starting a Charge

You can use the `button.press` action to send a request to the Nissan servers to start a charge. The car must be plugged in!

```yaml
- action: button.press
  target:
    entity_id: button.start_NICKNAME_charging    # replace
```

## Updating on-demand using Automation

You can also use the `nissan_leaf.update` action to request an on-demand update. To update almost exclusively via the action set the `update_interval` to a high value in the integration configuration.  The action requests the VIN number as described above.

```yaml
- id: update_when_driver_not_home
  alias: "Update when driver not home"
  initial_state: on
  triggers:
    - trigger: time_pattern
      minutes: "/30"
  conditions:
    - condition: state
      entity_id: device_tracker.drivername   # replace
      state: "not_home"
  actions:
    - action: nissan_leaf.update
      data:
        vin: "1HGBH41JXMN109186"             # replace
```

## Hints

- The update interval has a minimum of two minutes.
- Requesting updates uses a small amount of energy from the 12 V battery. The 12 V battery charges from the main traction battery when the car is not plugged in. If the car is left plugged in for a long time, or if the main traction battery is very low then the 12 V battery may gradually discharge. A low update interval may cause the 12 V battery to become flat.  When the 12 V battery is flat the car will not start. _Do not set the update interval too low.  Use at your own risk._
- This integration communicates with the Nissan Servers which then communicate with the car. The communication between the car and the Nissan Servers is very slow, and takes up to five minutes to get information from the car, therefore the default polling interval is set to one hour to not overwhelm the connection.
- Responses from the Nissan servers are received separately for the battery/range, climate control, and location. The `updated_on` attribute will show the last time the data was retrieved from the server. There are separate attributes for when the `next_update` is scheduled and for indicating if `update_in_progress`. The `nissan_leaf.update` action will reset the `next_update` attribute.
- The Nissan APIs do not allow charging to be stopped remotely.
- The Nissan servers have a history of being unstable, therefore please confirm that the official Nissan Leaf app/website is working correctly before reporting bugs.
- In the UK the cut-off for Carwings was the 16 plate 24 kWh and the 65 plate 30 kWh. Cars after this have NissanConnect.
- As of 25 July 2019 the MyCarFinder API is not longer available, hence the device_tracker support has been removed.

Please report bugs using the following logger configuration.

```yaml
logger:
  default: critical
  logs:
    homeassistant.components.nissan_leaf: debug
    homeassistant.components.binary_sensor.nissan_leaf: debug
    homeassistant.components.button.nissan_leaf: debug    
    homeassistant.components.sensor.nissan_leaf: debug
    homeassistant.components.switch.nissan_leaf: debug
```
