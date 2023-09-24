---
title: "UTC & Time zone awareness"
description: "The Home Assistant core now uses UTC as the internal date time."
date: 2015-05-09 23:08 0000
date_formatted: "May 9, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

I have recently merged code to refactor Home Assistant to use only UTC times internally. A much needed refactor. I've added some extra test coverage to time sensitive parts to ensure stability. The code has been live in the dev branch for the last 9 days and will be soon released to the master branch.

From now on all internal communication will be done in UTC: time changed events, datetime attributes of states, etc. To get the current time in UTC you can call `homeassistant.util.dt.utcnow()`. This is a timezone aware UTC datetime object. [`homeassistant.util.dt`](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/util/dt.py) is a new util package with date helpers.

There is also such a thing as local time. Local time is based on the time zone that you have setup in your `configuration.yaml`. Local times should only be used for user facing information: logs, frontend and automation settings in `configuration.yaml`.

### Setting up your time zone
Setting up a time zone happens in `configuration.yaml`. If you have no time zone setup, it will be auto detected using the existing detection code using [freegeoip.net](https://freegeoip.net). You can find a list of compatible time zones on [Wikipedia](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```yaml
homeassistant:
  time_zone: America/Los_Angeles
```

### Compatibility
The changes to the code are mostly backwards compatible. The old `hass.track_time_change` and `hass.track_point_in_time` use now internally two new methods: `hass.track_utc_time_change` and `hass.track_point_in_utc_time`. The usage of the old methods have not changed and should be backwards compatible.

This refactor adds a new migration for the database adding a `utc_offset` column to events and states. This information is currently not used but can prove useful in the future when we start analyzing the historical data.

### Backwards incompatible stuff

All built-in components have been upgraded. The following list is only for people that run custom components:

- `hass.track_time_change` and `hass.track_point_in_time` will now return a time zone aware datetime object. Python does not allow comparing a naive with an aware datetime object.
- the sun attributes for rising and setting are now in UTC. The methods `sun.next_rising(hass)` and `sun.next_setting(hass)` are backwards compatible, just be careful if you used to read the raw attributes.
- the API sends all times in UTC. If you use anything else besides the frontend to talk to HA, make sure it handles it differently.
