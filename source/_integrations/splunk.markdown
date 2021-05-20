---
title: Splunk
description: Record events in Splunk.
ha_category:
  - History
ha_iot_class: Local Push
ha_release: 0.13
ha_domain: splunk
ha_codeowners:
  - '@Bre77'
---

The `splunk` integration makes it possible to log all state changes to an external [Splunk](https://splunk.com/) database using Splunk's HTTP Event Collector (HEC) feature. You can either use this alone, or with the Home Assistant for Splunk [app](https://github.com/miniconfig/splunk-homeassistant). Since the HEC feature is new to Splunk, you will need to use at least version 6.3.

## Configuration

To use the `splunk` integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
splunk:
  token: YOUR_SPLUNK_TOKEN
```

{% configuration %}
token:
  description: The HTTP Event Collector Token already created in your Splunk instance.
  required: true
  type: string
host:
  description: "IP address or host name of your Splunk host, e.g., 192.168.1.10."
  required: false
  default: localhost
  type: string
port:
  description: Port to use.
  required: false
  default: 8080
  type: integer
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: false
  type: boolean
verify_ssl:
  description: Allows you do disable checking of the SSL certificate.
  required: false
  default: false
  type: boolean
name:
  description: This parameter allows you to specify a friendly name to send to Splunk as the host, instead of using the name of the HEC.
  required: false
  default: HASS
  type: string
filter:
  description: Filters for entities to be included/excluded from Splunk. Default is to include all entities. ([Configure Filter](#configure-filter))
  required: false
  type: map
  keys:
    include_domains:
      description: Domains to be included.
      required: false
      type: list
    include_entity_globs:
      description: Include all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    include_entities:
      description: Entities to be included.
      required: false
      type: list
    exclude_domains:
      description: Domains to be excluded.
      required: false
      type: list
    exclude_entity_globs:
      description: Exclude all entities matching a listed pattern (e.g., `sensor.weather_*`).
      required: false
      type: list
    exclude_entities:
      description: Entities to be excluded.
      required: false
      type: list
{% endconfiguration %}

### Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `Splunk`, you can use the `filter` parameter.

```yaml
# Example filter to include specified domains and exclude specified entities
splunk:
  token: YOUR_SPLUNK_TOKEN
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   - Include domain and/or glob patterns specified
      - If domain is included, and entity not excluded or match exclude glob pattern, pass
      - If entity matches include glob pattern, and entity does not match any exclude criteria (domain, glob pattern or listed), pass
      - If domain is not included, glob pattern does not match, and entity not included, fail
   - Exclude domain and/or glob patterns specified and include does not list domains or glob patterns
      - If domain is excluded and entity not included, fail
      - If entity matches exclude glob pattern and entity not included, fail
      - If entity does not match any exclude criteria (domain, glob pattern or listed), pass
   - Neither include or exclude specifies domains or glob patterns
      - If entity is included, pass (as #2 above)
      - If entity include and exclude, the entity exclude is ignored
