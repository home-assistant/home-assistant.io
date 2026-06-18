---
title: Rachio
description: Instructions on how to use Rachio with Home Assistant.
ha_category:
  - Binary sensor
  - Calendar
  - Irrigation
  - Switch
ha_iot_class: Cloud Push
ha_release: 0.73
ha_domain: rachio
ha_codeowners:
  - '@bdraco'
  - '@rfverbruggen'
ha_config_flow: true
ha_homekit: true
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - calendar
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

The **Rachio** {% term integration %} allows you to control your [Rachio irrigation system](https://rachio.com/).

There is currently support for the following device types within Home Assistant:

- **Binary sensor** - Allows you to view the status of your [Rachio irrigation system](https://rachio.com/).
- [**Switch**](#switch)
- [**Calendar**](#calendar)

They will be automatically added if the Rachio integration is loaded.

## Getting your Rachio API Key

1. Log in at [https://app.rach.io/](https://app.rach.io/).
2. Go to **Settings**.
3. Click **Get API Key**.
4. Copy the API key from the dialog that opens.

{% important %}
In order for Rachio switches and sensors to update, your Home Assistant instance must be accessible from the internet, either via Home Assistant Cloud or another method. See the [Remote Access documentation](/docs/configuration/remote/) for more information. The smart hose timers use polling and don't require external access to be set up.
{% endimportant %}

{% include integrations/config_flow.md %}

**Water-saving suggestion:**<br>
After setting up the integration, change the options to set the duration in minutes to run when activating a zone switch to a maximum failsafe value when using scripts to control zones. If something goes wrong with your script, Home Assistant, or you hit the Rachio API rate limit of 1700 calls per day, the controller will still turn off the zone after this amount of time.

</div>

### Smart hose timers

The Rachio smart hose timers are not currently capable of receiving real-time updates. Instead, they rely on polling. Because of this, the current state of valves started from a schedule or the physical button will not show up immediately. Polling occurs every 2 minutes when one base station is used, with an additional minute added for every additional base station to remain with the API rate limit. Up to 4 valves can be paired to a single base station.

## Switch

The `rachio` switch platform allows you to toggle zones, valves, and schedules connected to your [Rachio irrigation system](https://rachio.com/) on and off.

Once configured, a switch will be added for every zone that is enabled on every controller in the account provided, as well as a switch for each smart hose timer valve and a switch to start or stop every schedule on a controller. There will also be a switch to toggle each controller's standby mode, as well as to activate a 24-hour rain delay on the device.

## Calendar

A {% term calendar %} entity will be added for each smart hose timer base station on the account, which will show past and future events for all enabled schedules. An upcoming event can be deleted from the calendar, which will trigger a skip of that event.

{% include integrations/actions.md %}

## Examples

In this section, you find some real-life examples of how to use this switch.

### `groups.yaml` example

```yaml
irrigation:
  name: Irrigation
  icon: mdi:water-pump
  view: true
  entities:
  - group.zones_front
  - group.zones_back
  - switch.side_yard
  - switch.every_day_6am

zones_front:
  name: Front Yard
  view: false
  entities:
  - switch.front_bushes
  - switch.front_yard

zones_back:
  name: Back Yard
  view: false
  entities:
  - switch.back_garden
  - switch.back_porch
```
