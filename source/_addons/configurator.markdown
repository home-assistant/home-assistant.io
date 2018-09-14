---
layout: page
title: "HASS Configurator"
description: "Browser-based configuration file editor for Home Assistant."
date: 2018-07-16 14:00
sidebar: true
comments: false
sharing: true
footer: true
featured: true
og_image: /images/hassio/screenshots/addon-hass-configurator.png
---

You can use this add-on to add a browser-based file editor to your Hass.io installation. By default it will listen on port `3218` of the host Hass.io is running on.

More information and a standalone version for regular Home Assistant installations can be found in the [GitHub repository](https://github.com/danielperna84/hass-configurator).

<p class='img'>
<img src='/images/hassio/screenshots/addon-hass-configurator.png'>
Screenshot of the HASS Configurator.
</p>

### {% linkable_title Feature list %}

- Web-based editor to modify your files with syntax highlighting and YAML linting.
- Upload and download files.
- Stage, stash and commit changes in Git repositories, create and switch between branches, push to remotes, view diffs.
- Lists with available entities, triggers, events, conditions and services.
- Restart Home Assistant directly with the click of a button. Reloading groups, automations, etc. can be done as well. An API password is required.
- SSL/TLS support.
- Optional authentication and IP filtering for added security.
- Direct links to Home Assistant documentation and icons.
- Execute shell commands within the add-on container.
- Editor settings are saved in your browser.
- And much more...

### {% linkable_title Add-on Configuration %}

```json
{
  "username": "admin",
  "password": "secret",
  "ssl": false,
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem",
  "verify_hostname": false,
  "allowed_networks": [
    "192.168.0.0/16",
    "172.30.0.0/16"
  ],
  "banned_ips": [
    "8.8.8.8"
  ],
  "banlimit": 0,
  "ignore_pattern": [
    "__pycache__"
  ],
  "dirsfirst": false,
  "enforce_basepath": false,
  "notify_service": "persistent_notification.create",
  "ignore_ssl": false
}
```

- **username** (*Required*): Set a username to access your configuration is protected.
- **password** (*Required*): Set a password for access.
- **ssl** (*Required*): Enable or Disable SSL/TLS for the editor.
- **certfile** (*Required*): Set the path the your SSL certificate if the ssl-option is set to `true`.
- **keyfile** (*Required*): Set the path the your SSL private key if the ssl-option is set to `true`.
- **allowed_networks** (*Required*): Limit access to the configurator by adding allowed IP addresses/networks to the list.
- **banned_ips** (*Required*): List of statically banned IP addresses.
- **banlimit** (*Required*): Ban access from IPs after `banlimit` failed login attempts. The default value `0` disables this feature. Restart the add-on to clear the list of banned IP addresses.
- **ignore_pattern** (*Required*): Files and folders to ignore in the UI.
- **dirsfirst** (*Required*): List directories before files in the file browser.
- **enforce_basepath** (*Required*): If set to `true`, access is limited to files within the `/config` directory.
- **notify_service** (*Required*): Specify a custom notify-service to be used to push notifications.
- **ignore_ssl** (*Required*): Ignore SSL errors when accessing the Home Assistant API.
- **sesame** (*Optional*): Secret token to dynamically allow access from the IP the request originates from. Open your bookmark https://hassio.yourdomain.com:8123/somesecretnobodycanguess while `allowed_networks` is set to `[]` and your IP will get whitelisted. You can use the _Network status_ menu to revoke IP addresses for which access has been granted. Regular authentication is still required.
- **sesame_totp_secret** (*Optional*): Like the `sesame` option, but instead as Base32 encoded secret string must be provided. This string then can be added to a TOTP App like Google Authenticator. This way you get a 6-digit `sesame` that changes every 30 seconds.
- **loglevel** (*Optional*): You can change the logging level from the default value `info` if you want to. Valid values are: `debug`, `info`, `warning`, `error`, `critical`.

<p class='note warning'>
Be careful when setting up port forwarding to the configurator while embedding into Home Assistant. If you don't restrict access by requiring authentication and/or blocking based on client IP addresses, your configuration will be exposed to the internet!
</p>

### {% linkable_title Embedding into Home Assistant %}

Using the Home Assistant component [panel_iframe](/components/panel_iframe/) it is possible to embed the configurator directly into Home Assistant, allowing you to modify your configuration from within the Home Assistant frontend.

An example configuration would look like this:

```yaml
panel_iframe:
  configurator:
    title: Configurator
    icon: mdi:wrench
    url: http://hassio.local:3218
```

