---
title: "Time & Date"
description: "Instructions on how to integrate the time and the date within Home Assistant."
logo: home-assistant.png
ha_category:
  - Calendar
ha_iot_class: Local Push
ha_release: pre 0.7
ha_qa_scale: internal
---

The time and date (`time_date`) sensor platform simple displays the time in various formats, the date, or both.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: time_date
    display_options:
      - 'time'
      - 'date'
      - 'date_time'
      - 'date_time_iso'
      - 'time_date'
      - 'time_utc'
      - 'beat'
```

- **display_options** array (*Required*): The option to display. The types *date_time*, *time_date*, and *date_time_iso* shows the date and the time. The other types just the time or the date. *beat* shows the [Swatch Internet Time](https://www.swatch.com/en_us/internet-time).

<p class='img'>
  <img src='{{site_root}}/images/screenshots/time_date.png' />
</p>
