---
title: AdGuard Home
description: Instructions on how to integrate AdGuard Home with Home Assistant.
ha_category:
  - Network
  - Sensor
  - Switch
  - Update
ha_release: 0.95
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: adguard
ha_platforms:
  - sensor
  - switch
  - update
ha_integration_type: service
---

The **AdGuard Home** {% term integration %} lets you monitor and control your [AdGuard Home](https://adguard.com/adguard-home/overview.html) instance from Home Assistant.

AdGuard Home is network-wide software for blocking advertisements and tracking. It works at the DNS level, so once your devices use it as their DNS server, every phone, laptop, tablet, and smart device on your network is protected automatically, with nothing to install on each one. It blocks advertisements, trackers, and known malicious domains across the board.

With this integration, you can keep an eye on how much AdGuard Home is blocking right from your dashboard, and turn its protection features on or off without opening the AdGuard Home interface. Picture stricter filtering switching on the moment guests join your Wi-Fi, parental controls turning on while the kids do their homework, and a notification reaching you when DNS lookups start to slow down. Because every feature is available to your automations, you decide when and how your network protects itself.

## Prerequisites

Before you set up the integration, make sure you have:

- AdGuard Home installed and running on your network
- The IP address or hostname of your AdGuard Home instance
- Admin access to AdGuard Home

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

This integration provides sensors that give you insight into what AdGuard Home is doing on your network:

- **DNS queries**: The total number of DNS lookups AdGuard Home has handled.
- **DNS queries blocked**: How many of those lookups were blocked.
- **DNS queries blocked ratio**: The share of all queries that were blocked, as a percentage.
- **Safe browsing blocked**: The number of requests blocked for matching known phishing or malware sites.
- **Safe searches enforced**: How many times safe search was enforced on search engines.
- **Parental control blocked**: The number of requests blocked by parental control.
- **Rules count**: The total number of active filter rules currently loaded.
- **Average processing speed**: The average response time of the AdGuard Home DNS server, in milliseconds.

### Switches

The integration provides switches to control AdGuard Home features:

- **Protection**: The master switch that controls all AdGuard Home protection at once.
- **Filtering**: Enables DNS filtering using your blocklists.
- **Safe browsing**: Blocks known phishing and malware sites.
- **Parental control**: Blocks adult content.
- **Safe search**: Enforces safe search on search engines.
- **Query log**: Records DNS queries, which AdGuard Home needs to produce statistics.

These switches enable powerful automations. For example, you could automatically enable parental controls during school hours or disable ad blocking for specific time periods.

The **Protection** switch acts as a master control. When turned off, it bypasses all AdGuard Home protection, regardless of the individual switch states.

{% important %}
Turning off **Query log** stops all sensor updates. AdGuard Home requires query logging to provide statistics.
{% endimportant %}

### Update

The integration provides an {% term update %} entity to check for and install AdGuard Home software updates.

{% note %}
For Docker-based installations of AdGuard Home, no update entity is available for the AdGuard Home software. If you have installed the [AdGuard Home app for Home Assistant](https://github.com/hassio-addons/addon-adguard-home) (formerly known as AdGuard Home add-on) on {% term "Home Assistant Operating System" %}, Home Assistant provides an update entity for the AdGuard Home app for Home Assistant.
{% endnote %}

{% include integrations/actions.md %}

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


```yaml
automation:
  - alias: "Alert on slow DNS"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.adguard_average_processing_speed
        above: 50
    actions:
      - action: notify.send_message
        target:
          entity_id: notify.my_device
        data:
          title: "DNS Performance Alert"
          message: "AdGuard DNS response time is {{ states('sensor.adguard_average_processing_speed') }}ms"
```


## Data updates

The AdGuard Home integration polls for updates every 10 seconds to provide near real-time statistics and ensure switch states remain synchronized.

## Known limitations

AdGuard Home only filters devices that use it as their DNS server. A device on mobile data, connected through a VPN, or set to use a different DNS server bypasses AdGuard Home entirely. For those devices, your blocklists, parental controls, and safe browsing settings do not apply.

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
