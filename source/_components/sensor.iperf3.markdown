---
layout: page
title: "Iperf3 Sensor"
description: "How to use Iperf3 within Home Assistant to measure your network bandwidth."
date: 2018-05-01 02:00
sidebar: true
comments: false
sharing: true
footer: true
logo: iperf3.png
ha_category: System Monitor
featured: false
ha_release: 0.71
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
    host: iperf.he.net
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
  host:
    description: Specify the Iperf3 test to perform the test against.
    required: true
    type: string
  duration:
    description: Specify the test duration in seconds. Default is 10 and the valid range is from 5 to 10.
    required: false
    default: 10
    type: integer
  parallel:
    description: Specify the number of concurrent streams to connect to the server. Default is 1 and the valid range is from 1 to 20.
    default: 1
    type: integer
  protocol:
    description: Specify the protocol to be used on the test. Default is TCP and the valid values are TCP or UDP. If your Iperf3 server is located in the Internet, consider to use TCP instead of UDP. If the protocol is set to use UDP, the sensor may not get updated due to package retransmission issues due to its nature.
    required: false
    default: tcp
    type: string
  scan_interval:
    description: Specify the frequency in seconds which the test will be perfomed. Default value is 1 hour.
    required: false
    default: 3600
    type: integer
{% endconfiguration %}

You can find a list of public Iperf3 servers [here](https://iperf.fr/iperf-servers.php). You can also start your own Iperf3 server using the [mlabbe/iperf3's](https://hub.docker.com/r/mlabbe/iperf3/) docker image or just refer to your `iperf3` command's man page.

The frequency when the test will be automatically triggered can be adjusted by setting the value `scan_interval` in seconds.

Parallel streams can help in some situations. As TCP attempts to be fair and conservative, you may consider increasing the `parallel` attribute. Use this value with careful and refer to Iperf3 man page for more information.

You can use the service `sensor.iperf3_update` to trigger a manual speed test for all sensors. Iperf3 has its own service call that allow to perform a speed test on a particular entity.

### {% linkable_title Service `sensor.iperf3_update` %}

| Service data attribute | Description |
| `entity_id` | String that point at `entity_id`s of the Iperf3 sensor. Else targets all.


## {% linkable_title Notes %}

- When running on Raspberry Pi, just note that the maximum speed is limited by its 100 Mbit/s LAN adapter.
- This component requires the `iperf3` command to be installed on your OS. Please, refer to the [official Iperf3 documentation](http://software.es.net/iperf/obtaining.html) for installation instructions.
