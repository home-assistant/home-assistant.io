---
title: "Setup basic information"
description: "Setting up the basic info of Home Assistant."
---

As part of the default onboarding process, Home Assistant can detect your location from IP address geolocation. Home Assistant will automatically select a temperature unit and time zone based on this location. You may adjust this during onboarding, or afterwards at {% my general title="Configuration -> General" %}.

If you prefer YAML, you can add the following information to your `configuration.yaml`:

```yaml
homeassistant:
  name: Home
  latitude: 32.87336
  longitude: 117.22743
  elevation: 430
  unit_system: metric
  time_zone: "America/Los_Angeles"
  external_url: "https://www.example.com"
  internal_url: "http://homeassistant.local:8123"
  allowlist_external_dirs:
    - "/usr/var/dumping-ground"
    - "/tmp"
  allowlist_external_urls:
    - "http://images.com/image1.png"
  media_dirs:
    media: "/media"
    recordings: "/mnt/recordings"
  legacy_templates: false
```

NOTE: You will not be able to edit anything in {% my general title="Configuration -> General" %} in the UI if you are using YAML configuration for any of the following: name, latitude, longitude, elevation, unit_system, temperature_unit, time_zone, external_url, internal_url.

{% configuration %}
name:
  description: Name of the location where Home Assistant is running.
  required: false
  type: string
latitude:
  description: Latitude of your location required to calculate the time the sun rises and sets.
  required: false
  type: float
longitude:
  description: Longitude of your location required to calculate the time the sun rises and sets.
  required: false
  type: float
elevation:
  description: Altitude above sea level in meters. Impacts weather/sunrise data.
  required: false
  type: integer
unit_system:
  description: "`metric` for Metric, `imperial` for Imperial. This also sets temperature_unit, Celsius for Metric and Fahrenheit for Imperial"
  required: false
  type: string
temperature_unit:
  description: "Override temperature unit set by unit_system. `C` for Celsius, `F` for Fahrenheit."
  required: false
  type: string
time_zone:
  description: "Pick your time zone from the column **TZ** of [Wikipedia's list of tz database time zones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)"
  required: false
  type: string
external_url:
  description: "The URL that Home Assistant is available on from the internet. For example: `https://example.duckdns.org:8123`. Note that this setting may only contain a protocol, hostname and port; using a path is not supported."
  required: false
  type: string
internal_url:
  description: "The URL that Home Assistant is available on from your local network. For example: `http://homeassistant.local:8123`. Note that this setting may only contain a protocol, hostname and port; using a path is not supported."
  required: false
  type: string
customize:
  description: "[Customize](/docs/configuration/customizing-devices/) entities."
  required: false
  type: string
customize_domain:
  description: "[Customize](/docs/configuration/customizing-devices/) all entities in a domain."
  required: false
  type: string
customize_glob:
  description: "[Customize](/docs/configuration/customizing-devices/) entities matching a pattern."
  required: false
  type: string
allowlist_external_dirs:
  description: List of folders that can be used as sources for sending files.
  required: false
  type: list
allowlist_external_urls:
  description: List of external URLs that can be fetched. URLs can match specific resources (e.g., `http://10.10.10.12/images/image1.jpg`) or a relative path that allows access to resources within it (e.g., `http://10.10.10.12/images` would allow access to anything under that path)
  required: false
  type: list
media_dirs:
  description: A mapping of local media sources and their paths on disk.
  required: false
  type: map
legacy_templates:
  description: Enable this option to restore pre-0.117 template rendering. Which renders all templates to string, instead of native types.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

## Reload Core Service

Home Assistant offers a service to reload the core configuration while Home Assistant is running called {% my developer_call_service service="homeassistant.reload_core_config" %}. This allows you to change any of the above sections and see it being applied without having to restart Home Assistant. To call this service, go to the "{% my developer_services %}" tab under {% my developer_services title="Developer Tools" %}, select the {% my developer_call_service service="homeassistant.reload_core_config" %} service and click the "CALL SERVICE" button. Alternatively, you can press the "Reload Location & Customizations" button under {% my server_controls title="Configuration > Server Control" %}.
