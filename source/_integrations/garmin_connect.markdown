---
title: Garmin Connect
description: Instructions on how to configure the Garmin Connect integration for Home Assistant.
logo: garmin_connect.png
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.19
ha_codeowners:
  - '@cyberjunky'
---

The Garmin Connect sensor allows you to expose data from [Garmin Connect](https://connect.garmin.com) to Home Assistant.

Enable the sensor by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: garmin_connect
    email: GARMIN_CONNECT_EMAIL
    password: GARMIN_CONNECT_PASSWORD
    resources:
      - "maxHeartRate"
      - "maxStressLevel"
```

Restart Home Assistant once this is complete.

Please be aware that Garmin Connect has very low rate limits, max. once every 10 minutes.


{% configuration %}
email:
  description: The email address you use for your Garmin Connect instance`.
  required: true
  type: string
password:
  description: The password you use for your Garmin Connect instance`.
  required: true
  type: string
resources:
  description: Resource(s) to monitor.
  required: false
  default: "`totalSteps`"
  type: list

{% endconfiguration %}

Below is the list of resources that you can add to `resources`. One sensor is exposed for every resource.

Not every sensor holds meaningful values, it depends on the tracking device you use, and the apps you have connected.

```text
totalSteps
dailyStepGoal
totalKilocalories
activeKilocalories
bmrKilocalories
consumedKilocalories
burnedKilocalories
remainingKilocalories
netRemainingKilocalories
netCalorieGoal
totalDistanceMeters
wellnessStartTimeLocal
wellnessEndTimeLocal
wellnessDescription
wellnessDistanceMeters
wellnessActiveKilocalories
wellnessKilocalories
highlyActiveSeconds
activeSeconds
sedentarySeconds
sleepingSeconds
measurableAwakeDuration
measurableAsleepDuration
floorsAscendedInMeters
floorsDescendedInMeters
floorsAscended
floorsDescended
userFloorsAscendedGoal
minHeartRate
maxHeartRate
restingHeartRate
minAvgHeartRate
maxAvgHeartRate
abnormalHeartRateAlertsCount
lastSevenDaysAvgRestingHeartRate
averageStressLevel
maxStressLevel
stressQualifier
stressDuration
restStressDuration
activityStressDuration
uncategorizedStressDuration
totalStressDuration
lowStressDuration
mediumStressDuration
highStressDuration
stressPercentage
restStressPercentage
activityStressPercentage
uncategorizedStressPercentage
lowStressPercentage
mediumStressPercentage
highStressPercentage
moderateIntensityMinutes
vigorousIntensityMinutes
intensityMinutesGoal
bodyBatteryChargedValue
bodyBatteryDrainedValue
bodyBatteryHighestValue
bodyBatteryLowestValue
bodyBatteryMostRecentValue
averageSpo2
lowestSpo2
latestSpo2
latestSpo2ReadingTimeLocal
averageMonitoringEnvironmentAltitude
durationInMilliseconds
highestRespirationValue
lowestRespirationValue
latestRespirationValue
latestRespirationTimeGMT
```
