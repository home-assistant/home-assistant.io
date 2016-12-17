---
layout: page
title: "HAPush"
description: "HAPush"
release_date: 2016-11-13 15:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
---

# Installing hapush (Manual install only)

This is not necessary if you are using Docker as it is already installed. 

When you have the dashboard correctly displaying and interacting with Home Assistant you are ready to install the final component - `hapush`. Without `hapush` the dashboard would not respond to events that happen outside of the hadashboard system. For instance, if someone uses the Home Assistant interface to turn on a light, or even another App or physical switch, there is no way for the Dashboard to reflect this change. This is where `hapush` comes in.

`hapush` is a python daemon that listens to Home Assistant's Event Stream and pushes changes back to the dashboard to update it in real time. You may want to create a [Virtual Environment](https://docs.python.org/3/library/venv.html) for hapush - at the time of writing there is a conflict in the Event Source versions in use between HA and hapush.

Before running `hapush` you will need to add some python prerequisites:

```bash
$ sudo pip3 install daemonize
$ sudo pip3 install sseclient
$ sudo pip3 install configobj
```

Some users are reporting errors with `InsecureRequestWarning`:

```
Traceback (most recent call last):
  File "./hapush.py", line 21, in <module>
    from requests.packages.urllib3.exceptions import InsecureRequestWarning
ImportError: cannot import name 'InsecureRequestWarning'
```

This can be fixed with:

```bash
$ sudo pip3 install --upgrade requests
```

## {% linkable_title Configuring hapush (all installation methods) %}

When you have all the prereqs in place, copy the hapush.cfg.example file to hapush.cfg then edit it to reflect your environment:

```
ha_url = "http://192.168.1.10:8123"
ha_key = api_key
dash_host = "192.168.1.10:3030"
dash_dir = "/srv/hass/src/hadashboard/dashboards"
logfile = "/etc/hapush/hapush.log"
```

- `ha_url` is a reference to your home assistant installation and must include the correct port number and scheme (`http://` or `https://` as appropriate)
- `ha_key` should be set to your key if you have one, otherwise it can be removed.
- `dash_host` should be set to the IP address and port of the host you are running Dashing on (no http or https) - this should be the same machine as you are running `hapush` on.
- `dash_dir` is the path on the machine that stores your dashboards. This will be the subdirectory `dashboards` relative to the path you cloned `hadashboard` to. For Docker installs this should be set to `/app/dashboards`
- `logfile` is the path to where you want `hapush` to keep its logs. When run from the command line this is not used - log messages come out on the terminal. When running as a daemon this is where the log information will go. In the example above I created a directory specifically for hapush to run from, although there is no reason you can't keep it in the `hapush` subdirectory of the cloned repository. For Docker installs this should be set to `/app/hapush/hapush.log`

## {% linkable_title Running hapush %}

For a manual installation you can then run hapush from the command line as follows:

```bash
$ ./hapush.py hapush.cfg
```

For docker installs, hapush will be started automatically when you run the startup command.

If all is well, you should start to see `hapush` responding to events as they occur. For a docker installation you should see these messages in `hapush/hapush.log`.

```bash
2016-06-19 10:05:59,693 INFO Reading dashboard: /srv/hass/src/hadashboard/dashboards/main.erb
2016-06-19 10:06:12,362 INFO switch.wendy_bedside -> state = on, brightness = 50
2016-06-19 10:06:13,334 INFO switch.andrew_bedside -> state = on, brightness = 50
2016-06-19 10:06:13,910 INFO script.night -> Night
2016-06-19 10:06:13,935 INFO script.night_quiet -> Night
2016-06-19 10:06:13,959 INFO script.day -> Night
2016-06-19 10:06:13,984 INFO script.evening -> Night
2016-06-19 10:06:14,008 INFO input_select.house_mode -> Night
2016-06-19 10:06:14,038 INFO script.morning -> Night
2016-06-19 10:06:21,624 INFO script.night -> Day
2016-06-19 10:06:21,649 INFO script.night_quiet -> Day
2016-06-19 10:06:21,674 INFO script.day -> Day
2016-06-19 10:06:21,698 INFO script.evening -> Day
2016-06-19 10:06:21,724 INFO input_select.house_mode -> Day
2016-06-19 10:06:21,748 INFO script.morning -> Day
2016-06-19 10:06:31,084 INFO switch.andrew_bedside -> state = off, brightness = 30
2016-06-19 10:06:32,501 INFO switch.wendy_bedside -> state = off, brightness = 30
2016-06-19 10:06:52,280 INFO sensor.side_multisensor_luminance_25 -> 871.0
2016-06-19 10:07:50,574 INFO sensor.side_temp_corrected -> 70.7
2016-06-19 10:07:51,478 INFO sensor.side_multisensor_relative_humidity_25 -> 52.0
```
