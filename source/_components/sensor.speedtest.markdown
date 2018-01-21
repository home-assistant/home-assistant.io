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

By default, it will run every hour. The user can change the update frequency in the configuration by defining the minute, hour, and day for a speedtest to run. For the `server_id` check the list of [available servers](https://www.speedtest.net/speedtest-servers.php).

To add a Speedtest.net sensor to your installation, add the following to your `configuration.yaml` file:

Once per hour, on the hour (default):

```yaml
# Example configuration.yaml entry
sensor:
  - platform: speedtest
    monitored_conditions:
      - ping
      - download
      - upload
```

Configuration variables:

- **monitored_conditions** array (*Required*): Sensors to display in the frontend.
  - **ping**: Reaction time in ms of your connection (how fast you get a response after you've sent out a request).
  - **download**: Download speed in Mbps.
  - **upload**: Upload speed in Mbps.
- **server_id** (*Optional*): Specify the speedtest server to perform test against.
- **minute** (*Optional*): Specify the minute(s) of the hour to schedule the speedtest. Use a list for multiple entries. Default is 0.
- **hour** (*Optional*): Specify the hour(s) of the day to schedule the speedtest. Use a list for multiple entries. Default is None.
- **day** (*Optional*): Specify the day(s) of the month to schedule the speedtest. Use a list for multiple entries. Default is None.
- **manual** (*Optional*): True or False to turn manual mode on or off.  Manual mode will disable scheduled speedtests.

This component uses [speedtest-cli](https://github.com/sivel/speedtest-cli) to gather network performance data from Speedtest.net. Please be aware of the potential [inconsistencies](https://github.com/sivel/speedtest-cli#inconsistency) that this component may display.

When Home Assistant first starts up, the values of the speedtest will show as `Unknown`. You can use the service `sensor.update_speedtest` to run a manual speedtest and populate the data or just wait for the next regularly scheduled test.  You can turn on manual mode to disable the scheduled speedtests.


## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Run periodically %}

Every half hour of every day:

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

### {% linkable_title Run at a specific time %}

Everyday at 12:30AM, 6:30AM, 12:30PM, 6:30PM:

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

### {% linkable_title Using as a trigger in an automation %}

```yaml
# Example configuration.yaml entry
automation:
 - alias: 'Internet Speed Glow Connect Great' 
    trigger: 
      platform: template
      value_template: '{% raw %}{{ states.sensor.speedtest_download.state|float > 10}}{% endraw %}'
    action:      
      service: shell_command.green
  - alias: 'Internet Speed Glow Connect Poor' 
    trigger: 
      platform: template
      value_template: '{% raw %}{{ states.sensor.speedtest_download.state| float < 10 }}{% endraw %}' 
    action:      
      service: shell_command.red
```

## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- Entries under `monitored_conditions` only control what entities are available under home-assistant, it does not disable the condition from running.
- If ran frequently, this component has the capability of using a very large amount of data. Frequent updates should be avoided on bandwidth capped connections. 
- While running, network usage is fully utilized. This may have a negative affect on other devices in use the network such as gaming consoles or streaming boxes. 
