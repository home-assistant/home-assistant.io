---
title: IQVIA
description: Instructions on how to use IQVIA data within Home Assistant
ha_category:
  - Health
ha_release: 0.63
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: iqvia
---

The `iqvia` sensor platform collects and displays allergy, asthma and disease
information (based on a U.S. ZIP code) from [IQVIA](https://www.iqvia.com/).
Data measured includes:

* Indicies for allergies, asthma and cold/flu indices
* Trends
* Current outlook
* more!

## Configuring the Platform

To integrate `iqvia` into Home Assistant, add the following section to your
`configuration.yaml` file:

```yaml
iqvia:
  zip_code: "00544"
```

{% configuration %}
zip_code:
  description: The U.S. ZIP code to gather data for (as a quoted string).
  required: true
  type: string
{% endconfiguration %}

<div class='note warning'>
It is important to ensure the ZIP code is quoted if it starts with a 0. Unquoted
ZIP codes that start with 0 will cause errors.
</div>

## Understanding the Indices

Any index-related sensor will have a value between 0.0 and 12.0. The values
map to the following human-friendly ratings:

Range      | Rating
---------  | -----------
0.0 - 2.4  | Low
2.5 - 4.8  | Low/Medium
4.9 - 7.2  | Medium
7.3 - 9.6  | Medium/High
9.7 - 12.0 | High

## Understanding Asthma Allergens

Several asthma-related sensors carry information regarding the top three
"asthma allergens" (i.e., irritants that may exacerbate asthma symptoms).
Example values include:

Pollutant | Symbol | More Info
--------- | ------ | ---------
Particulate (<= 2.5 μm) | PM2.5 | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)
Particulate (<= 10 μm) | PM10 | [EPA: Particulate Matter (PM) Pollution](https://www.epa.gov/pm-pollution)
Ozone | O | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)
Sulpher Dioxide | SO2 | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)
Carbon Monoxide | CO | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution)
