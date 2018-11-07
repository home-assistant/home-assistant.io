---
layout: page
title: "Pollen.com"
description: "Instructions on how to use Pollen.com data within Home Assistant"
date: 2018-01-10 19:20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pollen.jpg
ha_category: Health
ha_release: 0.63
ha_iot_class: "Cloud Polling"
---

The `pollen` sensor platform collects and displays allergy, asthma, and disease
information (based on a U.S. ZIP code) from
[Pollen.com](https://www.pollen.com/). Data measured includes:

* Indicies for allergies, asthma and cold/flu indices
* Trends
* Current outlook
* more!

## {% linkable_title Configuring the Platform %}

To integrate `pollen` into Home Assistant, add the following section to your
`configuration.yaml` file (adjusting the `monitored_conditions` list to your
liking):

```yaml
sensor:
  platform: pollen
  zip_code: "00544"
  monitored_conditions:
    - allergy_average_forecasted
    - allergy_average_historical
    - allergy_index_today
    - allergy_index_tomorrow
    - allergy_index_yesterday
    - asthma_average_forecasted
    - asthma_average_historical
    - asthma_index_today
    - asthma_index_tomorrow
    - asthma_index_yesterday
    - disease_average_forecasted
```

{% configuration %}
  zip_code:
    description: the U.S. ZIP code to gather data for (as a quoted string)
    required: true
    type: string
  monitored_conditions:
    description: the metric types to monitor; valid values are specified below
    required: true
    type: list
{% endconfiguration %}

<p class='note warning'>
It is important to ensure the ZIP code is quoted if it starts with a 0. Unquoted
ZIP codes that start with 0 will cause errors.
</p>

## {% linkable_title Available Metrics %}

The following metrics can be monitored:

* Allergy Index: Forecasted Average (`allergy_average_forecasted`): the average
forecasted allergy index over the next 5 days
* Allergy Index: Historical Average (`allergy_average_historical`): the average
historical allergy index over the past 30 days
* Allergy Index: Today (`allergy_index_today`): the allergy index for today
* Allergy Index: Tomorrow (`allergy_index_tomorrow`): the allergy index for
tomorrow
* Allergy Index: Yesterday (`allergy_index_yesterday`): the allergy index for
yesterday
* Asthma Index: Forecasted Average (`asthma_average_forecasted`): the average
forecasted asthma index over the next 5 days
* Asthma Index: Historical Average (`asthma_average_historical`): the average
historical asthma index over the past 30 days
* Asthma Index: Today (`asthma_index_today`): the asthma index for today
* Asthma Index: Tomorrow (`asthma_index_tomorrow`): the asthma index for
tomorrow
* Asthma Index: Yesterday (`asthma_index_yesterday`): the asthma index for
yesterday
* Cold & Flu: Forecasted Average (`disease_average_forecasted`): the average
forecasted cold/flu index over the next 5 days

## {% linkable_title Understanding the Indices %}

Any index-related sensor will have a value between 0.0 and 12.0. The values
map to the following human-friendly ratings:

Range      | Rating
---------  | -----------
0.0 - 2.4  | Low
2.5 - 4.8  | Low/Medium
4.9 - 7.2  | Medium
7.3 - 9.6  | Medium/High
9.7 - 12.0 | High

## {% linkable_title Understanding Asthma Allergens %}

Several asthma-related sensors carry information regarding the top three
"asthma allergens" (i.e., irritants that may exacerbate asthma symptoms).
Example values include:

Pollutant | Symbol | More Info
--------- | ------ | ---------
Particulate (<= 2.5 μm) | PM2.5 | [EPA: Particulate Matter (PM) Pollution ](https://www.epa.gov/pm-pollution)
Particulate (<= 10 μm) | PM10 | [EPA: Particulate Matter (PM) Pollution ](https://www.epa.gov/pm-pollution)
Ozone | O | [EPA: Ozone Pollution](https://www.epa.gov/ozone-pollution)
Sulpher Dioxide | SO2 | [EPA: Sulfur Dioxide (SO2) Pollution](https://www.epa.gov/so2-pollution)
Carbon Monoxide | CO | [EPA: Carbon Monoxide (CO) Pollution in Outdoor Air](https://www.epa.gov/co-pollution)
