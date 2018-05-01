---
layout: page
title: "Iperf3 Sensor"
description: "How to use Iperf3 within Home Assistant to measure your network bandwith."
date: 2018-05-01 02:00
sidebar: true
comments: false
sharing: true
footer: true
logo: iperf3.png
ha_category: System Monitor
featured: false
ha_release: 0.69
ha_iot_class: "Local Polling"
---

The `iperf3` sensor component allows you to measure network bandwidth performance against a private or public Iperf3 server.

## {% linkable_title Configuration %}

By default, it will run every hour.  The user can change the update frequency in the config by defining the minute, hour, and day for a iperf3 test to run.

To add the `iperf3` sensor to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iperf3
    server: iperf.he.net
    monitored_conditions:
      - download
      - upload
```

{% configuration %}
  monitored_conditions:
    description: Sensors to display in the frontend.
    required: true
    type: list
    keys:
      download:
        description: Download speed (Mbit/s)
      upload:
        description: Upload speed (Mbit/s)
  server:
    description: Specify the Iperf3 test to perform the test against.
    required: true
    type: string
  duration:
    description: Specify the test duration in seconds. Default is 10 and valid range is from 5 to 10.
    required: false
    default: 3
    type: int
  day:
    description: Specify the day(s) of the month to schedule the speed test. Use a list for multiple entries.
    required: false
    type: [int, list]
  hour:
    description: Specify the hour(s) of the day to schedule the speed test. Use a list for multiple entries.
    required: false
    type: [int, list]
  minute:
    description: Specify the minute(s) of the hour to schedule the speed test. Use a list for multiple entries.
    required: false
    type: [int, list]
    default: 0
  second:
    description: Specify the second(s) of the minute to schedule the speed test. Use a list for multiple entries.
    required: false
    type: [int, list]
    default: 0
  manual:
    description: True or False to turn manual mode on or off. Manual mode will disable scheduled speed tests.
    required: false
    type: bool
    default: false
{% endconfiguration %}

You can find a list of public Iperf3 servers [here](https://iperf.fr/iperf-servers.php). You can also start your own Iperf3 server using the [mlabbe/iperf3's](https://hub.docker.com/r/mlabbe/iperf3/) docker image or just refer to your `iperf3` command's man page.

When Home Assistant first starts up, the values of the speed test will show as `Unknown`. You can use the service `sensor.<server_name>_update_iperf3` to run a manual speed test and populate the data or just wait for the next regularly scheduled test.  You can turn on manual mode to disable the scheduled speed tests.

## {% linkable_title Examples %}

In this section, you find some real-life examples of how to use this sensor.

### {% linkable_title Run periodically %}

Every half hour of every day:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iperf3
    server: iperf.he.net    
    minute:
      - 0
      - 30
    monitored_conditions:
      - download
      - upload
```

## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- This component requires the `iperf3` command to be installed on your OS. Please, refer to the [official Iperf3 documentation](https://iperf.fr/iperf-download.php) for installation instructions.
