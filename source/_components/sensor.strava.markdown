---
layout: page
title: "Strava"
description: "Instructions on how to integrate Strava totals and metrics within Home Assistant."
date: 2018-12-04 23:22
sidebar: true
comments: false
sharing: true
footer: true
logo: fitbit.png
ha_category: Health
ha_iot_class: "Cloud Polling"
ha_release: 0.8x
---

The Strava sensor allows you to expose data from [Strava](http://strava.com) to Home Assistant.

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: strava
    monitored_resources:
      - "all_ride_totals.elevation_gain"
```

Restart Home Assistant once this is complete. Go to the frontend. You will see a new entry for configuring Strava. Follow the instructions there to complete the setup process.

Please be aware that Fitbit has very low rate limits, 600 per user per 15 minutes. Keep in mind that 1 request is used for every entry in `monitored_resources`.

{% configuration %}
monitored_resources:
  description: Resource to monitor.
  required: true
  type: list
{% endconfiguration %}

Below is the list of resources that you can add to `monitored_resources`. One sensor is exposed for every resource. 

Note some sensors, ftp for instance is a Strava Premium feature, and one that is manually updated. Strave deine 'recent' as the last four weeks.

```text
follower_count
friend_count
weight
max_heartrate
ftp
ytd_ride_totals.distance
ytd_ride_totals.count
ytd_ride_totals.elapsed_time
ytd_ride_totals.elevation_gain
ytd_ride_totals.moving_time
recent_ride_totals.distance
recent_ride_totals.count
recent_ride_totals.elapsed_time
recent_ride_totals.elevation_gain
recent_ride_totals.moving_time
all_ride_totals.distance
all_ride_totals.count
all_ride_totals.elapsed_time
all_ride_totals.elevation_gain
all_ride_totals.moving_time
ytd_run_totals.distance
ytd_run_totals.count
ytd_run_totals.elapsed_time
ytd_run_totals.elevation_gain
ytd_run_totals.moving_time
recent_run_totals.distance
recent_run_totals.count
recent_run_totals.elapsed_time
recent_run_totals.elevation_gain
recent_run_totals.moving_time
all_run_totals.distance
all_run_totals.count
all_run_totals.elapsed_time
all_run_totals.elevation_gain
all_run_totals.moving_time
ytd_swim_totals.distance
ytd_swim_totals.count
ytd_swim_totals.elapsed_time
ytd_swim_totals.elevation_gain
ytd_swim_totals.moving_time
recent_swim_totals.distance
recent_swim_totals.count
recent_swim_totals.elapsed_time
recent_swim_totals.elevation_gain
recent_swim_totals.moving_time
all_swim_totals.distance
all_swim_totals.count
all_swim_totals.elapsed_time
all_swim_totals.elevation_gain
all_swim_totals.moving_time
```
