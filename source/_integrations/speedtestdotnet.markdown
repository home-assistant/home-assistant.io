---
title: Speedtest.net
description: How to integrate Speedtest.net within Home Assistant.
ha_category:
  - System Monitor
  - Sensor
ha_release: 0.13
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rohankapoorcom'
  - '@engrbm87'
ha_domain: speedtestdotnet
ha_platforms:
  - sensor
---

The `speedtestdotnet` integration uses the [Speedtest.net](https://speedtest.net/) web service to measure network bandwidth performance.

By default, a speed test will be run every hour. The user can change the update frequency in the configuration by defining the `scan_interval` for a speed test to run.

Most Speedtest.net servers require TCP port 8080 outbound to function. Without this port open you may experience significant delays or no results at all. See note on their [help page](https://www.speedtest.net/help).

{% include integrations/config_flow.md %}

## Integration Sensors

The following sensors are added by the integration:

sensors:
  - Ping sensor: Reaction time in ms of your connection (how fast you get a response after you’ve sent out a request).
  - Download sensor: The download speed (Mbit/s).
  - Upload sensor: The upload speed (Mbit/s).
  
### Time period dictionary example

```yaml
scan_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 3
  seconds: 30
  milliseconds: 0
```

### Service

Once loaded, the `speedtestdotnet` integration will expose a service (`speedtestdotnet.speedtest`) that can be called to run a Speedtest.net speed test on demand. This service takes no parameters. This can be useful if you have enabled manual mode.

```yaml
action:
  service: speedtestdotnet.speedtest
```

This integration uses [speedtest-cli](https://github.com/sivel/speedtest-cli) to gather network performance data from Speedtest.net.
Please be aware of the potential [inconsistencies](https://github.com/sivel/speedtest-cli#inconsistency) that this integration may display.

## Examples

In this section you will find some real-life examples of how to use this component.

### Run periodically

Every half hour of every day:

```yaml
# Example configuration.yaml entry
speedtestdotnet:
  scan_interval:
    minutes: 30
```

### Using as a trigger in an automation

{% raw %}

```yaml
# Example configuration.yaml entry
automation:
  - alias: "Internet Speed Glow Connect Great"
    trigger:
      - platform: template
        value_template: "{{ states('sensor.speedtest_download')|float >= 10 }}"
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

## Notes

- When running on Raspberry Pi the maximum speed is limited by the LAN adapter. The Raspberry Pi 3+ models come with a Gigabit LAN adapter which supports a [maximum throughput](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) of 300 Mbit/s.
- Running this integration can have negative effects on the system's performance as it requires a fair amount of memory.
- If run frequently, this integration has the ability to use a considerable amount of data. Frequent updates should be avoided on bandwidth-capped connections.
- While the speedtest is running your network capacity is fully utilized. This may have a negative effect on other devices using the network such as gaming consoles or streaming boxes.
