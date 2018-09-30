---
layout: page
title: "Jewish Calendar"
description: "Instructions on how to integrate the Jewish Calendar sensor within Home Assistant."
date: 2018-09-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Calendar
ha_iot_class: "Local Poll"
ha_release: "0.79"
---

The Jewish Calendar (`jewish_calendar`) sensor platform displays a variety of information related to the Jewish Calendar as a variety of sensors.

## {% linkable_title Configuration %}

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: jewish_calendar
```

{% configuration %}
language:
  required: false
  default: hebrew
  description: Whether to represent the sensors in Hebrew (א' תשרי תשע"ט) or English characters (1 Tishri 5779).
  type: string
latitude:
  required: false
  description: Latitude for time calculations of the sensor.
  default: Home Assistant location
  type: int
longitude:
  required: false
  description: Longitude for time calculations of the sensor.
  default: Home Assistant location
  type: int
disapora:
  required: false
  description: Consider the location as diaspora or not for calculation of the weekly portion and holidays.
  default: False
  type: string
sensors:
  required: false
  default: date
  description: List of available sensors.
  keys:
    date:
      description: Show the hebrew date for today.
    weekly_portion:
      description: Show the weekly portion (parshat hashavu'a) - _At the moment only shows up on Saturday's_.
    holiday_name:
      description: If it is a holiday, show the name of the holiday.
    holyness:
      description: On a scale of 1 to 9 show the level of holyness _(see below)_.
    first_light:
      description: First light of dawn (Alot Hashachar - עלות השחר).
    gra_end_shma:
      description: Last time for reading of the Shma according to the GR"A.
    mga_end_shma:
      description: Last time for reading of the Shma according to the MG"A.
    plag_mincha:
      description: Time of the Plag Hamincha.
    first_stars:
      description: Time at which the first stars are visible (Tset Hakochavim - צאת הכוכבים).
{% endconfiguration %}

### {% linkable_title Holyness levels %}

1. Mido'rayta - by Torah ordination (Rosh Hashana, Yom Kippur, Pesach, Shavuot, Sukkot)
2. Erev Yom Kippur
3. Hol Hamo'ed
4. Hanukka and Purim
5. Fast days
6. Yom Yerushalayim and Yom Haatsmaut
7. Lag ba'omer and Tu bishvat
8. Memorial days: yom hazikaron and yom hashoah
9. Days mentioned by the Israeli parliament: Rabin memorial day, Ze'ev Zhabotinsky day, etc.

## {% linkable_title Full configuration sample %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: jewish_calendar
    language: english
    disapora: True
    sensors:
      - date
      - weekly_portion
      - holiday_name
      - holyness
      - first_light
      - gra_end_shma
      - mga_end_shma
      - plag_mincha
      - first_stars
```
