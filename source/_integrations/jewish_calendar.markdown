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
  - sensor
ha_integration_type: integration
ha_config_flow: true
---

The Jewish Calendar (`jewish_calendar`) {% term integration %} displays various information related to the Jewish Calendar as various sensors.
{% include integrations/config_flow.md %}


### Language

Default: English
Whether to represent the sensors in Hebrew (א' תשרי תשע"ט) or English characters (1 Tishrei 5779). Valid options are 'english' and 'hebrew'.

### Diaspora

Default: False
Consider the location as diaspora (חוץ לארץ) for calculation of the weekly portion and holidays. By default it will consider the location as Israel (One day Yom Tov), setting it to true will show a second day Yom Tov.

### Minutes before sunset for candle lighting

Default: 18 minutes
This defines how many minutes before sunset is considered candle-lighting time. In Israel, this is usually 20/30/40 depending on your location. Outside of Israel, you probably want to use 18/24.

### Minutes after sunset for Havdalah

By default havdalah time is considered the moment the sun is 8.5 degrees below the horizon. By specifying this offset, havdalah time will be calculated as a static offset pas the time of sunset.

### Latitude, Longitude, Time Zone and Elevation

Allows you to override the default location information provided by Home Assistant for the calculations.

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
- `upcoming_shabbat_candle_lighting`: The time of candle lighting for either the current Shabbat (if it is currently Shabbat) or the immediately upcoming Shabbat.
- `upcoming_shabbat_havdalah`: The time of havdalah for either the current Shabbat (if it is currently Shabbat) or the immediately upcoming Shabbat. If it is currently a three-day holiday, this value *could* be None (i.e., if a holiday is Sat./Sun./Mon. and it's Saturday, there will be no `shabbat_havdalah` value. See comments in hdate library for details.)
- `upcoming_candle_lighting`: The time of candle lighting for either the current Shabbat OR Yom Tov, or the immediately upcoming Shabbat OR Yom Tov. If, for example, today is Sunday, and Rosh Hashana is Monday night through Wednesday night, this reports the candle lighting for Rosh Hashana on Monday night. This avoids a situation of triggering pre-candle-lighting automations while it is currently Yom Tov. To always get the Shabbat times, use the `upcoming_shabbat_candle_lighting` sensor.
- `upcoming_havdalah`: The time of havdalah for either the current Shabbat OR Yom Tov, or the immediately upcoming Shabbat OR Yom Tov. If, for example, today is Sunday, and Rosh Hashana is Monday night through Wednesday night, this reports the havdalah for Rosh Hashana on Wednesday night. To always get the Shabbat times, use the `upcoming_shabbat_havdalah` sensor.

### Binary sensors

- `issur_melacha_in_effect`: A boolean sensor indicating if melacha is currently not permitted. The value is _on_ when it is currently Shabbat or Yom Tov and _off_ otherwise.
- `erev_shabbat_hag`: A boolean sensor indicating that there is an upcoming Shabbat or Hag.
- `motzei_shabbat_hag`: A boolean sensor indicating that Shabbat or Hag has ended.

### Holiday sensor

The holiday sensor includes 3 attributes: *type*, *type_id*, and *id*.
The *type_id* is useful for cases to condition automations based on a range of types.

On Rosh Chodesh Tevet, which always falls on Chanukah, the sensor will report both values: "Rosh Chodesh, Chanukah".

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
| sukkot_ii            | Sukkot II                  | שני של סוכות          | YOM_TOV                   | 1       |
| hol_hamoed_sukkot    | Hol hamoed Sukkot          | חול המועד סוכות       | HOL_HAMOED                | 3       |
| hoshana_raba         | Hoshana Raba               | הושענא רבה            | EREV_YOM_TOV              | 2       |
| shmini_atzeret       | Shmini Atzeret             | שמיני עצרת            | YOM_TOV                   | 1       |
| simchat_torah        | Simchat Torah              | שמחת תורה             | YOM_TOV                   | 1       |
| chanukah             | Chanukah                   | חנוכה                 | MELACHA_PERMITTED_HOLIDAY | 4       |
| rabin_memorial_day   | Yitzhak Rabin memorial day | יום הזכרון ליצחק רבין | MEMORIAL_DAY              | 8       |
| asara_btevet         | Asara B'Tevet              | צום עשרה בטבת         | FAST_DAY                  | 5       |
| tu_bshvat            | Tu B'Shvat                 | ט"ו בשבט              | MINOR_HOLIDAY             | 7       |
| family_day           | Family Day                 | יום המשפחה            | ISRAEL_NATIONAL_HOLIDAY   | 9       |
| memorial_day_unknown | Memorial day for fallen whose place of burial is unknown | יום הזיכרון לחללי מערכות ישראל שמקום קבורתם לא נודע | MEMORIAL_DAY | 8      |
| taanit_esther        | Ta'anit Esther             | תענית אסתר            | FAST_DAY                  | 5       |
| purim                | Purim                      | פורים                 | MELACHA_PERMITTED_HOLIDAY | 4       |
| shushan_purim        | Shushan Purim              | שושן פורים            | MELACHA_PERMITTED_HOLIDAY | 4       |
| erev_pesach          | Erev Pesach                | ערב פסח               | EREV_YOM_TOV              | 2       |
| pesach               | Pesach                     | פסח                   | YOM_TOV                   | 1       |
| pesach_ii            | Pesach II                  | שני של פסח            | YOM_TOV                   | 1       |
| hol_hamoed_pesach    | Hol hamoed Pesach          | חול המועד פסח         | HOL_HAMOED                | 3       |
| pesach_vii           | Pesach VII                 | שביעי פסח             | YOM_TOV                   | 1       |
| pesach_viii          | Pesach VIII                | אחרון של פסח          | YOM_TOV                   | 1       |
| yom_hashoah          | Yom HaShoah                | יום השואה             | MEMORIAL_DAY              | 8       |
| yom_hazikaron        | Yom HaZikaron              | יום הזכרון            | MEMORIAL_DAY              | 8       |
| yom_haatzmaut        | Yom HaAtzma'ut             | יום העצמאות           | MODERN_HOLIDAY            | 6       |
| lag_bomer            | Lag B'Omer                 | ל"ג בעומר             | MINOR_HOLIDAY             | 7       |
| yom_yerushalayim     | Yom Yerushalayim           | יום ירושלים           | MODERN_HOLIDAY            | 6       |
| erev_shavuot         | Erev Shavuot               | ערב שבועות            | EREV_YOM_TOV              | 2       |
| shavuot              | Shavuot                    | שבועות                | YOM_TOV                   | 1       |
| shavuot_ii           | Shavuot II                 | שני של שבועות         | YOM_TOV                   | 1       |
| tzom_tammuz          | Tzom Tammuz                | צום שבעה עשר בתמוז    | FAST_DAY                  | 5       |
| zeev_zhabotinsky_day | Zeev Zhabotinsky day       | יום זאב ז'בוטינסקי    | MEMORIAL_DAY              | 8       |
| tisha_bav            | Tish'a B'Av                | תשעה באב              | FAST_DAY                  | 5       |
| tu_bav               | Tu B'Av                    | ט"ו באב               | MINOR_HOLIDAY             | 7       |
| rosh_chodesh         | Rosh Chodesh               | ראש חודש              | ROSH_CHODESH              | 10      |
