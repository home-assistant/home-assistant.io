---
title: Fail2Ban
description: Instructions on how to integrate a fail2ban sensor into Home Assistant.
ha_category:
  - Network
ha_iot_class: Local Polling
ha_release: 0.57
ha_domain: fail2ban
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `fail2ban` {% term integration %} allows for IPs banned by [fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) to be displayed in the Home Assistant frontend.

{% important %}

Your system must have `fail2ban` installed and correctly configured for this sensor to work. In addition, Home Assistant must be able to read the `fail2ban` log file.

{% endimportant %}

## Configuration

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fail2ban
    jails:
      - ssh
      - hass-iptables
```

{% configuration %}
jails:
  description: List of configured jails you want to display.
  required: true
  type: list
name:
  description: Name of the sensor.
  required: false
  type: string
  default: fail2ban
file_path:
  description: Path to the fail2ban log.
  required: false
  type: string
  default: /var/log/fail2ban.log
{% endconfiguration %}

### Fail2Ban with Docker

{% important %}

These steps assume you already have the Home Assistant Docker running behind NGINX and that it is externally accessible. It also assumes the Docker is running with the `--net='host'` flag.

{% endimportant %}

For those of us using Docker, the above tutorial may not be sufficient. The following steps specifically outline how to set up `fail2ban` and Home Assistant when running Home Assistant within a Docker behind NGINX. The setup this was tested on was an unRAID server using the [SWAG](https://github.com/linuxserver/docker-swag) from linuxserver.io.

#### Set HTTP logger

In your {% term "`configuration.yaml`" %} file, add the following to the `logger` integration to ensure that Home Assistant prints failed login attempts to the log.

```yaml
logger:
  logs:
    homeassistant.components.http.ban: warning
```

#### Edit the `jail.local` file

Next, we need to edit the `jail.local` file that is included with the Let's Encrypt Docker linked above.  Note, for this tutorial, we'll only be implementing the `[hass-iptables]` jail.

Edit `/mnt/user/appdata/letsencrypt/fail2ban/jail.local` and append the following to the end of the file:

```txt
[hass-iptables]
enabled = true
filter = hass
action = iptables-allports[name=HASS]
logpath = /hass/home-assistant.log
maxretry = 5
```

#### Create a filter for the Home Assistant jail

Now we need to create a filter for `fail2ban` so that it can properly parse the log.  This is done with a `failregex`.  Create a file called `hass.local` within the `filter.d` directory in `/mnt/user/appdata/letsencrypt/fail2ban` and add the following:

```txt
[INCLUDES]
before = common.conf

[Definition]
failregex = ^%(__prefix_line)s.*Login attempt or request with invalid authentication from <HOST>.*$

ignoreregex =

[Init]
datepattern = ^%%Y-%%m-%%d %%H:%%M:%%S
```

#### Map log file directories

First, we need to make sure that fail2ban log can be passed to Home Assistant and that the Home Assistant log can be passed to fail2ban.  When starting the Let's Encrypt Docker, you need to add the following argument (adjust paths based on your setup):

```txt
/mnt/user/appdata/home-assistant:/hass
```

This will map the Home Assistant configuration directory to the Let's Encrypt Docker, allowing `fail2ban` to parse the log for failed login attempts.

Now do the same for the Home Assistant Docker, but this time we'll be mapping the `fail2ban` log directory to Home Assistant so that the fail2ban sensor is able to read that log:

```txt
/mnt/user/appdata/letsencrypt/log/fail2ban:/fail2ban
```


#### Send client IP to Home Assistant

By default, the IP address that Home Assistant sees will be that of the container (something like `172.17.0.16`).  What this means is that for any failed login attempt, assuming you have correctly configured `fail2ban`, the Docker IP will be logged as banned, but the originating IP is still allowed to make attempts.  We need `fail2ban` to recognize the originating IP to properly ban it.

First, we have to add the following to the NGINX configuration file located in `/mnt/user/appdata/letsencrypt/nginx/site-confs/default`.

```bash
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

This snippet should be added within your Home Assistant configuration, so you have something like the following:

```bash
server {
    ...
    location / {
        proxy_pass http://192.168.0.100:8123;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/websocket {
        proxy_pass http://192.168.0.100:8123/api/websocket;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    ...
}
```

Once that's added to the NGINX configuration, we need to modify the Home Assistant {% term "`configuration.yaml`" %} such that the `X-Forwarded-For` header can be parsed. This is done by adding the following to the `http` integration:

```yaml
http:
  use_x_forwarded_for: true
```

At this point, once the Let's Encrypt and Home Assistant dockers are restarted, Home Assistant should be correctly logging the originating IP of any failed login attempt.  Once that's done and verified, we can move onto the final step.

#### Add the fail2ban sensor

Now that we've correctly set everything up for Docker, we can add our sensors to {% term "`configuration.yaml`" %} with the following:

```yaml
sensor:
  - platform: fail2ban
    jails:
      - hass-iptables
    file_path: /fail2ban/fail2ban.log
```

Assuming you've followed all of the steps, you should have one fail2ban sensor, `sensor.fail2ban_hassiptables`, within your front-end.

### Other debug tips

If, after following these steps, you're unable to get the `fail2ban` sensor working, here are some other steps you can take that may help:

- Add `logencoding = utf-8` to the `[hass-iptables]` entry
- Ensure the `failregex` you added to `filter.d/hass.local` matches the output within `home-assistant.log`
- Try changing the datepattern in `filter.d/hass/local` by adding the following entry (change the datepattern to fit your needs). [source](https://github.com/fail2ban/fail2ban/issues/174)
    ```txt
    [Init]
    datepattern = ^%%Y-%%m-%%d %%H:%%M:%%S
    ```
