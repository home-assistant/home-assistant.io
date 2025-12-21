---
title: RDW
description: Instructions on how to integrate RDW vehicle information with Home Assistant.
ha_category:
  - Binary sensor
  - Car
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
  - '@joostlek'
ha_domain: rdw
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
---

The **RDW** {% term integration %} connects with the [RDW](https://www.rdw.nl) (Netherlands Vehicle Authority) open data service to retrieve and monitor information about your Dutch registered vehicles in Home Assistant. RDW is the government organization responsible for vehicle registration, licensing, supervision, and enforcement in the Netherlands.

## Use case

With this integration, you can keep track of important vehicle information like periodic inspection (<abbr title="Algemene Periodieke Keuring">APK</abbr>) expiration dates, insurance status, and recall notifications directly in your Home Assistant dashboard. This saves you from having to manually check the RDW website or wait for paper notifications in the mail. You can set up automations to receive timely reminders when your vehicle needs attention.

## Prerequisites

To use this integration, you need:

1. A vehicle with Dutch registration (license plate)
2. The license plate number of the vehicle you want to monitor

{% include integrations/config_flow.md %}

{% configuration_basic %}
License plate:
    description: "The Dutch license plate number of your vehicle. Enter without spaces or dashes (for example, AB123C instead of AB-123-C)."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **RDW** integration provides the following entities for your vehicle:

#### Binary sensors

- **Liability insured**: Shows whether your vehicle has current liability insurance.
- **Pending recall**: Indicates if your vehicle has an open recall notice that requires attention.

#### Sensors

- **APK expiration**: The date when your vehicle's periodic technical inspection (APK) expires.
- **Ascription date**: The date when your vehicle was registered to its current owner.

## Examples

### Creating a vehicle recall alert automation

This automation sends you an important notification when the RDW reports a safety recall for your vehicle:

```yaml
# Automation to alert you about safety recalls for your vehicle
automation:
  - alias: "Vehicle recall alert"
    trigger:
      - platform: state
        entity_id: binary_sensor.rdw_ab123c_pending_recall
        to: "on"
    action:
      - service: notify.mobile_app
        data:
          title: "Vehicle recall alert"
          message: "Your vehicle has a pending safety recall. Please contact your dealer."
```

## Data updates

The **RDW** integration {% term polling polls %} data from the RDW open database once an hour. This update frequency is appropriate for vehicle-related information since this data typically doesn't change frequently.

## Known limitations

- This integration only works with Dutch vehicle license plates.

## Troubleshooting

### Vehicle information not found

#### Symptom: "Unknown license plate"

When trying to set up the integration, the form shows the message "Unknown license plate."

##### Description

This happens when the license plate is valid but RDW doesn't have information about this vehicle in its database.

##### Resolution

1. Double-check that you've entered the correct license plate number.
2. Make sure the vehicle is registered in the Netherlands.
3. Very new registrations might take some time to appear in the open data.
4. Check the [RDW website](https://www.rdw.nl) to see if it shows up there.

## Removing the integration

This integration follows standard integration removal. No additional steps are required.

{% include integrations/remove_device_service.md %}
