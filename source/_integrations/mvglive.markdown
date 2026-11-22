---
description: Instructions on how to integrate Munich public transport departure times into Home Assistant.
ha_release: 0.42
ha_domain: mvglive
ha_config_flow: true
---

The **MVG** {% term integration %} shows the next departures of buses, trams, subways, and trains at a station or stop in the Munich public transport network. Each configured station gets a sensor whose state is the number of minutes until the next departure. Details such as the line, destination, and the list of upcoming departures are available as attributes.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Station:
  description: "Name of the station or stop to search for, for example `Hauptbahnhof`. If more than one station matches, you can select the right one in the next step."
Modes of transport:
  description: "The modes of transport to include. If none are selected, all modes are included."
{% endconfiguration_basic %}

Repeat these steps to add more stations. Each station is added as its own entry.

{% include integrations/option_flow.md name="MVG" %}

{% configuration_basic %}
Destinations:
  description: "Only include departures heading to one of these final stops, for example `Feldmoching`. Leave empty to include all destinations."
Lines:
  description: "Only include departures of these lines, for example `U2` or `N41`. Leave empty to include all lines."
Modes of transport:
  description: "The modes of transport to include. If none are selected, all modes are included."
Time offset (minutes):
  description: "Do not show departures leaving sooner than this number of minutes. Useful if it takes you a few minutes to get to the stop. Defaults to `0`."
Number of departures:
  description: "How many upcoming departures are stored in the `departures` attribute. Defaults to `5`."
{% endconfiguration_basic %}

## Sensor

The state of the sensor is the number of minutes until the next matching departure. The attributes contain the details of that departure, such as `line`, `destination`, and `time_in_mins`, as well as a `departures` list with all upcoming departures up to the configured number.

For example, to get the minutes until the second departure in a template (this requires **Number of departures** to be at least `2`):

{% raw %}

```jinja2
{{ state_attr('sensor.hauptbahnhof', 'departures')[1].time_in_mins }}
```

{% endraw %}

## Migrating from YAML

Configuring this integration in {% term "`configuration.yaml`" %} is deprecated. Existing `mvglive` YAML configurations are imported automatically when Home Assistant starts:

- Each `nextdeparture` entry becomes its own entry, and existing entity IDs are kept.
- After a YAML block has been imported, a repair issue shows which block you can remove from your {% term "`configuration.yaml`" %}.
- If a station cannot be found, a repair issue asks you to remove that entry and add the station from the UI instead.
- If the MVG service cannot be reached, Home Assistant retries the import automatically. Keep the YAML configuration until the import succeeds.

The `directions` option is not available anymore. Use the **Destinations** or **Lines** options instead. The former product names `ExpressBus` and `Nachteule` are mapped to **Bus**.

## Data updates

The integration polls the MVG service for new departures periodically.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
