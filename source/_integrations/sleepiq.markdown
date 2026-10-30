---
description: Instructions for how to integrate SleepIQ beds within Home Assistant.
ha_release: 0.29
ha_domain: sleepiq
---

The **SleepIQ** {% term integration %} lets you integrate your SleepNumber Bed via [SleepIQ by SleepNumber](https://www.sleepnumber.com/pages/sleepiq-sleep-tracker).

## Prerequisites

You will need an account on [SleepIQ](https://sleepiq.sleepnumber.com/) to use this integration.

{% include integrations/config_flow.md %}

## Supported device types

There is currently support available for the following platforms within Home Assistant, depending on the bed's capabilities:

- Binary sensor - View occupancy of each side
- Button - Calibrate the bed
- Button - Stop the pump
- Light - Control lights on supported models
- Number - View/Set the actuator positions of the foundation
- Number - View/Set firmness for each side
- Select - Choose a foundation preset position
- Select/Number - Set a foot warmer mode and timeout
- Select/Number - Set core climate heat/cool modes and timeout
- Sensor - View pressure of each side
- Switch - Toggle Privacy mode

## Notes

- If you are using a DNS-based ad-blocker such as Pi-hole, you may need to disable it temporarily while configuring this item in Home Assistant.
- The Sleep Number bed communicates with endpoints on **sleepnumber.com** as well as the AWS Firehose data collection service at **firehose.us-east-1.amazonaws.com**.
