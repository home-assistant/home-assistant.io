---
title: Deutscher Wetterdienst (DWD) Weather Warnings
description: Instructions on how to integrate Deutscher Wetterdienst weather warnings into Home Assistant.
ha_category:
  - Weather
ha_config_flow: true
ha_release: 0.51
ha_iot_class: Cloud Polling
ha_domain: dwd_weather_warnings
ha_codeowners:
  - '@runningman84'
  - '@stephan192'
  - '@andarotajo'
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Deutscher Wetterdienst Weather Warnings** {% term integration %} uses the [Deutscher Wetterdienst (DWD)](https://www.dwd.de) as a source for current and advance weather warnings. The configured sensor checks for data every 15 minutes.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Warncell ID or name:
  description: Identifier of the region. It can be a warncell ID (integer) or a warncell name. It is heavily advised to use warncell ID because a warncell name is sometimes not unique. A list of valid warncell IDs and names can be found [here](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/cap_warncellids_csv.html). Some of the warncells are outdated but still listed. If the setup fails, search the list for a similar sounding warncell. If the warncell name is not unique, `" (not unique used ID)!"` will be added to the reported `region_name`.
Device tracker entity:
  description: A `device_tracker` entity that will be used to identify the warncell. The entity *has* to contain the attributes `latitude` and `longitude`. Setting either this field or `Warncell ID or name` is required, but not both.
{% endconfiguration_basic %}

### Attributes

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `last_update` | *(time)* Time and date (UTC) of last update from DWD. |
| `region_name` | *(str)* Requested region name. This should be the same as the region name in the configuration, if a name was given. |
| `region_id` | *(int)* Region ID assigned by DWD. This should be the same as the region id in the configuration, if an id was given. |
| `warning_count` | *(int)* Number of issued warnings. There can be more than one warning issued at once. |
| `warning_<x>` | *(list)* The warning as a whole object containing the following attributes as nested attributes. |
| `warning_<x>_level` | *(int)* Issued warning level (0 - 4).<br/>0: Keine Warnungen <br/>1: Wetterwarnungen <br/>2: Warnungen vor markantem Wetter<br/>3: Unwetterwarnungen<br/>4: Warnungen vor extremem Unwetter |
| `warning_<x>_type` | *(int)* Issued warning type. More information can be found [here](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/warning_codes_pdf.pdf?__blob=publicationFile&v=5). |
| `warning_<x>_name` | *(str)* Warning name correlated with the warning type and represented as a short string. |
| `warning_<x>_headline` | *(str)* Official headline of the weather warning. |
| `warning_<x>_start` | *(time)* Starting time and date (UTC) of the issued warning. |
| `warning_<x>_end` | *(time)* Ending time and date (UTC) of the issued warning. |
| `warning_<x>_description` | *(str)* Details for the issued warning. |
| `warning_<x>_instruction` | *(str)* The DWD sometimes provides helpful information about precautions to take for the issued warning. |
| `warning_<x>_parameters` | *(list)* A list of additional warning parameters. More information can be found [here](https://www.dwd.de/DE/leistungen/opendata/help/warnungen/warning_codes_pdf.pdf?__blob=publicationFile&v=5). |
| `warning_<x>_color` | *(str)* The DWD color of the warning encoded as `#rrggbb`. |

{% note %}
In the attribute name `x` is the counter of the warning starting from `1`.
{% endnote %}
