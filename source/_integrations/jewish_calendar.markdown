---
title: Jewish Calendar
description: Instructions on integrating the Jewish Calendar integration within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Calculated
ha_release: 0.79
ha_codeowners:
  - '@tsvi'
ha_domain: jewish_calendar
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The Jewish Calendar {% term integration %} exposes Jewish calendar information through multiple sensors.
{% include integrations/config_flow.md %}

{% configuration_basic %}

Language:
  description: The language to be used for textual sensors in Hebrew (א' תשרי תשע"ט) or English characters (1 Tishrei 5779). Valid options are `english` and `hebrew`. Default value is `english`.

Diaspora:
  description: Consider the location as diaspora (חוץ לארץ) for calculation of the weekly portion and holidays. By default it will consider the location as Israel (One day Yom Tov), setting it to true will show a second day Yom Tov.

Latitude, Longitude, Time Zone and Elevation:
  description: Allows you to override the default location information provided by Home Assistant for the calculations.
{% endconfiguration_basic %}

## Advanced Options

{% configuration_basic %}
Minutes before sunset for candle lighting:
  description: How many minutes before sunset is considered candle-lighting time. In Israel, this is usually 20, 30, or 40 minutes depending on your location. Outside of Israel, it's customary to use either 18 or 24. *The default is set to 18 minutes.*

Minutes after sunset for Havdalah:
  description: By default havdalah time is considered the moment the sun is 8.5 degrees below the horizon. By specifying this offset, havdalah time will be calculated as a static time offset relative to sunset.
{% endconfiguration_basic %}

## Sensor list

### Data sensors

- `date`: Shows the hebrew date for today.
- `parshat_hashavua`: Shows the weekly portion (parshat hashavu'a - פרשת השבוע)
- `holiday`: If it is a holiday, shows the name of the holiday _(see below for more info)_.
- `day_of_the_omer`: An integer sensor indicating the day of the Omer (1-49) or 0 if it is not currently the Omer.
- `daf_yomi`: Shows the date's daf yomi page.

### Time sensors

*Note: Due to the variety of rabbinic opinions on calculating the different times, we do not take any responsibility for your religious reliance upon these calculations.*

Time sensor states are represented as ISO8601 formatted *UTC time*.

- `alot_hashachar`: First light of dawn (Alot Hashachar - עלות השחר)
- `talit_and_tefillin`: Earliest time for tallit and tefillin (Misheyakir - משיכיר)
- `hanetz_hachama`: Earliest time for Shacharit (Hanetz Hachama - הנץ החמה)
- `latest_time_for_shma_gr_a`: Last time for the reading of the Shma according to the Gr"a.
- `latest_time_for_shma_mg_a`: Last time for the reading of the Shma according to the MG"A.
- `latest_time_for_tefilla_gr_a`: Last time for full shacharit according to the Gr"a.
- `latest_time_for_tefilla_mg_a`: Last time for full shacharit according to the MG"A.
- `chatzot_hayom`: Half way through the day (Chatzot Hayom - חצות היום)
- `mincha_gedola`: Earliest time for Mincha (Mincha Gedola - מנחה גדולה)
- `mincha_ketana`: Preferable earliest time for Mincha (Mincha Ketana - מנחה קטנה)
- `plag_hamincha`: Time of the Plag Hamincha (פלג המנחה)
- `shkia`: Sunset (Shkiya - שקיעה)
- `t_set_hakochavim`: Time at which the first stars are visible (Tseit Hakochavim - צאת הכוכבים)
- `t_set_hakochavim_3_stars`: Time at which 3 stars are visible, mostly used for Havdalah
- `upcoming_shabbat_candle_lighting`: The time of candle lighting for either the current Shabbat (if it is currently Shabbat) or the immediately upcoming Shabbat.
- `upcoming_shabbat_havdalah`: The time of havdalah for either the current Shabbat (if it is currently Shabbat) or the immediately upcoming Shabbat. If it is currently a three-day holiday, this value *could* be None (i.e., if a holiday is Sat./Sun./Mon. and it's Saturday, there will be no `shabbat_havdalah` value. See comments in hdate library for details.)
- `upcoming_candle_lighting`: The time of candle lighting for either the current Shabbat OR Yom Tov, or the immediately upcoming Shabbat OR Yom Tov. If, for example, today is Sunday, and Rosh Hashana is Monday night through Wednesday night, this reports the candle lighting for Rosh Hashana on Monday night. This avoids a situation of triggering pre-candle-lighting automations while it is currently Yom Tov. To always get the Shabbat times, use the `upcoming_shabbat_candle_lighting` sensor.
- `upcoming_havdalah`: The time of havdalah for either the current Shabbat OR Yom Tov, or the immediately upcoming Shabbat OR Yom Tov. If, for example, today is Sunday, and Rosh Hashana is Monday night through Wednesday night, this reports the havdalah for Rosh Hashana on Wednesday night. To always get the Shabbat times, use the `upcoming_shabbat_havdalah` sensor.

### Binary sensors

- `issur_melacha_in_effect`: A boolean sensor indicating if melacha is currently not permitted. The value is _on_ when it is currently Shabbat or Yom Tov and _off_ otherwise.
- `erev_shabbat_hag`: A boolean sensor indicating that there is an upcoming Shabbat or Hag.
- `motzei_shabbat_hag`: A boolean sensor indicating that Shabbat or Hag has ended.

### Holiday sensor

The holiday sensor includes 2 attributes: *type*, and *id*.

The *id* is useful for automations so they're not language-dependent.

On Rosh Chodesh Tevet, which always falls on Chanukah, the sensor will report both values: "Rosh Chodesh, Chanukah".

In Israel, on the 30th of Shvat, the sensor will report: "Rosh Chodesh, Family day". On the 22nd of Tishrei it will report: "Shmini Atzeret, Simchat Torah".

The following is the list of holidays the sensor knows about with their selected type:

| ID                   | English                    | Hebrew                | Type                      |
|----------------------|----------------------------|-----------------------|---------------------------|
| erev_rosh_hashana    | Erev Rosh Hashana          | ערב ראש השנה          | EREV_YOM_TOV              |
| rosh_hashana_i       | Rosh Hashana I             | א' ראש השנה           | YOM_TOV                   |
| rosh_hashana_ii      | Rosh Hashana II            | ב' ראש השנה           | YOM_TOV                   |
| tzom_gedaliah        | Tzom Gedaliah              | צום גדליה             | FAST_DAY                  |
| erev_yom_kippur      | Erev Yom Kippur            | עיוה"כ                | EREV_YOM_TOV              |
| yom_kippur           | Yom Kippur                 | יום הכפורים           | YOM_TOV                   |
| erev_sukkot          | Erev Sukkot                | ערב סוכות             | EREV_YOM_TOV              |
| sukkot               | Sukkot                     | סוכות                 | YOM_TOV                   |
| sukkot_ii            | Sukkot II                  | שני של סוכות          | YOM_TOV                   |
| hol_hamoed_sukkot    | Hol hamoed Sukkot          | חול המועד סוכות       | HOL_HAMOED                |
| hoshana_raba         | Hoshana Raba               | הושענא רבה            | EREV_YOM_TOV              |
| shmini_atzeret       | Shmini Atzeret             | שמיני עצרת            | YOM_TOV                   |
| simchat_torah        | Simchat Torah              | שמחת תורה             | YOM_TOV                   |
| chanukah             | Chanukah                   | חנוכה                 | MELACHA_PERMITTED_HOLIDAY |
| rabin_memorial_day   | Yitzhak Rabin memorial day | יום הזכרון ליצחק רבין | MEMORIAL_DAY              |
| asara_btevet         | Asara B'Tevet              | צום עשרה בטבת         | FAST_DAY                  |
| tu_bshvat            | Tu B'Shvat                 | ט"ו בשבט              | MINOR_HOLIDAY             |
| family_day           | Family Day                 | יום המשפחה            | ISRAEL_NATIONAL_HOLIDAY   |
| memorial_day_unknown | Memorial day for fallen whose place of burial is unknown | יום הזיכרון לחללי מערכות ישראל שמקום קבורתם לא נודע | MEMORIAL_DAY |
| taanit_esther        | Ta'anit Esther             | תענית אסתר            | FAST_DAY                  |
| purim                | Purim                      | פורים                 | MELACHA_PERMITTED_HOLIDAY |
| shushan_purim        | Shushan Purim              | שושן פורים            | MELACHA_PERMITTED_HOLIDAY |
| erev_pesach          | Erev Pesach                | ערב פסח               | EREV_YOM_TOV              |
| pesach               | Pesach                     | פסח                   | YOM_TOV                   |
| pesach_ii            | Pesach II                  | שני של פסח            | YOM_TOV                   |
| hol_hamoed_pesach    | Hol hamoed Pesach          | חול המועד פסח         | HOL_HAMOED                |
| pesach_vii           | Pesach VII                 | שביעי פסח             | YOM_TOV                   |
| pesach_viii          | Pesach VIII                | אחרון של פסח          | YOM_TOV                   |
| yom_hashoah          | Yom HaShoah                | יום השואה             | MEMORIAL_DAY              |
| yom_hazikaron        | Yom HaZikaron              | יום הזכרון            | MEMORIAL_DAY              |
| yom_haatzmaut        | Yom HaAtzma'ut             | יום העצמאות           | MODERN_HOLIDAY            |
| lag_bomer            | Lag B'Omer                 | ל"ג בעומר             | MINOR_HOLIDAY             |
| yom_yerushalayim     | Yom Yerushalayim           | יום ירושלים           | MODERN_HOLIDAY            |
| erev_shavuot         | Erev Shavuot               | ערב שבועות            | EREV_YOM_TOV              |
| shavuot              | Shavuot                    | שבועות                | YOM_TOV                   |
| shavuot_ii           | Shavuot II                 | שני של שבועות         | YOM_TOV                   |
| tzom_tammuz          | Tzom Tammuz                | צום שבעה עשר בתמוז    | FAST_DAY                  |
| zeev_zhabotinsky_day | Zeev Zhabotinsky day       | יום זאב ז'בוטינסקי    | MEMORIAL_DAY              |
| tisha_bav            | Tish'a B'Av                | תשעה באב              | FAST_DAY                  |
| tu_bav               | Tu B'Av                    | ט"ו באב               | MINOR_HOLIDAY             |
| rosh_chodesh         | Rosh Chodesh               | ראש חודש              | ROSH_CHODESH              |

## Actions

Available {% term actions %}:

- `jewish_calendar.count_omer`

### Action Count the Omer

The `jewish_calendar.count_omer` action returns the phrase for counting the Omer for a given date.

| Data attribute | Optional | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `date`         | yes    | Date for which to get the Omer blessing. Defaults to today. |
| `after_sunset` | yes  | If true and a date is provided, calculates the Omer count based on the Hebrew date, which starts after sunset. Ignored if no date is specified. Defaults to true. |
| `nusach`       | no     | Nusach (tradition) of the Omer blessing. |
| `language`     | yes    | Language to return. Defaults to Hebrew. |

If there's no Omer count on the given day, the message will be empty.
Supported nusachim are: Ashkenaz, Sfarad, Adot Mizrah and Italian.

#### Example

```yaml
action: jewish_calendar.count_omer
data:
  nusach: sfarad
  date: "2025-05-20"       # optional; defaults to today
  language: en             # optional; defaults to Hebrew
  after_sunset: true       # optional; defaults to true
```

Will return the following:

```yaml
message: Today is the thirty-seventh day, which are five weeks and two days of the Omer
weeks: 5
days: 2
total_days: 37
```

#### Minimal call

```yaml
action: jewish_calendar.count_omer
data:
  nusach: sfarad
```

Will return the current text in Hebrew based on the Hebrew date, considering the current time relative to sunset.

```yaml
message: היום ארבעה עשר יום שהם שני שבועות לעומר
weeks: 2
days: 0
total_days: 14
```
