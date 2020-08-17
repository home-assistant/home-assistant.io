---
title: Fitbit
description: Instructions on how to integrate Fitbit devices within Home Assistant.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.19
ha_domain: fitbit
---

The Fitbit sensor allows you to expose data from [Fitbit](https://fitbit.com/) to Home Assistant.

First, make sure your Home Assistant instance has an External URL configured which can be reached by Fitbit. This can be achieved through the UI (`Configuration > General`) or [via YAML](https://www.home-assistant.io/docs/configuration/basic/). If you have a Nabu Casa account, the URL to use can be found through the UI, under `Configuration > Home Assistant Cloud > Remote Control`.

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fitbit
    clock_format: 12H
    monitored_resources:
      - "body/weight"
```

Restart Home Assistant once this is complete. Go to the frontend. You will see a new notification containing instructions for configuring Fitbit. Follow the instructions there to complete the setup process.

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
