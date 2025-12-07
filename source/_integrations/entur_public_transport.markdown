---
title: Entur
description: Instructions for how to set up monitoring of public transport departures in Norway.
ha_category:
  - Transport
ha_release: 0.84
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@hfurubotten'
  - '@SanderBlom'
ha_domain: entur_public_transport
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
ha_config_flow: true
---

The Entur integration gives real-time departure information for the next departures from any bus stop, car ferry quay, train station, airport and person ferries quay in Norway.

For each stop place given in the configuration, a sensor will be created for that stop place. It will give remaining minutes until the nearest departure in the state, but also next departures in the attributes. Information about if the departure is monitored in real-time or is from scheduled times, and how many minutes there is in delays, are included as well.

Real-time data is fetched from [Entur](https://www.entur.no). Entur is a service which collects and delivers information about all public transport available in Norway under an [open source license](https://data.norge.no/nlod/no).

{% note %}
The underlying API is rate limited. To avoid getting your instance blocked from Entur, the sensor only fetches new information every 45 seconds.
{% endnote %}

{% include integrations/config_flow.md %}

## Configuration options

The following options can be configured when setting up the integration or changed later via the integration options:

{% configuration_basic %}
Stop IDs:
  description: List of stop places or platforms to monitor departure times from (e.g., `NSR:StopPlace:337` or `NSR:Quay:7203`).
Expand platforms:
  description: If additional sensors should be created for each platform under a stop place.
Show on map:
  description: If platform locations should be added to the sensor attributes for map display.
Line whitelist:
  description: List of lines to filter. Only departures for these specific line IDs will be shown. Leave empty for all lines.
Omit non-boarding:
  description: Hide departures where boarding is not allowed (e.g., last stop).
Number of departures:
  description: The number of upcoming departures to include in the sensor attributes (2-10).
{% endconfiguration_basic %}

## Example stop IDs

Here are some example stop IDs you can use:

- `NSR:StopPlace:548` - Bergen train station
- `NSR:StopPlace:737` - Trondheim airport
- `NSR:StopPlace:5850` - Grorud T bus stop
- `NSR:StopPlace:58652` - Mortavika ferry
- `NSR:StopPlace:27639` - Sør-Hidle quay
- `NSR:Quay:48550` - Fiskepiren bus stop platform 1

## Obtaining a stop ID

[Entur's travel planner](https://entur.no/kart) has a map of all stops used in Norway. Use the map or search for your stop interested in. When you have found one of your stops, click on it.

Now the web browser should contain a URL with the ID in it. Such as this:

`https://entur.no/kart/stoppested?id=NSR:StopPlace:32376`

The stop ID is the content after `id=` parameter in the URL. Copy this into the integration configuration.

## FAQ - Troubleshooting

**Q:** I have multiple stop IDs and have added a line whitelist. Now some of the stop places are showing `unknown`.

**A:** A line whitelist takes effect on all stops. You need to whitelist all lines you are interested in across all stop places.

---

**Q:** I have added a line whitelist and everything worked fine before, but now it has stopped updating.

**A:** Some transport companies, such as Kolumbus in Rogaland, have running numbers on the end of their line IDs. These get periodically updated and will invalidate the whitelist. The new line IDs need to be added again. Most of the time it iterates by one.

---

**Q:** Where do I find a line ID to add to the whitelist?

**A:** The sensor will show the line ID in its attributes, which is the recommended way to find it. It is also possible to see the line IDs by using the developer tools in your browser while looking at the network traffic on [Entur's travel planner](https://entur.no).

## YAML configuration (deprecated)

{% warning %}
YAML configuration is deprecated and will be removed in a future release of Home Assistant. Please migrate to the UI configuration by removing the YAML configuration and setting up the integration through **Settings** > **Devices & Services** > **Add Integration**.
{% endwarning %}

If you are still using YAML configuration, the following options are available:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: entur_public_transport
    stop_ids:
      - 'STOP_ID_1'
      - 'STOP_ID_2'
```

{% configuration %}
stop_ids:
  description: List of stop places or platforms to monitor departure times from.
  required: true
  type: list
name:
  description: Override parts of the sensor name.
  required: false
  type: string
  default: Entur
expand_platforms:
  description: If additional sensors should be created for each platform under a stop place.
  required: false
  type: boolean
  default: true
show_on_map:
  description: If platform locations should be added to the sensor, and the map.
  required: false
  type: boolean
  default: false
line_whitelist:
  description: List of lines that should be whitelisted in the resulting sensors, and will only show when the defined lines are expected to leave the platform or station.
  required: false
  type: list
omit_non_boarding:
  description: If the sensors should remove resulting departures that don't take new passengers, or is at last stop.
  required: false
  type: boolean
  default: true
number_of_departures:
  description: The number of departures that should be shown in the sensor attributes. Maximum 10, Minimum 2.
  required: false
  type: integer
  default: 2
{% endconfiguration %}

### YAML examples

Example of multiple stop places, with expanded sensors for each platform under the station, and with the platforms added to the map.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: entur_public_transport
    name: Transport
    expand_platforms: true
    show_on_map: true
    stop_ids:
      - 'NSR:StopPlace:548'   # Bergen train station
      - 'NSR:StopPlace:737'   # Trondheim airport
      - 'NSR:StopPlace:5850'  # Grorud T bus stop
      - 'NSR:StopPlace:58652' # Mortavika ferry
      - 'NSR:StopPlace:27639' # Sør-Hidle quay
      - 'NSR:Quay:48550'      # Fiskepiren bus stop platform 1
```

Example with whitelisting of one line on each stop place.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: entur_public_transport
    stop_ids:
      - 'NSR:Quay:7333'
      - 'NSR:Quay:48550'
      - 'NSR:StopPlace:596'
    line_whitelist:
      - 'RUT:Line:1'
      - 'KOL:Line:1000_236'
      - 'NSB:Line:59'
```
