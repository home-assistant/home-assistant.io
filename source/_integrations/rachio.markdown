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
ha_integration_type: integration
---

The `rachio` platform allows you to control your [Rachio irrigation system](https://rachio.com/).

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
In order for Rachio switches and sensors to update, your Home Assistant instance must be accessible from the internet, either via Home Assistant Cloud or another method. See the [Remote Access documentation](/docs/configuration/remote/) for more information. The smart hose timers use polling and don't require external access to be setup.
{% endimportant %}

{% include integrations/config_flow.md %}

**Water-saving suggestion:**<br>
After setting up the integration, change the options to set the duration in minutes to run when activating a zone switch to a maximum failsafe value when using scripts to control zones. If something goes wrong with your script, Home Assistant, or you hit the Rachio API rate limit of 1700 calls per day, the controller will still turn off the zone after this amount of time.

</div>

### Smart hose timers

The Rachio smart hose timers are not currently capable of receiving real-time updates. Instead, they rely on polling. Because of this, the current state of valves started from a schedule or the physical button will not show up immediately. Polling occurs every 2 minutes when one base station is used, with an additional minute added for every additional base station to remain with the API rate limit. Up to 4 valves can be paired to a single base station.

### iFrame

If you would like to see and control more detailed zone information, create an [iFrame](/integrations/panel_iframe/) that renders the Rachio web app.

```yaml
panel_iframe:
  rachio:
    title: Rachio
    url: "https://app.rach.io"
    icon: mdi:sprinkler-variant
```

## Switch

The `rachio` switch platform allows you to toggle zones, valves, and schedules connected to your [Rachio irrigation system](https://rachio.com/) on and off.

Once configured, a switch will be added for every zone that is enabled on every controller in the account provided, as well as a switch for each smart hose timer valve and a switch to start or stop every schedule on a controller. There will also be a switch to toggle each controller's standby mode, as well as to activate a 24-hour rain delay on the device.

## Calendar

A [calendar](https://www.home-assistant.io/integrations/calendar/) entity will be added for each smart hose timer base station on the account, which will show past and future events for all enabled schedules. An upcoming event can be deleted from the calendar, which will trigger a skip of that event.

## Actions

### Action `rachio.start_watering`

Allows starting one zone on a sprinkler controller, any number of smart hose timer valves, or a schedule. To sequentially start multiple zones on a sprinkler controller, use the `start_multiple_zone_schedule` action below.

Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Individual zone, schedule, or multiple smart hose timer valves to run. A smart hose timer base station device can also be selected to run all valves on the given base.
| `duration` | yes | Duration in minutes to run the zone or valves. Leave empty for schedules.

{% note %}
The actions below only apply to sprinkler controllers and will not be shown if only smart hose timers are on the account.
{% endnote %}

### Action `rachio.start_multiple_zone_schedule`

Allows a list of zones to be passed with a corresponding list of durations to create a custom schedule directly from Home Assistant.

{% note %}
It is not currently possible to have zones from multiple controllers in the same custom schedule.
{% endnote %}

 Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | List of zones to run. Will be run in the order listed.
| `duration` | no | Duration in minutes to run the zones. If a list of durations is provided, each duration will apply to the corresponding zone listed above. Alternatively, one duration can be provided and will be used for all zones.

### Examples

```yaml
#Example script to start multiple zones with individual duration for each zone.
script:
  run_grass_zones:
    sequence: 
      - action: rachio.start_multiple_zone_schedule
        target:
          entity_id:
            - switch.front_yard_west
            - switch.front_yard_east
            - switch.side_yard_west
        data:
          duration: 20, 15, 10
```

```yaml
#Example script to start multiple zones with one duration for all zones.
script:
  run_grass_zones:
    sequence: 
      - action: rachio.start_multiple_zone_schedule
        target:
          entity_id:
            - switch.front_yard_west
            - switch.front_yard_east
            - switch.side_yard_west
        data:
          duration: 20
```

### Action `rachio.set_zone_moisture_percent`

Set the zone moisture percentage for a zone or group of zones.

Rachio allows for setting the moisture percentage of a zone or group of zones. As Rachio only uses moisture levels for zones in a Flex Daily schedule, this action is only available when at least one zone is part of a Flex Daily schedule.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String, list or group of zones to set moisture percentage.
| `percent` | no | Integer of the desired moisture percentage. Accepts 0-100.

### Action `rachio.pause_watering`

Pause a currently running schedule.

This action will not be available if only a Generation 1 controller is on the account, as these controllers do not support pause or resume.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `devices` | yes | Name of the controller(s) to pause. If not given, will pause all running controllers on the account.
| `duration` | yes | Duration in minutes to pause. Accepts 1-60. Defaults to 60 minutes if not specified.

### Action `rachio.resume_watering`

Resume a currently paused schedule.

This action will not be available if only a Generation 1 controller is on the account, as these controllers do not support pause or resume.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `devices` | yes | Name of the controller(s) to resume. If not given, will resume all paused controllers on the account.

### Action `rachio.stop_watering`

Stops all currently running schedules.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `devices` | yes | Name of the controller(s) to stop. If not given, will stop all running controllers on the account.

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
