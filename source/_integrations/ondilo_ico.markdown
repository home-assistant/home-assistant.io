---
title: Ondilo ICO
description: Instructions on how to configure Ondilo ICO integration.
ha_category:
  - Sensor
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@JeromeHXP'
ha_domain: ondilo_ico
ha_platforms:
  - sensor
---

ICO by [Ondilo](https://ondilo.com/en/) is a small connected device that you simply drop into the pool or spa. ICO continuously analyzes the water quality of your pool/spa and notifies you via its application. ICO provides personalized recommendations so that you use the right products in the right proportions at the right time.

There is currently support for the following information within Home Assistant:

- Water Temperature
- Oxydo Reduction Potential (ORP/Redox)
- pH
- TDS (Total Dissolved Solids) or Salt
- Battery
- RSSI

Sensors will be created for all those data.

{% include integrations/config_flow.md %}

## Polling

The default interval to update all data is 1 hour.

If you want to update in shorter intervals, because an Ondilo ICO measures only once an hour, which may result in a difference of the time a measure has been taken and the time the Home Assistant sensor is updated, you disable automatic polling in the configuration screen of the integration and setup an automation using [homeassistant.update_entity](https://www.home-assistant.io/integrations/homeassistant/#service-homeassistantupdate_entity) service.

Ondilo has rate limits for using their API too, see [here](https://interop.ondilo.com/docs/api/customer/v1/), which are 5 queries a second and 30 queries an hour. So the minimal polling interval would be 2 minutes to get all the data consistently.

<div class='note warning'>
[homeassistant.update_entity](https://www.home-assistant.io/integrations/homeassistant/#service-homeassistantupdate_entity) service just accepts entities as input while this integration always gets all data for all pools you have even if you only update just one entity! So it is enough to configure an automation with just one entity to update everything!
</div>

Configuring the automation with all entities (normally 6 per pool) is not necessary and will result in multiple queries which then may result in hitting the rate limit and getting inconsistent updates.

## Known limitations

- Recommendations are not yet supported.
