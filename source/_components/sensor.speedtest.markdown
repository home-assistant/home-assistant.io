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
ha_category: System Monitor
featured: false
ha_release: 0.13
ha_iot_class: "Cloud Polling"
---

The `speedtest` sensor component uses the [Speedtest.net](https://speedtest.net/) web service to measure network bandwidth performance.

By default, it will run every hour. The user can change the update frequency in the configuration by defining the minute, hour, and day for a speed test to run. For the `server_id` check the list of [available servers](https://www.speedtest.net/speedtest-servers.php).

To add a Speedtest.net sensor to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: speedtest
    monitored_conditions:
      - ping
      - download
      - upload
```
{% endraw %}

{% configuration %}
  monitored_conditions:
    description: Sensors to display in the frontend.
    required: true
    type: list
    keys:
      ping:
        description: Reaction time in ms of your connection (how fast you get a response after you've sent out a request).
      download:
        description: Download speed (Mbit/s)
      upload:
        description: Upload speed (Mbit/s)
  server_id:
    description: Specify the speed test server to perform the test against.
    required: false
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

This component uses [speedtest-cli](https://github.com/sivel/speedtest-cli) to gather network performance data from Speedtest.net. Please be aware of the potential [inconsistencies](https://github.com/sivel/speedtest-cli#inconsistency) that this component may display.

When Home Assistant first starts up, the values of the speed test will show as `Unknown`. You can use the service `sensor.update_speedtest` to run a manual speed test and populate the data or just wait for the next regularly scheduled test.  You can turn on manual mode to disable the scheduled speed tests.


## {% linkable_title Examples %}

In this section, you find some real-life examples of how to use this sensor.

### {% linkable_title Run periodically %}

Every half hour of every day:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: speedtest
    minute:
      - 0
      - 30
    monitored_conditions:
      - ping
      - download
      - upload
```
{% endraw %}

### {% linkable_title Run at a specific time %}

Everyday at 12:30AM, 6:30AM, 12:30PM, 6:30PM:

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: speedtest
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
{% endraw %}

### {% linkable_title Using as a trigger in an automation %}

{% raw %}
```yaml
# Example configuration.yaml entry
automation:
  - alias: "Internet Speed Glow Connect Great"
    trigger:
      - platform: template
        value_template: "{{ states('sensor.speedtest_download')|float > 10 }}"
    action:
      - service: shell_command.green

  - alias: "Internet Speed Glow Connect Poor"
    trigger:
      - platform: template
        value_template: "{{ states('sensor.speedtest_download')|float < 10 }}"
    action:
      - service: shell_command.red
```
{% endraw %}

## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- Entries under `monitored_conditions` only control what entities are available in Home Assistant, it does not disable the condition from running.
- If ran frequently, this component has the ability to use a considerable amount of data. Frequent updates should be avoided on bandwidth-capped connections.
- While running, your network capacity is fully utilized. This may have a negative effect on other devices in use the network such as gaming consoles or streaming boxes.
