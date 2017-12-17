---
layout: page
title: "fail2ban"
description: "Setting up fail2ban to read Home Assistant's log files to improve security."
date: 2017-05-24 10:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Infrastructure
---

This is a quick guide on how to setup fail2ban for Home Assistant. This was originally in the [forum](https://community.home-assistant.io/t/is-there-a-log-file-for-invalid-logins-blocking-hackers/2892) but I created this here for people.

First install `fail2ban`. On Debian/Ubuntu this would be `apt-get install fail2ban`. On other distros you can google it.

Then make sure logging is enabled in your `configuration.yaml` file for your Home Assistant instance:

```yaml
logger:
  default: critical
  logs:
    homeassistant.components.http.ban: warning
```

Next we will be creating these three files :

- `/etc/fail2ban/fail2ban.local`
- `/etc/fail2ban/filter.d/hass.local`
- `/etc/fail2ban/jail.local`

Contents of `/etc/fail2ban/fail2ban.local`:

```text
[Definition]
logtarget = SYSLOG
```

Contents of `/etc/fail2ban/filter.d/hass.local`:

```text
[INCLUDES]
before = common.conf

[Definition]
failregex = ^%(__prefix_line)s.*Login attempt or request with invalid authentication from <HOST>.*$

ignoreregex =
```

Contents of `/etc/fail2ban/jail.local` (Note that you'll need to change the `logpath` to match your logfile which will be different from the path listed.):

```text
[hass-iptables]
enabled = true
filter = hass
action = iptables-allports[name=HASS]
logpath = /home/homeassistant/.homeassistant/home-assistant.log
maxretry = 5
```

Finally restart fail2ban : `sudo systemctl restart fail2ban`

Check your log to make sure it read in your settings : `tail -100 /var/log/syslog|grep fail`

If all is well you should see this from your syslog:

```bash
May 24 20:58:01 homeauto fail2ban.server[14997]: INFO Stopping all jails
May 24 20:58:02 homeauto fail2ban.jail[14997]: INFO Jail 'sshd' stopped
May 24 20:58:02 homeauto fail2ban-client[15206]: Shutdown successful
May 24 20:58:02 homeauto fail2ban.server[14997]: INFO Exiting Fail2ban
May 24 20:58:02 homeauto fail2ban-client[15213]: 2017-05-24 20:58:02,342 fail2ban.server         [15215]: INFO    Starting Fail2ban v0.9.6
May 24 20:58:02 homeauto fail2ban-client[15213]: 2017-05-24 20:58:02,343 fail2ban.server         [15215]: INFO    Starting in daemon mode
May 24 20:58:02 homeauto fail2ban.server[15217]: INFO Changed logging target to SYSLOG (/dev/log) for Fail2ban v0.9.6
May 24 20:58:02 homeauto fail2ban.database[15217]: INFO Connected to fail2ban persistent database '/var/lib/fail2ban/fail2ban.sqlite3'
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Creating new jail 'sshd'
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Jail 'sshd' uses pyinotify {}
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Initiated 'pyinotify' backend
May 24 20:58:02 homeauto fail2ban.actions[15217]: INFO Set banTime = 600
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set findtime = 600
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set maxRetry = 5
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Added logfile = /var/log/auth.log
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set jail log file encoding to UTF-8
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set maxlines = 10
May 24 20:58:02 homeauto fail2ban.server[15217]: INFO Jail sshd is not a JournalFilter instance
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Creating new jail 'hass-iptables'
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Jail 'hass-iptables' uses pyinotify {}
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Initiated 'pyinotify' backend
May 24 20:58:02 homeauto fail2ban.actions[15217]: INFO Set banTime = 600
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set findtime = 600
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set maxRetry = 5
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Added logfile = /opt/hass-prod-cfg/home-assistant.log
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Set jail log file encoding to UTF-8
May 24 20:58:02 homeauto fail2ban.filter[15217]: INFO Date pattern set to `'^%y-%m-%d %H:%M:%S'`: `^Year2-Month-Day 24hour:Minute:Second`
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Jail 'sshd' started
May 24 20:58:02 homeauto fail2ban.jail[15217]: INFO Jail 'hass-iptables' started
```

That's it!


If you want to read more about fail2ban, some links are below:
 - [fail2ban Split config](http://www.fail2ban.org/wiki/index.php/FEATURE_Split_config)
 - [How To Protect SSH with Fail2Ban on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04)
