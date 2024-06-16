---
title: Zabbix Event Sensors
description: Instructions on how to integrate Zabbix Events as Sensors into Home Assistant.
ha_category:
  - Sensor
  - System monitor
ha_release: 2024.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@rexdek'
ha_config_flow: true
ha_domain: zabbix_evt_sensors
ha_platforms:
  - sensor
ha_integration_type: integration
---

[Zabbix](https://www.zabbix.com/) is an IT monitoring solution. It will check items on monitored hosts and will trigger an event if the result of the item check does not pass a check condition. If the event is related to a single trigger it is called a problem. Problems can also be grouped and correlated resulting in a service check.

The **Zabbix Event Sensors** {% term integration %} is used to import the states of Zabbix problems and services as sensors into Home Assistant via the Zabbix API.

There is [another Zabbix integration](/integrations/zabbix/) for Home Assistant but its focus is on publishing Home Assistant states to Zabbix. It also can import Zabbix states to Home Assistant sensors, but you need to configure the Zabbix host id in HA for this and it is limited to importing Zabbix problems on this host.

This {% term integration %} imports Zabbix [service checks](https://www.zabbix.com/documentation/current/en/manual/it_services/service_tree) as sensors into Home Assistant. The sensors' states will be set to the severity of the Zabbix service check. A value of -1 means the service is OK, while values from 0 to 5 indicate that there is a problem ranging from "Not classified" to "Disaster" (see also Zabbix [trigger severities](https://www.zabbix.com/documentation/current/en/manual/config/triggers/severity)).

Additionally Zabbix [problems](https://www.zabbix.com/documentation/7.0/en/manual/config/triggers) can be imported in Home Assistant as Sensors. Only problems matching tags with values specified during Home Assistant Config Flow setup will be imported. If a tag / value combination matches multiple problems the state of the sensor will be set to the most severe problem.

## Zabbix Configuration

You need to set up an API User in Zabbix (Users > API tokens > Create API token) so that Home Assistant can retrieve Zabbix events via the Zabbix API. Copy the API token, you will need it when setting up the {% term integration %}.

{% include integrations/config_flow.md %}

## Entity Naming

A sensor prefix is specified in the config flow. The sensor entities are created according to this naming scheme:

- sensor.\<prefix\>\_\<zabbix_service_name\>
- sensor.\<prefix\>\_\<zabbix_problem_tag_name\>\_\<zabbix_problem_tag_value\>

## Entity States

| Numeric State | Problem |
| ------------- | ------- |
| -1 | OK |
| 0 | Not classified |
| 1 | Information |
| 2 | Warning |
| 3 | Average |
| 4 | High |
| 5 | Disaster |
