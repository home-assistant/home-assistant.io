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

The `pollen` sensor platform collects and displays allergy and disease
information (based on a U.S. ZIP code) from [Pollen.com](https://www.pollen.com/). Data measured includes:

* Indicies for allergies and cold/flu measurements
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
