---
title: Jewish Calendar
description: Instructions on how to integrate the Jewish Calendar integration within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Calculated
ha_release: 0.79
ha_codeowners:
  - '@tsvi'
ha_domain: jewish_calendar
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Jewish Calendar (`jewish_calendar`) integration displays a variety of information about the current day related to the Jewish Calendar as a variety of sensors, and offers services to return information about other days.

## Configuration

To enable this integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
jewish_calendar:
```

{% configuration %}
language:
  required: false
  default: english
  description: Whether to represent the sensors in Hebrew (א' תשרי תשע"ט) or English characters (1 Tishrei 5779). Valid options are 'english' and 'hebrew'.
  type: string
latitude:
  required: false
  description: Latitude for time calculations of the sensor.
  default: Home Assistant location
  type: integer
longitude:
  required: false
  description: Longitude for time calculations of the sensor.
  default: Home Assistant location
  type: integer
diaspora:
  required: false
  description: Consider the location as diaspora (חוץ לארץ) for calculation of the weekly portion and holidays. By default it will consider the location as Israel (One day Yom Tov), setting it to true will show a second day Yom Tov.
  default: false
  type: string
candle_lighting_minutes_before_sunset:
  required: false
  description: Number of minutes before sunset to report as candle lighting time.
  default: 18
  type: integer
havdalah_minutes_after_sunset:
  required: false
  description: Number of minutes after sunset to report as havdalah time. If this is set to 0, uses the time that the sun is 8.5 degrees below the horizon (same as the `first_stars` sensor). If non-zero, this value is added as an offset to the time of sunset to report havdalah.
  default: 0
  type: integer
{% endconfiguration %}

## Sensor list

### Data sensors

- `date`: Shows the hebrew date for today.
- `weekly_portion`: Shows the weekly portion (parshat hashavu'a - פרשת השבוע)
- `holiday`: If it is a holiday, shows the name of the holiday _(see below for more info)_.
- `omer_count`: An integer sensor indicating the day of the Omer (1-49) or 0 if it is not currently the Omer.
- `daf_yomi`: Shows the date's daf yomi page.

### Time sensors

*Note: Due to the variety of rabbinic opinions on how to calculate the different times, we do not take any responsibility on your religious reliance upon these calculations.*

Time sensor states are represented as ISO8601 formatted *UTC time*.

- `first_light`: First light of dawn (Alot Hashachar - עלות השחר)
- `talit`: Earliest time for tallit and tefillin (Misheyakir - משיכיר)
- `sunrise`: Earliest time for Shacharit (Hanetz Hachama - הנץ החמה)
- `gra_end_shma`: Last time for reading of the Shma according to the Gr"a.
- `mga_end_shma`: Last time for reading of the Shma according to the MG"A.
- `gra_end_tefilla`: Last time for full shacharit according to the Gr"a.
- `mga_end_tefilla`: Last time for full shacharit according to the MG"A.
- `midday`: Half way through the day (Chatzot Hayom - חצות היום)
- `big_mincha`: Earliest time for Mincha (Mincha Gedola - מנחה גדולה)
- `little_mincha`: Preferable earliest time for Mincha (Mincha Ketana - מנחה קטנה)
- `plag_mincha`: Time of the Plag Hamincha (פלג המנחה)
- `sunset`: Sunset (Shkiya - שקיעה)
- `first_stars`: Time at which the first stars are visible (Tseit Hakochavim - צאת הכוכבים)
- `upcoming_shabbat_candle_lighting`: The time of candle lighting for either the current Shabbat (if it is currently Shabbat) or the immediately upcoming Shabbat.
- `upcoming_shabbat_havdalah`: The time of havdalah for either the current Shabbat (if it is currently Shabbat) or the immediately upcoming Shabbat. If it is currently a three-day holiday, this value *could* be None (i.e., if holiday is Sat./Sun./Mon. and it's Saturday, there will be no `shabbat_havdalah` value. See comments in hdate library for details.)
- `upcoming_candle_lighting`: The time of candle lighting for either the current Shabbat OR Yom Tov, or the immediately upcoming Shabbat OR Yom Tov. If, for example, today is Sunday, and Rosh Hashana is Monday night through Wednesday night, this reports the candle lighting for Rosh Hashana on Monday night. This avoids a situation of triggering pre-candle-lighting automations while it is currently Yom Tov. To always get the Shabbat times, use the `upcoming_shabbat_candle_lighting` sensor.
- `upcoming_havdalah`: The time of havdalah for either the current Shabbat OR Yom Tov, or the immediately upcoming Shabbat OR Yom Tov. If, for example, today is Sunday, and Rosh Hashana is Monday night through Wednesday night, this reports the havdalah for Rosh Hashana on Wednesday night. To always get the Shabbat times, use the `upcoming_shabbat_havdalah` sensor.

### Binary sensors

- `issur_melacha_in_effect`: A boolean sensor indicating if melacha is currently not permitted. The value is _on_ when it is currently Shabbat or Yom Tov and _off_ otherwise.
- `erev_shabbat_hag`: A boolean sensor indicating that there is an upcoming Shabbat or Hag.
- `motzei_shabbat_hag`: A boolean sensor indicating that Shabbat or Hag has ended.

### Holiday sensor

The holiday sensor includes 3 attributes: *type*, *type_id* and *id*.
The *type_id* is useful for cases to condition automations based on a range of types.

The following is the list of holidays the sensor knows about with their selected type:

| ID                   | English                    | Hebrew                | Type                      | Type_ID |
|----------------------|----------------------------|-----------------------|---------------------------|:-------:|
| erev_rosh_hashana    | Erev Rosh Hashana          | ערב ראש השנה          | EREV_YOM_TOV              | 2       |
| rosh_hashana_i       | Rosh Hashana I             | א' ראש השנה           | YOM_TOV                   | 1       |
| rosh_hashana_ii      | Rosh Hashana II            | ב' ראש השנה           | YOM_TOV                   | 1       |
| tzom_gedaliah        | Tzom Gedaliah              | צום גדליה             | FAST_DAY                  | 5       |
| erev_yom_kippur      | Erev Yom Kippur            | עיוה"כ                | EREV_YOM_TOV              | 2       |
| yom_kippur           | Yom Kippur                 | יום הכפורים           | YOM_TOV                   | 1       |
| erev_sukkot          | Erev Sukkot                | ערב סוכות             | EREV_YOM_TOV              | 2       |
| sukkot               | Sukkot                     | סוכות                 | YOM_TOV                   | 1       |
| hol_hamoed_sukkot    | Hol hamoed Sukkot          | חול המועד סוכות       | HOL_HAMOED                | 3       |
| hoshana_raba         | Hoshana Raba               | הושענא רבה            | EREV_YOM_TOV              | 2       |
| simchat_torah        | Simchat Torah              | שמחת תורה             | YOM_TOV                   | 1       |
| chanukah             | Chanukah                   | חנוכה                 | MELACHA_PERMITTED_HOLIDAY | 4       |
| asara_btevet         | Asara B'Tevet              | צום עשרה בטבת         | FAST_DAY                  | 5       |
| tu_bshvat            | Tu B'Shvat                 | ט"ו בשבט              | MINOR_HOLIDAY             | 7       |
| taanit_esther        | Ta'anit Esther             | תענית אסתר            | FAST_DAY                  | 5       |
| purim                | Purim                      | פורים                 | MELACHA_PERMITTED_HOLIDAY | 4       |
| shushan_purim        | Shushan Purim              | שושן פורים            | MELACHA_PERMITTED_HOLIDAY | 4       |
| erev_pesach          | Erev Pesach                | ערב פסח               | EREV_YOM_TOV              | 2       |
| pesach               | Pesach                     | פסח                   | YOM_TOV                   | 1       |
| hol_hamoed_pesach    | Hol hamoed Pesach          | חול המועד פסח         | HOL_HAMOED                | 3       |
| pesach_vii           | Pesach VII                 | שביעי פסח             | YOM_TOV                   | 1       |
| yom_haatzmaut        | Yom HaAtzma'ut             | יום העצמאות           | MODERN_HOLIDAY            | 6       |
| lag_bomer            | Lag B'Omer                 | ל"ג בעומר             | MINOR_HOLIDAY             | 7       |
| erev_shavuot         | Erev Shavuot               | ערב שבועות            | EREV_YOM_TOV              | 2       |
| shavuot              | Shavuot                    | שבועות                | YOM_TOV                   | 1       |
| tzom_tammuz          | Tzom Tammuz                | צום שבעה עשר בתמוז    | FAST_DAY                  | 5       |
| tisha_bav            | Tish'a B'Av                | תשעה באב              | FAST_DAY                  | 5       |
| tu_bav               | Tu B'Av                    | ט"ו באב               | MINOR_HOLIDAY             | 7       |
| yom_hashoah          | Yom HaShoah                | יום השואה             | MEMORIAL_DAY              | 8       |
| yom_hazikaron        | Yom HaZikaron              | יום הזכרון            | MEMORIAL_DAY              | 8       |
| yom_yerushalayim     | Yom Yerushalayim           | יום ירושלים           | MODERN_HOLIDAY            | 6       |
| shmini_atzeret       | Shmini Atzeret             | שמיני עצרת            | YOM_TOV                   | 1       |
| pesach_viii          | Pesach VIII                | אחרון של פסח          | YOM_TOV                   | 1       |
| shavuot_ii           | Shavuot II                 | שני של שבועות         | YOM_TOV                   | 1       |
| sukkot_ii            | Sukkot II                  | שני של סוכות          | YOM_TOV                   | 1       |
| pesach_ii            | Pesach II                  | שני של פסח            | YOM_TOV                   | 1       |
| family_day           | Family Day                 | יום המשפחה            | ISRAEL_NATIONAL_HOLIDAY   | 9       |
| memorial_day_unknown | Memorial day for fallen whose place of burial is unknown | יום הזיכרון לחללי מערכות ישראל שמקום קבורתם לא נודע | MEMORIAL_DAY | 8      |
| rabin_memorial_day   | Yitzhak Rabin memorial day | יום הזכרון ליצחק רבין | MEMORIAL_DAY              | 8       |
| zeev_zhabotinsky_day | Zeev Zhabotinsky day       | יום זאב ז'בוטינסקי    | MEMORIAL_DAY              | 8       |

## Full configuration example

```yaml
# Example configuration.yaml entry
jewish_calendar:
  language: english
  diaspora: true
  havdalah_minutes_after_sunset: 50
```

## Services

The Jewish Calendar integration also includes four services that return Hebrew calendar and Zmanim information about specific day(s).

### Common Attributes

These services return the same fields, based on the following `include_*` attributes. If you set multiple attributes to true, they will return all these fields.  If you leave all of them false, it will only return the Gregorian `date`.

To see which fields are returned, try it out:
{% my developer_call_service badge service="jewish_calendar.get_gregorian_date" %}

| Service data attribute     | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| `include_hebrew_date_info` | True to return Hebrew year, month, day, and related calendar information.     |
| `include_holiday_info`     | True to return information about the holiday that falls on this date, if any. |
| `include_zmanim`           | True to return the day's zmanim timestamps.                                   |

### Service {% my developer_call_service service="jewish_calendar.get_gregorian_date" %}

Return Jewish Calendar information for the specified Gregorian date.

| Service data attribute | Optional | Description                                                                                                                                                                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date`                 | yes      | Look up the specified date or time.  If you pass a date with a time, it will be evaluated relative to sunset, returning the following day if after sunset (not candle lighting). Defaults to today (relative to midnight, not sunset). |

### Service {% my developer_call_service service="jewish_calendar.get_gregorian_date_range" %}

Return Jewish Calendar information for a range of Gregorian dates.

| Service data attribute | Optional | Description                                                                                                                                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `date`                 | yes      | The first day to return.  If you pass a date with a time, it will be evaluated relative to sunset, returning the following day if after sunset (not candle lighting). Defaults to today (relative to midnight, not sunset). |
| `number_of_days`       | no       | The number of days to return, including `date`.                                                                                                                                                                             |

### Service {% my developer_call_service service="jewish_calendar.get_hebrew_date" %}

Return Jewish Calendar information for the specified Hebrew date.

| Service data attribute | Optional | Description                                                                                                                                          |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `year`                 | yes      | The year of the date to return.  Omit this to return the specified date in the current Hebrew year (eg, a Yahrzeit).                                 |
| `month`                | no       | The month of the date to return.  You must specify Adar I or Adar II in case the year is a leap year; in non-leap years, they will both return Adar. |
| `day`                  | no       | The day of month of the date to return.                                                                                                              |

### Service {% my developer_call_service service="jewish_calendar.get_next_holiday" %}

Return Jewish Calendar information for the next holiday on or after a given date, optionally filtered to specific type(s) of holiday.

| Service data attribute | Optional | Description                                                                                                                                                                                                                                  |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date`                 | yes      | Get a holiday the specified date or time.  If you pass a date with a time, it will be evaluated relative to sunset, returning the following day if after sunset (not candle lighting). Defaults to today (relative to midnight, not sunset). |
| `types`                | yes      | The categories of holidays to return, from the `Type` column [above](#holiday-sensor).  If omitted, returns any holiday.                                                                                                                     |

### Service {% my developer_call_service service="jewish_calendar.get_holidays" %}

Return Jewish Calendar information for holiday(s) in a given year.  Exactly one of `types` or `holidays` is required to filter holidays to return.

Note: Unlike the other services, this returns results for multiple days, wrapped in an array named `holidays`.

| Service data attribute | Optional | Description                                                                                               |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `year`                 | yes      | Return holidays in the specified year.  Defaults to the current Hebrew year.                              |
| `types`                | yes      | The categories of holidays to return, from the `Type` column [above](#holiday-sensor).                    |
| `holidays`             | yes      | The name(s) of holidays to return, from the `English` or `Hebrew` names columns [above](#holiday-sensor). |

## Examples

These services are most useful in [template sensors](/integrations/template/#trigger-based-handling-of-service-response-data).  For example:

{% raw %}

```yaml

template:
  # Report a Yahrzeit's date in this year:
  - trigger:
      - platform: state
        entity_id:
          - sensor.jewish_calendar_date
    action:
      - service: jewish_calendar.get_hebrew_date
        data:
          month: Iyyar
          day: 21
        response_variable: date
    sensor:
      - name: Sample Yahrzeit
        unique_id: sample_yahrzeit
        state: "{{ date.date }}"
        attributes:
          device_class: date

  # Report a specific holiday's date in this year:
  - trigger:
      - platform: state
        entity_id:
          - sensor.jewish_calendar_date
    action:
      - service: jewish_calendar.get_holidays
        data:
          holidays:
            - Pesach
        response_variable: results
    sensor:
      - name: First Day of Pesach
        unique_id: first_day_of_pesach
        state: "{{ results.holidays[0].date }}"
        attributes:
          device_class: date

  # Report which holiday is coming this week, if any:
  - trigger:
      - platform: state
        entity_id:
          - sensor.jewish_calendar_upcoming_candle_lighting
    action:
      - service: jewish_calendar.get_gregorian_date
        data:
          date: "{{ states('sensor.jewish_calendar_upcoming_candle_lighting') }}"
          include_holiday_info: true
        response_variable: date
    sensor:
      - name: Upcoming Holiday Name
        unique_id: upcoming_holiday_name
        state: "{{ date.holiday_description }}"
```

{% endraw %}
