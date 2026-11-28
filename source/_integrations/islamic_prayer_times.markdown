---
description: Instructions on how to integrate the Islamic Prayer Times integration within Home Assistant.
ha_release: 0.85
ha_domain: islamic_prayer_times
---

The **Islamic Prayer Times** {% term integration %} provides calculated prayer times, a read-only prayer calendar, and sensors for the current and next prayer. You can use these entities to display a daily schedule and create automations at prayer boundaries.

Prayer times are calculated for the location you select during setup. You can add the integration more than once to follow different locations. If you do, give their calendar entities distinct names, such as **Home prayers** and **Office prayers**.

Supported calculation methods include:

- Shia Ithna-Ansari
- Islamic Society of North America
- University of Islamic Sciences, Karachi
- Muslim World League
- Umm Al-Qura University, Makkah
- Egyptian General Authority of Survey
- Institute of Geophysics, University of Tehran
- Gulf Region
- Kuwait
- Qatar
- Majlis Ugama Islam Singapura, Singapore
- Union Organization islamic de France
- Diyanet İşleri Başkanlığı, Turkiye
- Spiritual Administration of Muslims of Russia
- Moonsighting Committee Worldwide

{% include integrations/config_flow.md %}

{% configuration_basic %}
Location:
  description: The location for which to calculate prayer times.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Prayer calculation method:
  description: The method used to calculate prayer start times. The default is **Islamic Society of North America**.
Latitude adjustment method:
  description: How twilight times are adjusted at higher latitudes. Choose **Middle of the night** (the default), **One seventh**, or **Angle based**.
Midnight mode:
  description: Choose **Standard (mid sunset to sunrise)** (the default) or **Jafari (mid sunset to fajr)**. This controls the calculated Midnight time and the first-third and half-night boundaries used by the calendar.
School:
  description: Choose **Shafi** (the default) or **Hanafi** for the Asr calculation. This adjusts Asr's start time; it does not select a complete set of prayer-end conventions.
Isha calendar end:
  description: Choose **First third of the night**, **Half of the night (Islamic Midnight)** (the default), or **Next Fajr**. This applies to the calendar and current-prayer sensors. Individual prayer-time sensor values and rollover are unchanged.
{% endconfiguration_basic %}

## Supported functionality

### Calendar

Each configured location provides one read-only calendar with five prayer windows per calculation day. The calendar calculates the requested dates, so the prayers do not need to be created as recurring events. Events cannot be added, edited, or deleted.

- **Fajr**: From calculated Fajr to sunrise.
- **Dhuhr**: From calculated Dhuhr to Asr.
- **Asr**: From calculated Asr to sunset.
- **Maghrib**: From calculated Maghrib to Isha.
- **Isha**: From calculated Isha to the selected **Isha calendar end**, with the fallbacks described below.

An event includes its start but not its end. For example, at the calculated sunrise, Fajr is no longer active. There is no active prayer between sunrise and Dhuhr. There can also be a gap between sunset and Maghrib if the selected calculation method gives them different times.

Isha can cross civil midnight. When it ends before Fajr, there is a gap until Fajr starts. Choosing **Next Fajr** avoids that gap. For a location in another time zone, check the date as well as the displayed time.

The calendar works even if the individual prayer-time sensors are disabled. You can view its schedule in the calendar dashboard or use its events with [calendar automations](/integrations/calendar/#automation).

#### Isha end and fallback

The **Isha calendar end** option selects the end of Isha for both the calendar and the current-prayer sensors:

- **First third of the night**: The calculator's first-third boundary.
- **Half of the night (Islamic Midnight)**: The calculator's Midnight boundary. This is the default.
- **Next Fajr**: Fajr calculated for the following prayer day.

First-third and half-night boundaries follow the selected **Midnight mode**. Standard uses the night from sunset to sunrise; Jafari uses sunset to Fajr. These are the calculator's existing night boundaries, not civil midnight.

If the selected boundary is at or before Isha starts, the integration uses the following prayer day's calculated Fajr instead. If that is also at or before Isha starts, it shows a ten-minute Isha event with the description "Isha start marker (10-minute display duration)." This marker is for display, not a calculated prayer deadline, and can overlap Fajr.

### Sensors

The integration provides seven individual prayer-time sensors:

- **Fajr prayer**
  - **Description**: Calculated start of Fajr.
- **Sunrise time**
  - **Description**: Calculated sunrise, which ends the Fajr calendar window.
- **Dhuhr prayer**
  - **Description**: Calculated start of Dhuhr.
- **Asr prayer**
  - **Description**: Calculated start of Asr.
- **Maghrib prayer**
  - **Description**: Calculated start of Maghrib.
- **Isha prayer**
  - **Description**: Calculated start of Isha.
- **Midnight time**
  - **Description**: Calculated Islamic Midnight, according to **Midnight mode**.

These sensors switch to the next prayer-day schedule just after calculated Islamic Midnight, not necessarily at 00:00. They can therefore show times from the previous or following civil date. **Midnight time** continues reporting calculated Islamic Midnight regardless of which Isha calendar end you choose.

Five additional sensors use the same prayer windows as the calendar:

- **Current prayer**
  - **Description**: Fajr, Dhuhr, Asr, Maghrib, Isha, or Between prayers.
- **Current prayer started**
  - **Description**: Start timestamp of the active prayer window. Unavailable during gaps.
- **Current prayer ends**
  - **Description**: End timestamp of the active prayer window. Unavailable during gaps.
- **Next prayer**
  - **Description**: Name of the next prayer that has not started.
- **Next prayer starts**
  - **Description**: Start timestamp of that next prayer.

**Next prayer** always means a prayer whose start is still in the future. During Fajr, for example, the next prayer is Dhuhr. During a gap, **Current prayer** shows **Between prayers**, its start and end sensors are unavailable, and the next-prayer sensors still identify the upcoming prayer. If prayer windows overlap, **Current prayer** follows the first active calendar window in start-time order.

For templates and YAML automations, the stored prayer states are `fajr`, `dhuhr`, `asr`, `maghrib`, and `isha`. The stored state for **Between prayers** is `between_prayers`.

The three start/end sensors contain timestamps rather than continuously updated durations. To show elapsed or remaining time, display them as relative times in a dashboard card that supports this, such as an [Entities card](/dashboards/entities/#options-for-entities). **Current prayer started** gives elapsed time; **Current prayer ends** gives time remaining in the active window; **Next prayer starts** gives time until the next prayer.

These sensors work independently of the calendar entity and the individual prayer-time sensors, so those entities can be disabled if you do not need them.

## Using Assist

A conversation agent powered by a large language model with access to Home Assistant's Assist API can use the standard calendar tool to query the prayer calendar. No script or integration-specific tool is needed.

[Expose the calendar entity to Assist](/voice_control/voice_remote_expose_devices/) for each location you want the assistant to access. The individual prayer-time and current/next sensors do not need to be exposed for calendar queries. You can keep them hidden or disabled. To stop access to a location's calendar, remove its exposure to Assist.

For a calendar named **Home prayers**, you could ask your agent, "What is next on the Home prayers calendar?" or "What is on the Home prayers calendar today?"

## Known limitations

The built-in Assist calendar tool offers today and week queries starting at the time of the request. It can return an ongoing prayer window and upcoming events, but not prayer windows that have already ended earlier that day. It returns event start and end times, not precomputed countdowns. To retrieve a full day's schedule, including ended windows, use the calendar dashboard or the [`calendar.get_events` action](/actions/calendar.get_events/) with the desired date range.

At some high-latitude locations, the calculator may not produce distinct sunrise, sunset, or prayer times, even with a latitude adjustment selected. If valid prayer windows cannot be calculated, the calendar and current/next-prayer sensors become unavailable. Calendar queries report a calculation error rather than an empty schedule. The integration does not invent replacement sunrise or sunset times or change your selected calculation method.
