---
title: SleepIQ
description: Instructions for how to integrate SleepIQ beds within Home Assistant.
logo: sleepiq.png
ha_category:
  - Health
  - Sensor
  - Binary Sensor
ha_release: 0.29
ha_iot_class: Local Polling
---

The SleepIQ implementation lets you view sensor data from [SleepIQ by SleepNumber](https://www.sleepnumber.com/sleepiq-sleep-tracker). In particular, it lets you see the occupancy and current SleepNumber (ie current firmness) of each side of a SleepNumber bed.

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

## Services

SleepIQ exposes a few services to control your Sleep Number bed via automations:

### Service `sleepiq.set_sleep_number`

This changes a bed's sleep number to the specified value. This value should be a multiple of 5 between 5 and 100. Other values will work, but they will be rounded to the nearest multiple of 5 by the Sleep Number API.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `sleep_number` | no | The new sleep number, as a multiple of 5 between 5 and 100.
| `bed` | yes | The name of the bed. If unspecified, affects all beds. Case-insensitive.
| `side` | yes | The side to change. If unspecified, both sides will change. Case-insensitive.

**Example:**

```yaml
- service: sleepiq.set_sleep_number
  data:
    sleep_number: 45
    bed: 'Master Bedroom'
    side: 'right'
```

### Service `sleepiq.set_to_favorite_sleep_number`

This service changes a side's sleep number to its "favorite" preset.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `bed` | yes | The name of the bed. If unspecified, affects all beds. Case-insensitive.
| `side` | yes | The side to change. If unspecified, both sides will change. Case-insensitive.

**Example:**

```yaml
- service: sleepiq.set_to_favorite_sleep_number
  data:
    bed: 'Master Bedroom'
    side: 'left'
```
