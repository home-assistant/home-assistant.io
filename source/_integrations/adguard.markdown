---
title: AdGuard Home
description: Instructions on how to integrate AdGuard Home with Home Assistant.
ha_category:
  - Network
  - Sensor
  - Switch
ha_release: 0.95
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: adguard
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
---

AdGuard Home is a network-wide ad- and tracker-blocking DNS server with parental
control (adult content blocking) capabilities. The AdGuard integration allows
you to control and monitor your AdGuard Home instance in Home Assistant.

{% include integrations/config_flow.md %}

## Sensors

This integration provides sensors for the following information from AdGuard Home:

- Number of DNS queries.
- Number of blocked DNS queries.
- Ratio (%) of blocked DNS queries.
- Number of requests blocked by safe browsing.
- Number of safe searches enforced.
- Number of requests blocked by parental control.
- Total number of active filter rules loaded.
- Average response time of AdGuard's DNS server in milliseconds.

## Switches

The integration will create a number of switches:

- AdGuard Protection (master switch).
- Filtering.
- Safe Browsing.
- Parental Control.
- Safe Search.
- Query Log.

These switches allow you to automate things easily. For example, one could
write an automation to turn off Safe Search after the kids' bedtime.

The "AdGuard Protection" switch is a master switch. It will turn off and
bypass all AdGuard features, regardless of whether they are switched on or not.

<div class="note">
Turning off Query Log will result in all sensors not receiving updates anymore.
AdGuard relies on Query Log to provide stats.
</div>

## Services

These services allow one to manage filter subscriptions in AdGuard Home.
Using these services in automations could be helpful to block certain
sites/domains at certain times.

For example, you could create a custom filter list that blocks social media sites
during the day and releases them during the evening.

### Service `add_url`

Add a new filter subscription to AdGuard Home.

| Service data attribute | Optional | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| `name`                 | No       | The name of the filter subscription.                         |
| `url`                  | No       | The filter URL to subscribe to, containing the filter rules. |

### Service `remove_url`

Removes a filter subscription from AdGuard Home.

| Service data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `url`                  | No       | The filter subscription URL to remove. |

### Service `enable_url`

Enables a filter subscription in AdGuard Home.

| Service data attribute | Optional | Description                            |
| ---------------------- | -------- | -------------------------------------- |
| `url`                  | No       | The filter subscription URL to enable. |

### Service `disable_url`

Disables a filter subscription in AdGuard Home.

| Service data attribute | Optional | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `url`                  | No       | The filter subscription URL to disable. |

### Service `refresh`

Refresh all filter subscriptions in AdGuard Home.

| Service data attribute | Optional | Description                                       |
| ---------------------- | -------- | ------------------------------------------------- |
| `force`                | Yes      | Force update (bypasses AdGuard Home throttling).  |

By default, `force` is set to `false`. Forcing an update bypasses AdGuard Home's
throttling logic, so use with care.
