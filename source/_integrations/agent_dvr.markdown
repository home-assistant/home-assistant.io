---
title: Agent DVR
description: Access and control Agent DVR from Home Assistant.
logo: agent.png
ha_category:
  - Camera
  - Binary Sensor
  - Alarm Control Panel
ha_config_flow: true
ha_iot_class: Local Pull
ha_codeowners:
  - '@ispysoftware'
ha_domain: agent_dvr
---

[Agent DVR](https://www.ispyconnect.com/download.aspx/) is a free* DVR software solution for windows 10. Agent DVR runs as a service and can access and control a huge range of third party cameras.

Home Assistant will automatically discover Agent DVR on your network or you can add it manually via integrations using the IP address and Port of the server eg: http://192.168.1.3:8090/


## Configuration

For configuration go to the `Integrations pane` on your Home Assistant instance.

## Binary Sensor

The following sensor types are supported:

- Motion detection (Agent Alerts)
- Camera Online/ Offline state

## Alarm Control Panel

The alarm control panel can enable or disable the master Alert functions in Agent and set the profile to Home, Away or Night. You can configure the profile (which cameras are enabled/ recording) within Agent from the server menu.

## Services
- Enable/ Disable individual devices
- Record/ Stop Record individual devices
- Enable/ Disable alerts on individual devices

*Agent offers additional services like secured remote access (without port forwarding) and cloud uploads via a subscription service.
