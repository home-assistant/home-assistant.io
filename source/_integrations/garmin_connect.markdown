---
title: Garmin Connect
description: Instructions on how to configure the Garmin Connect integration for Home Assistant.
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.105
ha_codeowners:
  - '@cyberjunky'
ha_config_flow: true
ha_domain: garmin_connect
ha_platforms:
  - sensor
---

The Garmin Connect sensor allows you to expose data from [Garmin Connect](https://connect.garmin.com) to Home Assistant.

{% include integrations/config_flow.md %}

After successful set up a standard set of sensors are enabled.
You can enable more if needed by using the Integrations page.

Please be aware that Garmin Connect has very low rate limits, max. once every ~10 minutes.

## Available Sensors

Not every sensor holds meaningful values, it depends on the tracking device you use, and the apps you have connected.

Enabled by default:

```text
Total Steps
Daily Step Goal
Total KiloCalories
Active KiloCalories
BMR KiloCalories
Consumed KiloCalories
Burned KiloCalories
Total Distance Mtr
Active Time
Sedentary Time
Sleeping Time
Awake Duration
Sleep Duration
Floors Ascended
Floors Descended
Floors Ascended Goal
Min Heart Rate
Max Heart Rate
Resting Heart Rate
Avg Stress Level
Max Stress Level
Rest Stress Duration
Activity Stress Duration
Uncat. Stress Duration
Total Stress Duration
Low Stress Duration
Medium Stress Duration
High Stress Duration
Body Battery Charged
Body Battery Drained
Body Battery Highest
Body Battery Lowest
Body Battery Most Recent
Average SPO2
Lowest SPO2
Latest SPO2
```

Disabled by default:

```text
Remaining KiloCalories
Net Remaining KiloCalories
Net Calorie Goal
Wellness Start Time
Wellness End Time
Wellness Description
Wellness Distance Mtr
Wellness Active KiloCalories
Wellness KiloCalories
Highly Active Time
Floors Ascended Mtr
Floors Descended Mtr
Min Avg Heart Rate
Max Avg Heart Rate
Abnormal HR Counts
Last 7 Days Avg Heart Rate
Stress Qualifier
Stress Duration
Stress Percentage
Rest Stress Percentage
Activity Stress Percentage
Uncat. Stress Percentage
Low Stress Percentage
Medium Stress Percentage
High Stress Percentage
Latest SPO2 Time
Average Altitude
Moderate Intensity
Vigorous Intensity
Intensity Goal
Latest Respiration Update
Highest Respiration
Lowest Respiration
Latest Respiration

Weight
BMI
Body Fat
Body Water
Body Mass
Muscle Mass
Physique Rating
Visceral Fat
Metabolic Age
```
