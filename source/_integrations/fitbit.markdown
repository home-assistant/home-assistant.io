---
title: Fitbit
description: Instructions on how to integrate Fitbit devices within Home Assistant.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.19
ha_domain: fitbit
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Fitbit sensor allows you to expose data from [Fitbit](https://fitbit.com/) to Home Assistant.

Prior to enabling the sensor, your Home Assistant instance must be enabled with SSL, using services such as [Home Assistant cloud](/cloud/) or [Duck DNS](/integrations/duckdns/) integrating Let's Encrypt. Fitbit will not allow insecure integrations. Your Fitbit account must also be registered as an Developer account at the [Fitbit Developer Portal](https://dev.fitbit.com), and have a verified email address. 

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fitbit
    clock_format: 12H
    monitored_resources:
      - "body/weight"
```

Restart Home Assistant once this is complete. Go to the frontend. You will see a new notification for configuring Fitbit. Follow the instructions there to complete the setup process. You will need to visit this notification multiple times to set your API keys and authorize your custom app with your Fitbit account.

Please be aware that Fitbit has very low rate limits, 150 per user per hour. The clock resets at the _top_ of the hour (meaning it is not a rolling 60 minutes). There is no way around the limits. Due to the rate limits, the sensor only updates every 30 minutes. You can manually trigger an update by restarting Home Assistant. Keep in mind that 1 request is used for every entry in `monitored_resources`.

The unit system that the sensor will use is based on the country you set in your Fitbit profile.

{% configuration %}
monitored_resources:
  description: Resource to monitor.
  required: false
  default: "`activities/steps`"
  type: list
clock_format:
  description: Format to use for `sleep/startTime` resource. Accepts `12H` or `24H`.
  required: false
  default: "`24H`"
  type: string
unit_system:
  description: Unit system to use for measurements. Accepts `default`, `metric`, `en_US` or `en_GB`.
  required: false
  default: "`default`"
  type: string
{% endconfiguration %}

Below is the list of resources that you can add to `monitored_resources`. One sensor is exposed for every resource.

```text
activities/activityCalories
activities/calories
activities/caloriesBMR
activities/distance
activities/elevation
activities/floors
activities/heart
activities/minutesFairlyActive
activities/minutesLightlyActive
activities/minutesSedentary
activities/minutesVeryActive
activities/steps
activities/tracker/activityCalories
activities/tracker/calories
activities/tracker/distance
activities/tracker/elevation
activities/tracker/floors
activities/tracker/minutesFairlyActive
activities/tracker/minutesLightlyActive
activities/tracker/minutesSedentary
activities/tracker/minutesVeryActive
activities/tracker/steps
body/bmi
body/fat
body/weight
devices/battery
sleep/awakeningsCount
sleep/efficiency
sleep/minutesAfterWakeup
sleep/minutesAsleep
sleep/minutesAwake
sleep/minutesToFallAsleep
sleep/startTime
sleep/timeInBed
```
