---
title: Flick Electric
description: Instructions on how to set up the Flick Electric Pricing sensor in Home Assistant.
ha_category:
  - Energy
ha_release: '0.110'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ZephireNZ'
ha_domain: flick_electric
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

[Flick Electric Co](https://www.flickelectric.co.nz/) is a power company in New Zealand, based around a transparent pricing model where each component of pricing is provided. This integration uses the mobile app's API from Flick Electric Co to get the current power price as well as each of the components price.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "Username used to log into Flick Electric."
Password:
    description: "Password used to log into Flick Electric."
Client ID:
    description: "Client ID to authenticate (see below note)."
Client Secret:
    description: "Client Secret to authenticate (see below note)."
Account:
    description: "Address of the account to add (required when user has multiple active accounts)."
{% endconfiguration_basic %}

{% note %}

For most users, Client ID/Secret can be left blank.

Home Assistant by default uses the client ID and secret from the Flick Electric mobile app at the time of release.

If this stops working, you can find the new ones by using a MITM proxy with the mobile app. The app will call `https://api.flick.energy/identity/oauth/token` with the `client_id` and `client_secret`.

{% endnote %}

## Supported functionality

The integration provides a `sensor` entity with the power price for the current time interval.

The attributes of the entity have a breakdown of the pricing components, such as `generation` and `network` charges.

{% note %}

The power price shown is in cents, and is *excluding <abbr title="goods and services tax">GST</abbr>*. You can customize this by creating a template sensor:

1. Go to
{% my helpers title="**Settings** > **Devices** & **Services** > **Helpers**" %} and click the add button;
2. Choose the **{% my config_flow_start domain="template" title="Template" %}** option
3. Select **Add a template sensor**.

{% raw %}

To add GST:

- **State template**: `{{ states.sensor.flick_power_price * 1.15 }}`
- **Unit of measurement**: `¢/kWh`

To convert to dollars:

- **State template**: `{{ states.sensor.flick_power_price / 100 }}`
- **Unit of measurement**: `$/kWh`

{% endraw %}

{% endnote %}

## Use cases

This integration can be used as part of an automation, for example to turn on/off appliances automatically.

## Example automations

{% details "Turn off the heat pump when price is above 40¢/kWH" %}

{% raw %}

```yaml
alias: "Turn off expensive heat pump"
description: "Turn off the heat pump when price is above 40¢/kWH"
triggers:
  - trigger: numeric_state
    entity_id: sensor.flick_power_price
    above: 40
actions:
  - action: climate.turn_off
    target:
      entity_id: climate.heat_pump
    data: {}
```

{% endraw %}
{% enddetails %}

## Data updates

The integration will {% term polling poll %} the Flick Electric API every 5 minutes to check for the current power price. You can also use the `homeassistant.update_entity` action to trigger a refresh on-demand.

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Cannot get pricing for this account. Please check user permissions" %}

API is unable to find pricing for the selected account. Check with Flick Electric to ensure that your user is configured correctly.

{% enddetails %}

{% details "No services are active on this Flick account" %}

Only active accounts are supported by this integration. If your account is active but is not able to be selected, check with Flick Electric to ensure that it is showing as active in their system.

{% enddetails %}
