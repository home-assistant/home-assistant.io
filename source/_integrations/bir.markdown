---
title: BIR
description: Instructions on how to integrate BIR with Home Assistant.
ha_category:
  - Environment
ha_release: "2025.8"
ha_iot_class: Cloud Polling
ha_quality_scale: bronze
ha_domain: bir
ha_config_flow: true
ha_codeowners:
  - '@sanderblom'
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **BIR** {% term integration %} lets you track upcoming waste collection schedules from [BIR](https://bir.no), the waste management company serving Bergen and surrounding municipalities in Norway. By searching for your address, the integration automatically detects which waste types are collected at your location and creates sensors to help you stay on top of collection days.

For each waste type available at your address, the integration provides two sensors: one showing the date of the next pickup, and another showing the number of days until that pickup.

## Supported areas

BIR serves households in the following municipalities in western Norway:

- Askøy
- Bergen
- Bjørnafjorden
- Kvam
- Osterøy
- Samnanger
- Vaksdal

If your address is listed in the [BIR database](https://bir.no), the integration can fetch your waste collection schedule.

## Prerequisites

Your address must be serviced by BIR. You can verify this by searching for your address on [bir.no](https://bir.no).

{% include integrations/config_flow.md %}

During setup, you enter your street address. The integration searches the BIR database and presents a list of matching addresses. Select your address from the list to complete the setup.

If you want to track waste collection for multiple addresses, you can set up additional instances of the integration, one for each address.

{% configuration_basic %}
Street address:
  description: "Enter the street name or address to search for your waste collection location. You need to enter at least 3 characters."
{% endconfiguration_basic %}

## Use cases

With the BIR integration, you can:

- See the next pickup date for each waste type at your address
- Track how many days remain until the next collection
- Create automations to remind you to put out the correct bin

## Supported functionality

### Sensors

The integration creates sensors based on the waste types available at your address. Not all waste types may be available, depending on your location. The following waste types are supported:

- **Mixed waste**
- **Paper and plastic**
- **Food waste**
- **Glass and metal packaging**

For each waste type, two sensors are created:

#### Days until pickup sensors

These sensors show the number of days remaining until the next scheduled pickup for each waste type. They are enabled by default and are useful for dashboards and automations.

- **Mixed waste days until pickup**
- **Paper and plastic days until pickup**
- **Food waste days until pickup**
- **Glass and metal packaging days until pickup**

#### Pickup date sensors

These sensors show the date of the next scheduled pickup for each waste type. They are disabled by default and can be enabled from the entity settings if needed.

- **Mixed waste pickup**
- **Paper and plastic pickup**
- **Food waste pickup**
- **Glass and metal packaging pickup**

## Data updates

The integration fetches updated waste collection data from the BIR API once every hour.

## Troubleshooting

If the pickup information in Home Assistant does not match recent changes on BIR, reload the integration from the integration detail page. The integration polls BIR once per hour, so changes may take up to 60 minutes to appear automatically.

## Removing the integration

This integration follows standard integration removal. No additional cleanup is required.

{% include integrations/remove_device_service.md %}
