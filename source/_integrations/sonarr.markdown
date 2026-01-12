---
title: Sonarr
description: Instructions on how to integrate Sonarr with Home Assistant
ha_category:
  - Downloading
ha_release: 0.34
ha_iot_class: Local Polling
ha_domain: sonarr
ha_config_flow: true
ha_codeowners:
  - '@ctalkington'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Sonarr** {% term integration %} pulls data from a given [Sonarr](https://sonarr.tv/) instance. This integration only supports Sonarr v3 instances.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The IP, FQDN, or URL of your Sonarr instance including the port number if you are not using port 8989 and your custom URL base if applicable.
API Key:
  description: To retrieve your API key, open your Sonarr web interface and navigate to Settings, then the General tab. Your Sonarr API Key will be listed on this page under the Security section.
{% endconfiguration_basic %}

## Sensors

The Sonarr integration will add the following sensors:

### Upcoming

Shows the number of upcoming episodes.

**State:** Total count of upcoming episodes

**Attributes:** Series title and episode identifier for each upcoming episode

Example attributes:
```yaml
The Andy Griffith Show: "S01E01"
Breaking Bad: "S05E16"
```

This sensor is enabled by default.

### Commands

Shows the number of commands currently being run.

**State:** Total count of active commands

**Attributes:** Command name and status for each running command

Example attributes:
```yaml
RefreshSeries: "completed"
RssSync: "queued"
```

This sensor is disabled by default.

### Disk Space

Shows the total available disk space across all storage locations.

**State:** Total free space in gigabytes (GB)

**Attributes:** Detailed disk space information for each storage path

Example attributes:
```yaml
/mnt/storage1: "250.50/500.00GB (50.10%)"
/mnt/storage2: "100.00/1000.00GB (10.00%)"
```

This sensor is disabled by default.

### Queue

Shows the number of episodes currently in the download queue.

**State:** Total count of queued episodes

**Attributes:** Series title with episode identifier and download progress percentage for each queued item

Example attributes:
```yaml
The Andy Griffith Show S01E01: "45.32%"
Breaking Bad S05E16: "78.50%"
```

This sensor is disabled by default.

### Shows

Shows the total number of series in your Sonarr library.

**State:** Total count of series

**Attributes:** Series title and episode statistics for each show

Example attributes:
```yaml
The Andy Griffith Show: "120/249 Episodes"
Breaking Bad: "62/62 Episodes"
```

This sensor is disabled by default.

### Wanted

Shows the number of episodes that are wanted but not yet downloaded.

**State:** Total count of wanted episodes

**Attributes:** Series title with episode identifier and air date for each wanted episode

Example attributes:
```yaml
The Andy Griffith Show S02E05: "2024-03-15T20:00:00-04:00"
Breaking Bad S03E12: "2024-03-20T21:00:00-04:00"
```

This sensor is disabled by default.

## Notes

- The five sensors (Commands, Disk Space, Queue, Shows, Wanted) are disabled by default and can be enabled on the device page in Home Assistant.
- All sensors update based on the configured update interval.
- Sensor attributes provide detailed information about individual items, making them useful for automations and custom dashboards.
