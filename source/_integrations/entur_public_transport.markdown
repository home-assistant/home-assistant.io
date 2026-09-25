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
ha_quality_scale: legacy
---

The **Entur** {% term integration %} provides real-time departure information for bus stops, ferry quays, train stations, airports, and passenger ferry quays in Norway.

Set up Entur from the Home Assistant user interface. You can search for a stop place by name, select the routes and platforms you want to monitor, and verify the selection in Entur before saving it.

For each configured stop place, Home Assistant creates a sensor that shows the minutes until the next departure. Sensor attributes include upcoming departures, whether information is real-time or scheduled, and delay information.

Real-time data is fetched from [Entur](https://www.entur.no). Entur collects and delivers information about public transport in Norway under an [open source license](https://data.norge.no/nlod/no).

{% note %}
The underlying API is rate limited. To avoid blocking your instance, Entur sensors fetch new information only every 45 seconds. Do not schedule updates more often than this.
{% endnote %}

## Set up from the user interface

To add Entur:

1. Go to **Settings** > **Devices & services**.
2. Select **Add integration**, then select **Entur**.
3. Search for the stop place by name and select the matching result. The result includes the locality and transport modes to help distinguish similar names.
4. Select routes returned by Entur. Leave the route selection empty to show all routes, or enter exact Entur line IDs manually when a route is not listed.
5. Select the platform detail:
   - **Stop place only** creates one sensor and is the recommended choice for most stops.
   - **All active platforms** also creates a sensor for every active platform.
   - **Selected platforms** creates sensors only for the platforms you select.
6. Optionally enable **Show on map** to add the stop location to the sensor attributes for use in Home Assistant maps.
7. Review the canonical Entur ID and use the link to Entur to verify the stop place before selecting **Submit**.

## Manage stop places

The Entur integration page lists every configured stop place, including its route summary and stop type.

- To add another stop place, select **Add a stop place**.
- To change a stop place, select **Configure** next to it. The maintenance page shows the current route filter, platform detail, and map setting. You can edit those settings without searching for the stop again, or explicitly choose to replace the stop place.
- To remove an entire stop place, use its three-dot menu on the integration page.

## YAML configuration

{% note %}
For new setups, use the user interface. YAML configuration remains supported for existing setups and when you need it.
{% endnote %}

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
  description: Whether stop and platform locations should be added to the sensor attributes and map.
  required: false
  type: boolean
  default: false
line_whitelist:
  description: List of lines to show in the resulting sensors. A line is shown only when it is expected to leave the platform or station. Include every line you want to show for every configured stop.
  required: false
  type: list
omit_non_boarding:
  description: Whether to remove departures that do not take new passengers or are at the last stop.
  required: false
  type: boolean
  default: true
number_of_departures:
  description: The number of departures that should be shown in the sensor attributes. Maximum 10, Minimum 2.
  required: false
  type: integer
  default: 2
{% endconfiguration %}

## Example usage

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

Example with whitelisting lines for a YAML configuration. The YAML whitelist applies to all configured stops. In the user interface, route selections apply only to the individual stop place.

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

## Obtaining a stop ID for YAML

[Entur's trip planner](https://entur.no) has a map of all stops used in Norway. Use the map to find the stops you're interested in. When you have found one of your stops, select it.

Now the web browser should contain a URL with the id in it. Such as this:

`https://entur.no/nearby-stop-place-detail?id=NSR:StopPlace:32376`

The stop ID is the text after the `id=` parameter in the URL. Copy it into the configuration.

## FAQ - Troubleshooting

**Q:** I have multiple stop IDs in YAML and have added whitelisting of a line. Now some of the stop places are showing `unknown`.

**A:** A YAML line whitelist applies to all configured stops. Include all lines that you want to show on all stop places. Route selections made in the user interface apply only to the selected stop place.

---

**Q:** I have added whitelisting of lines, and everything has worked as fine before, but now it has stopped updating all of a sudden.

**A:** Some transport companies, such as Kolumbus in Rogaland, include running numbers at the end of their line IDs. These are periodically updated and can make the whitelist invalid. Add the new line IDs again; in many cases the running number increments by one.

---

**Q:** Where do I find a line ID to add to the whitelist?

**A:** The user interface lists routes returned by Entur and also accepts exact line IDs entered manually. The sensor attributes include the line ID for upcoming departures. You can also inspect traffic in [Entur's trip planner](https://entur.no).
