---
title: Speedtest.net
description: How to integrate Speedtest.net within Home Assistant.
ha_category:
  - Sensor
  - System monitor
ha_release: 0.13
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rohankapoorcom'
  - '@engrbm87'
ha_domain: speedtestdotnet
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Speedtest.net integration uses the [Speedtest.net](https://speedtest.net/) web service to measure network bandwidth performance.

{% include integrations/config_flow.md %}

Most Speedtest.net servers require TCP port 8080 outbound to function. Without this port open you may experience significant delays or no results at all. See note on their [help page](https://www.speedtest.net/help).

By default, a speed test will be run every hour. You can disable polling using system options and use the `update_entity` action to automate the speed test frequency.

{% include common-tasks/define_custom_polling.md %}

## Integration sensors

The following sensors are added by the integration:

sensors:

- Ping sensor: Reaction time in ms of your connection (how fast you get a response after you’ve sent out a request).
- Download sensor: The download speed (Mbit/s).
- Upload sensor: The upload speed (Mbit/s).

This integration uses [speedtest-cli](https://github.com/sivel/speedtest-cli) to gather network performance data from Speedtest.net.
Please be aware of the potential [inconsistencies](https://github.com/sivel/speedtest-cli#inconsistency) that this integration may display.

## Examples

In this section you will find some real-life examples of how to use this integration.
### Using as a trigger in an automation

{% raw %}

```yaml
# Example configuration.yaml entry
automation:
  - alias: "Internet Speed Glow Connect Great"
    triggers:
      - trigger: template
        value_template: "{{ states('sensor.speedtest_download')|float >= 10 }}"
    actions:
      - action: shell_command.green

  - alias: "Internet Speed Glow Connect Poor"
    triggers:
      - trigger: template
        value_template: "{{ states('sensor.speedtest_download')|float < 10 }}"
    actions:
      - action: shell_command.red
```

{% endraw %}

## Notes

- When running on Raspberry Pi the maximum speed is limited by the LAN adapter. The Raspberry Pi 3+ models come with a Gigabit LAN adapter which supports a [maximum throughput](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) of 300 Mbit/s.
- Running this integration can have negative effects on the system's performance as it requires a fair amount of memory.
- If run frequently, this integration has the ability to use a considerable amount of data. Frequent updates should be avoided on bandwidth-capped connections.
- While the speedtest is running your network capacity is fully utilized. This may have a negative effect on other devices using the network such as gaming consoles or streaming boxes.
