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
ha_integration_type: service
---

The **AdGuard Home** {% term integration %} allows you to control and monitor your [AdGuard Home](https://adguard.com/adguard-home/overview.html) instance in Home Assistant.

AdGuard Home is a network-wide software for blocking advertisements and tracking. It provides DNS-level protection, automatically covering all home devices without requiring client-side software. When you use AdGuard Home as your DNS server, it blocks advertisements, trackers, and malicious domains for all devices on your network.

## Prerequisites

Before setting up the AdGuard Home integration, ensure you have:

1. AdGuard Home installed and running on your network
2. The IP address or hostname of your AdGuard Home instance
3. Admin access to AdGuard Home

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your AdGuard Home instance. For example: `192.168.1.100` or `adguard.local`."
Port:
  description: "The port AdGuard Home is running on. Default is `3000` for the web interface."
Username:
  description: "Your AdGuard Home admin username."
Password:
  description: "Your AdGuard Home admin password."
Verify SSL certificate:
  description: "Enable SSL certificate verification when connecting via HTTPS."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

This integration provides sensors for the following information from AdGuard Home:

- Number of DNS queries.
- Number of blocked DNS queries.
- Ratio (%) of blocked DNS queries.
- Number of requests blocked by safe browsing.
- Number of safe searches enforced.
- Number of requests blocked by parental control.
- Total number of active filter rules loaded.
- Average response time of AdGuard's DNS server in milliseconds.

### Switches

The integration provides switches to control AdGuard Home features:

- **AdGuard protection**: Master switch that controls all AdGuard features
- **Filtering**: Enables DNS filtering using blocklists
- **Safe browsing**: Blocks known phishing and malware sites
- **Parental control**: Blocks adult content
- **Safe search**: Enforces safe search on search engines
- **Query log**: Records DNS queries for statistics

These switches enable powerful automations. For example, you could automatically enable parental controls during school hours or disable ad blocking for specific time periods.

The **AdGuard protection** switch acts as a master control. When turned off, it bypasses all AdGuard features regardless of individual switch states.

{% important %}
Turning off **Query log** stops all sensor updates. AdGuard requires query logging to provide statistics.
{% endimportant %}

## Actions

The integration provides {% term actions %} to manage filter subscriptions in AdGuard Home. Use these actions in automations to dynamically control content filtering based on time, presence, or other conditions.

For example, you could create automations that:

- Block social media during work hours
- Enable strict filtering when guests connect to your network
- Temporarily disable filtering for specific downloads

### Action `adguard.add_url`

Adds a new filter subscription to AdGuard Home.

| Data attribute | Optional | Description                                   |
| -------------- | -------- | --------------------------------------------- |
| `name`         | No       | The name of the filter subscription           |
| `url`          | No       | The filter list URL containing blocking rules |

### Action `adguard.remove_url`

Removes a filter subscription from AdGuard Home.

| Data attribute | Optional | Description                           |
| -------------- | -------- | ------------------------------------- |
| `url`          | No       | The filter subscription URL to remove |

### Action `adguard.enable_url`

Enables a previously disabled filter subscription.

| Data attribute | Optional | Description                           |
| -------------- | -------- | ------------------------------------- |
| `url`          | No       | The filter subscription URL to enable |

### Action `adguard.disable_url`

Temporarily disables a filter subscription without removing it.

| Data attribute | Optional | Description                            |
| -------------- | -------- | -------------------------------------- |
| `url`          | No       | The filter subscription URL to disable |

### Action `adguard.refresh`

Refreshes all filter subscriptions to get the latest blocking rules.

| Data attribute | Optional | Description                                     |
| -------------- | -------- | ----------------------------------------------- |
| `force`        | Yes      | Force update (bypasses AdGuard Home throttling) |

By default, `force` is `false`. AdGuard Home normally throttles filter updates to reduce server load. Use forced updates sparingly.

## Examples

### Block social media during work hours

This automation blocks social media sites during business hours:

```yaml
automation:
  - alias: "Block social media during work"
    triggers:
      - trigger: time
        at: "09:00:00"
    actions:
      - action: adguard.add_url
        data:
          name: "Social media blocklist"
          url: "https://raw.githubusercontent.com/example/social-media-blocklist/main/list.txt"
      - action: adguard.refresh

  - alias: "Unblock social media after work"
    triggers:
      - trigger: time
        at: "17:00:00"
    actions:
      - action: adguard.remove_url
        data:
          url: "https://raw.githubusercontent.com/example/social-media-blocklist/main/list.txt"
```

### Enable strict filtering when guests arrive

Automatically enable all protection features when guests connect to your network:

```yaml
automation:
  - alias: "Enable strict filtering for guests"
    triggers:
      - trigger: state
        entity_id: group.guest_devices
        from: "not_home"
        to: "home"
    actions:
      - action: switch.turn_on
        target:
          entity_id:
            - switch.adguard_parental_control
            - switch.adguard_safe_browsing
            - switch.adguard_safe_search
```

### Monitor DNS performance

Send a notification if DNS response time exceeds threshold:

{% raw %}

```yaml
automation:
  - alias: "Alert on slow DNS"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.adguard_average_processing_speed
        above: 50
    actions:
      - action: notify.mobile_app
        data:
          title: "DNS Performance Alert"
          message: "AdGuard DNS response time is {{ states('sensor.adguard_average_processing_speed') }}ms"
```

{% endraw %}


## Data updates

The AdGuard Home integration polls for updates every 10 seconds to provide near real-time statistics and ensure switch states remain synchronized.

## Troubleshooting

### Integration fails to connect

#### Symptom: "Cannot connect to AdGuard Home"

When setting up the integration, you receive a connection error.

##### Resolution

1. Verify AdGuard Home is running:

   - Access the AdGuard Home web interface at `http://YOUR_IP:3000`.
   - Check the service status on your server.

2. Check network connectivity:

   - Ensure Home Assistant can reach the AdGuard Home instance.
   - Verify no firewall rules block port 3000.

3. Confirm credentials:
   - Test login via the AdGuard Home web interface.
   - Ensure you're using admin credentials.

### Sensors show unavailable

If sensors display as unavailable:

1. Check that **Query log** switch is enabled.
2. Verify AdGuard Home is processing DNS queries.
3. Ensure at least one device uses AdGuard Home as DNS server.

### Actions fail with "Filter URL not found"

This error occurs when trying to enable, disable, or remove a non-existent filter URL. Verify the exact URL using the AdGuard Home web interface under **Filters** > **DNS blocklists**.

## Removing the integration

This integration follows standard integration removal. After removal, your AdGuard Home instance continues running with its current configuration.

{% include integrations/remove_device_service.md %}
