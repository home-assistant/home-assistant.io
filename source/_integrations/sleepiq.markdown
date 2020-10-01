---
title: SleepIQ
description: Instructions for how to integrate SleepIQ beds within Home Assistant.
ha_category:
  - Health
  - Sensor
  - Binary Sensor
  - Other
ha_release: 0.29
ha_iot_class: Local Polling
ha_codeowners:
  - '@home-assistant'
  - '@Jay2645'
  - '@Jpeterson37'
ha_domain: sleepiq
---

The SleepIQ implementation lets you view sensor data and set the SleepNumber from [SleepIQ by SleepNumber](https://www.sleepnumber.com/sleepiq-sleep-tracker). In particular, it lets you see the occupancy, current SleepNumber (ie current firmness) and set the SleepNumber of each side of a SleepNumber bed.

## Setup

You will need an account on [SleepIQ](https://sleepiq.sleepnumber.com/) to use this component.

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sleepiq:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your SleepIQ username (usually an e-mail address).
  required: true
  type: string
password:
  description: Your SleepIQ password.
  required: true
  type: string
{% endconfiguration %}

### Services

Once loaded, the `sleepiq` platform will expose services that can be called to perform various actions.

#### Service `set_sleep_number`

Changes the Sleep Number of a bed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `sleep_number`         |      no  | The new sleep number, as a multiple of 5 between 5 and 100. |
| `bed`                  |      yes | The name of the bed. If unspecified, affects all beds. |
| `side`                 |      yes | The side to change. If unspecified, both sides will change |

```yaml
action:
  service: sleepiq.set_sleep_number
  data:
    sleep_number: 45
    bed: Master Bedroom
    side: right
```

#### Service `set_to_favorite_sleep_number`

Changes a bed's Sleep Number to the "favorite" preset.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `bed`                  |      yes | The name of the bed. If unspecified, affects all beds. |
| `side`                 |      yes | The side to change. If unspecified, both sides will change |

```yaml
action:
  service: sleepiq.set_to_favorite_sleep_number
  data:
    bed: Master Bedroom
    side: right
```
