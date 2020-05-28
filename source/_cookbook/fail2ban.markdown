---
title: "fail2ban"
description: "Setting up fail2ban to read Home Assistant's log files to improve security."
ha_category: Infrastructure
---

This is a quick guide on how to set up `fail2ban` for Home Assistant. Contains extracts from [Is there a log file for invalid logins? \(Blocking hackers\)](https://community.home-assistant.io/t/is-there-a-log-file-for-invalid-logins-blocking-hackers/2892).

## Installing fail2ban

Debian/Ubuntu:

```bash
sudo apt-get install fail2ban
```

CentOS/RHEL:

```bash
sudo yum install epel-release
sudo yum install -y fail2ban
```
Fedora:

```bash
sudo dnf install -y fail2ban
```

For other package managers use the appropriate commands.

## Enable Home Assistant Logging

First, enable `http.ban` logging in `configuration.yaml` file for your Home Assistant instance:

```yaml
logger:
  default: critical
  logs:
    homeassistant.components.http.ban: warning
```

Restart Home Assistant to activate the changes:

```bash
sudo systemctl restart home-assistant
```

Tail the Home Assistant log then log out of the Home Assistant web interface and attempt logging in with an incorrect password, look for a line like `Login attempt or request with invalid authentication from xxx.xxx.xxx.xxx`:

```bash
$ tail -f /home/homeassistant/.homeassistant/home-assistant.log | grep WARNING
2018-08-29 14:28:15 WARNING (MainThread) [homeassistant.components.http.ban] Login attempt or request with invalid authentication from xxx.xxx.xxx.xxx
```

## Configure fail2ban

Next we will create a filter and jail file for `fail2ban`:

- `/etc/fail2ban/filter.d/ha.conf`
- `/etc/fail2ban/jail.d/ha.conf`

Contents of `/etc/fail2ban/filter.d/ha.conf`:

```ini
[INCLUDES]
before = common.conf

[Definition]
failregex = ^%(__prefix_line)s.*Login attempt or request with invalid authentication from <HOST>.*$
ignoreregex =
```

Contents of `/etc/fail2ban/jail.d/ha.conf`. Note that you'll need to change the `logpath` to match your logfile which will be different from the path listed.:

```ini
[DEFAULT]
# Email config
sender = email@address.com
destemail = email@address.com

# Action "%(action_mwl)s" will ban the IP and send an email notification including whois data and log entries.
action = %(action_mwl)s

[ha]
enabled = true
filter = ha
logpath = /home/homeassistant/.homeassistant/home-assistant.log

# 3600 seconds = 1 hour
bantime = 30 # during testing it is useful to have a short ban interval, change this to 3600 later

# Maximum amount of login attempts before IP is blocked
maxretry = 3
```

Restart `fail2ban`:

```bash
sudo systemctl restart fail2ban
```

Confirm `fail2ban` is running:

```bash
sudo systemctl status fail2ban
```

Check that the ha jail is active:

```bash
sudo fail2ban-client status
Status
|- Number of jail:	1
`- Jail list:	ha
```

## Testing fail2ban

Tail the fail2ban log file then log out of the Home Assistant web interface and attempt to log in again with an incorrect password.
```bash
sudo tail -f -n 20 /var/log/fail2ban.log
2018-08-29 13:25:37,907 fail2ban.server         [10208]: INFO    Starting Fail2ban v0.10.3.fix1
2018-08-29 13:25:37,916 fail2ban.database       [10208]: INFO    Connected to fail2ban persistent database '/var/lib/fail2ban/fail2ban.sqlite3'
2018-08-29 13:25:37,918 fail2ban.jail           [10208]: INFO    Creating new jail 'ha'
2018-08-29 13:25:37,922 fail2ban.jail           [10208]: INFO    Jail 'ha' uses poller {}
2018-08-29 13:25:37,922 fail2ban.jail           [10208]: INFO    Initiated 'polling' backend
2018-08-29 13:25:37,932 fail2ban.filter         [10208]: INFO    Added logfile: '/home/homeassistant/.homeassistant/home-assistant.log' (pos = 5873, hash = 02ec3aefc005465a6cd8db91eff2d5e57c45757e)
2018-08-29 13:25:37,932 fail2ban.filter         [10208]: INFO      encoding: UTF-8
2018-08-29 13:25:37,933 fail2ban.filter         [10208]: INFO      maxRetry: 3
2018-08-29 13:25:37,934 fail2ban.filter         [10208]: INFO      findtime: 600
2018-08-29 13:25:37,934 fail2ban.actions        [10208]: INFO      banTime: 30
2018-08-29 13:25:37,938 fail2ban.jail           [10208]: INFO    Jail 'ha' started
2018-08-29 13:27:49,125 fail2ban.filter         [10208]: INFO    [ha] Found xxx.xxx.xxx.xxx - 2018-08-29 13:27:48
2018-08-29 13:27:51,330 fail2ban.filter         [10208]: INFO    [ha] Found xxx.xxx.xxx.xxx - 2018-08-29 13:27:51
2018-08-29 13:27:52,533 fail2ban.filter         [10208]: INFO    [ha] Found xxx.xxx.xxx.xxx - 2018-08-29 13:27:52
2018-08-29 13:27:52,678 fail2ban.actions        [10208]: NOTICE  [ha] Ban xxx.xxx.xxx.xxx
2018-08-29 13:28:23,941 fail2ban.actions        [10208]: NOTICE  [ha] Unban xxx.xxx.xxx.xxx
```

Now that fail2ban is working it can be enabled for startup at boot time, also raise the bantime from 30 seconds to what ever you would like. 8 hours is 28800 seconds.

```bash
sudo sed -i 's/bantime = 30/bantime = 28800/g' /etc/fail2ban/jail.d/ha.conf
sudo systemctl enable fail2ban
sudo systemctl restart fail2ban
```

A final note, if you need to unban an IP it can be done with `fail2ban-client`:

```bash
sudo fail2ban-client set JAILNAME unbanip IPADDRESS
```
eg:

```bash
sudo fail2ban-client set ha unbanip xxx.xxx.xxx.xxx
```

Fail2ban should now be configured and running, if an IP address is banned you will receive an email with WHOIS details about the IP address that attempted to connect, if not you will need configure Postfix or another MTA (Mail Transport Agent).

If you want to read more about `fail2ban`, some links are below:

 - [fail2ban Split configuration](http://www.fail2ban.org/wiki/index.php/FEATURE_Split_config)
 - [How To Protect SSH with Fail2Ban on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04)
