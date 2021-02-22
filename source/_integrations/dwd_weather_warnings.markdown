---
title: Deutscher Wetterdienst (DWD) Weather Warnings
description: Instructions on how to integrate Deutsche Wetter Dienst weather warnings into Home Assistant.
ha_category:
  - Weather
ha_release: 0.51
ha_iot_class: Cloud Polling
ha_domain: dwd_weather_warnings
ha_codeowners:
  - '@runningman84'
  - '@stephan192'
  - '@Hummel95'
ha_platforms:
  - sensor
---

The `dwd_weather_warnings` sensor platform uses the [Deutsche Wetter Dienst (DWD)](https://www.dwd.de) as a source for current and advance warnings.

- A name is optional but if multiple regions are used a name will be required.
- The sensor checks for new data every 15 minutes.

## Configuration

To add the DWD WarnApp sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dwd_weather_warnings
    region_name: Hansestadt Hamburg
```

<div class="note">

- The `region_name` can either be a so called `warncell id` (integer) or a `warncell name` (string). It is heavily advised to use `warncell id` because `warncell name` is not unique in some cases.  
A list of valid warncell ids and names can be found at https://www.dwd.de/DE/leistungen/opendata/help/warnungen/cap_warncellids_csv.html.
- Some of the warncells are outdated but still listed. If setup fails search the list for a similar sounding warncell.
- If you selected a `warncell name` and the name is not unique `" (not unique used ID)!"` will be added to the reported `region_name`.

</div>

{% configuration %}
region_name:
  required: true
  description: The region name = warncell name (string) or region id = warncell id (integer) taken from DWD homepage.
  type: [string, integer]
name:
  required: false
  description: The name you would like to give to the warnapp sensor.
  type: string
  default: DWD-Weather-Warnings
monitored_conditions:
  description: List of warnings you want to be informed about.
  required: false
  default: all
  type: list
  keys:
    current_warning_level:
      description: The current warning level.
    advance_warning_level:
      description: The expected warning level.
{% endconfiguration %}

### Attributes

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `last_update` | *(time)* Time and date (UTC) of last update from DWD. |
| `region_name` | *(str)* Requested region name. This should be the same as the region name in the configuration if a name was given. |
| `region_id` | *(int)* Region ID assigned by DWD. This should be the same as the region name in the configuration if an id was given. |
| `warning_count` | *(int)* Number of issued warnings. There can be more than one warning issued at once. |
| `warning_<x>` | *(list)* The warning as a whole object containing the following attributes as nested attributes. |
| `warning_<x>_level` | *(int)* Issued warning level (0 - 4).<br/>0: Keine Warnungen <br/>1: Wetterwarnungen <br/>2: Warnungen vor markantem Wetter<br/>3: Unwetterwarnungen<br/>4: Warnungen vor extremem Unwetter |
| `warning_<x>_type` | *(int)* Issued warning type. <br/>More information can be found at https://www.dwd.de/DE/leistungen/opendata/help/warnungen/neu_cap_dwd_profile_changes_de_pdf.pdf |
| `warning_<x>_name` | *(str)* Warning name correlates with the warning type and represents it as a short string. |
| `warning_<x>_headline` | *(str)* Official headline of the weather warning. |
| `warning_<x>_start` | *(time)* Starting time and date (UTC) of the issued warning. |
| `warning_<x>_end` | *(time)* Ending time and date (UTC) of the issued warning. |
| `warning_<x>_description` | *(str)* Details for the issued warning. |
| `warning_<x>_instruction` | *(str)* The DWD sometimes provides helpful information about precautions to take for the issued warning. |
| `warning_<x>_parameters` | *(list)* A list of additional warning parameters. <br/>More information can be found at https://www.dwd.de/DE/leistungen/opendata/help/warnungen/neu_cap_dwd_profile_changes_de_pdf.pdf |
| `warning_<x>_color` | *(str)* The DWD color of the warning encoded as `#rrggbb`. |

<div class="note">

In the attribute name `x` is the counter of the warning starting from `1`.

</div>
