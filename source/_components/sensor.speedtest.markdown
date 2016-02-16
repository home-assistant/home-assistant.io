---
layout: page
title: "Speedtest.net"
description: "How to integrate Speedtest.net within Home Assistant."
date: 2016-02-12 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: speedtest.png
ha_category: Sensor
featured: false
---

The `speedtest` sensor component uses the [Speedtest.net](https://speedtest.net/) web service to measure network bandwidth performance.

By default, it will run every hour.  The user can change the update frequency in the config by defining the minute, hour, and day for a speedtest to run.

To add a Speedtest.net sensor to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

```yaml
sensor:
  platform: speedtest
  monitored_conditions:
    - ping
    - download
    - upload
```

More examples:

Every half hour of every day:

```yaml
sensor:
  platform: speedtest
  minute:
    - 0
    - 30
  monitored_conditions:
    - ping
    - download
    - upload
```

Everyday at 12:30AM, 6:30AM, 12:30PM, 6:30PM:

```yaml
sensor:
  platform: speedtest
  minute: 30
  hour:
    - 0
    - 6
    - 12
    - 18
  monitored_conditions:
    - ping
    - download
    - upload
```

Configuration variables:

- **monitored_conditions** array (*Required*): Sensors to display in the frontend.
  - **ping**: Reaction time in ms of your connection, (how fast you get a response after you've sent out a request).
  - **download**: Download speed in Mbps.
  - **upload**: Upload speed in Mbps.
- **minute** (*Optional*): Specify the minute(s) of the hour to schedule the speedtest. Use a list for multiple entries. Default is 0.
- **hour** (*Optional*): Specify the hour(s) of the day to schedule the speedtest. Use a list for multiple entries. Default is None.
- **day** (*Optional*): Specify the day(s) of the month to schedule the speedtest. Use a list for multiple entries. Default is None.

This component uses [speetest-cli](https://github.com/sivel/speedtest-cli) to gather network performance data from Speedtest.net.  Please be aware of the potential [inconsistencies](https://github.com/sivel/speedtest-cli#inconsistency) that this component may display.
