---
title: HTTP
description: Configure the HTTP server that serves the Home Assistant frontend and APIs.
ha_category:
  - Other
ha_release: pre 0.7
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: http
ha_integration_type: system
related:
  - docs: /docs/configuration/remote/
    title: Configuring remote access
---

The **HTTP** {% term integration %} serves the Home Assistant frontend and APIs. You can manage the HTTP server settings from the UI under {% my network title="**Settings** > **System** > **Network**" %}.

The integration supports these entity types:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)

## HTTP server settings

To change how Home Assistant serves its web interface, go to {% my network title="**Settings** > **System** > **Network**" %}, then find the **HTTP server** section.

### Options in the UI

{% options_ui %}
Server port:
  description: |
    The port Home Assistant listens on. Starting with Home Assistant 2026.8, the default is `80` for Home Assistant Operating System. For Home Assistant Container, the default remains `8123`. Examples on this page use `8123`; replace it with your configured server port if your installation uses a different port.

    If your installation method lets you set environment variables for Home Assistant, `SETUP_PORT` overrides these defaults at startup.

    _Caution_: If you use the
    [Home Assistant Companion app](https://companion.home-assistant.io/), update the Home Assistant URL
    in the app after changing this port.
  required: true
Listen addresses:
  description: The IP addresses Home Assistant binds to. Leave this empty to listen on all interfaces.
  required: false
SSL certificate path:
  description: The absolute path to the TLS certificate, for example `/ssl/fullchain.pem`.
  required: false
SSL key path:
  description: The absolute path to the TLS private key, for example `/ssl/privkey.pem`.
  required: false
SSL peer certificate path:
  description: The absolute path to a client certificate Home Assistant should require for secure connections.
  required: false
SSL profile:
  description: The Mozilla SSL profile to use. Use **Intermediate** only if integrations have SSL handshake issues.
  required: false
Trust X-Forwarded-For:
  description: Trust the `X-Forwarded-For` header when Home Assistant is behind a reverse proxy.
  required: false
Trusted proxies:
  description: Reverse proxy IP addresses or CIDR networks that are allowed to set `X-Forwarded-For`.
  required: false
Enable IP banning:
  description: Automatically ban IP addresses after repeated failed logins.
  required: false
Login attempts before ban:
  description: Failed login attempts before an IP address is banned. Set this to `-1` to disable automatic bans.
  required: true
CORS allowed origins:
  description: Origins that may make cross-origin requests. Include the scheme, for example `https://example.com`.
  required: false
Send X-Frame-Options:
  description: Send the `X-Frame-Options` header to help prevent clickjacking.
  required: false
{% endoptions_ui %}

Saving HTTP server settings restarts Home Assistant. After Home Assistant restarts, an administrator is asked to confirm the new settings. If the settings are not confirmed within 5 minutes, Home Assistant automatically returns to the previous settings.

## Migrating from YAML

Before Home Assistant 2026.8, the HTTP integration was configured in {% term "`configuration.yaml`" %}. The first time Home Assistant starts after you upgrade, your existing `http:` block is imported into the UI, and a repair issue is raised under {% my repairs title="**Settings** > **System** > **Repairs**" %} to remind you to remove it.

To complete the migration:

1. Remove the `http:` block from {% term "`configuration.yaml`" %}.
2. Restart Home Assistant.
3. Go to {% my network title="**Settings** > **System** > **Network**" %}.
4. In the **HTTP server** section, check that your imported values are correct. If Home Assistant asks you to confirm the settings, confirm them.

The repair issue clears once the `http:` block is gone. For the repair issues that can appear during or after migration, see [Troubleshooting](#troubleshooting).

## Reverse proxies

<a id="use_x_forwarded_for"></a>

When using a reverse proxy, turn on **Trust X-Forwarded-For** and add the proxy to **Trusted proxies**. Requests from reverse proxies are blocked if these options are not set.

{% important %}
When a network mask is provided, you must use the network address (for example, `192.168.1.0/24`), not a host address (for example, `192.168.1.50/24`).
{% endimportant %}

{% note %}

The **Trust X-Forwarded-For** and **Trusted proxies** settings only apply when Home Assistant is behind a traditional reverse proxy, such as NGINX, Caddy, Traefik, or HAProxy. If you use [Home Assistant Cloud](/integrations/cloud/) for remote access, requests arrive through a secure tunnel without `X-Forwarded-*` headers containing the original client IP address. For cloud connections, these settings have no effect, and all requests appear as coming from `127.0.0.1`.

{% endnote %}

## APIs

On top of the `http` integration is a [REST API](https://developers.home-assistant.io/docs/api/rest/), [Python API](https://developers.home-assistant.io/docs/api_lib_index/) and [WebSocket API](https://developers.home-assistant.io/docs/api/websocket/) available.

The `http` platforms are not real platforms within the meaning of the terminology used around Home Assistant. Home Assistant's [REST API](/developers/rest_api/) sends and receives messages over HTTP.

## HTTP sensors

To use an HTTP [sensor](#sensor) or [binary sensor](#binary-sensor), you do not need to configure anything in Home Assistant. All configuration is done on the devices themselves. This means that you must be able to edit the target URL or endpoint and the payload. The entity is created after the first message arrives.

If you want to use an HTTP sensor, create a [Long-Lived Access Token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) in the Home Assistant UI in the **Security** section of your {% my profile title="**User profile**" %} page.

All [requests](https://developers.home-assistant.io/docs/api/rest#post-apistatesentity_id) need to be sent to the endpoint of the device and use **POST**.

## IP filtering and banning

If you want to apply additional IP filtering and automatically ban brute force attempts, turn on **Enable IP banning** and set **Login attempts before ban** to the maximum number of attempts before a ban is activated. After the first ban, an `ip_bans.yaml` file is created in the root configuration folder. It contains the banned IP address and the time in UTC when it was added:

{% note %}

If you use [Home Assistant Cloud](/integrations/cloud/) for remote access, all cloud connections appear with the IP address `127.0.0.1`. This means IP-based banning does not distinguish between individual remote clients connecting through the cloud. Banning `127.0.0.1` would block _all_ cloud connections.

{% endnote %}

```yaml
127.0.0.1:
  banned_at: "2016-11-16T19:20:03"
```

After a ban is added, a persistent notification appears in the Home Assistant frontend.

To clear an IP ban, you can either:

- Remove the specific IP entry from `ip_bans.yaml`.
- Delete the entire `ip_bans.yaml` file. It will be recreated automatically the next time a ban occurs.

After making changes, restart Home Assistant to apply them.

## Hosting files

If you want to use Home Assistant to host or serve static files then create a directory called `www` under the configuration path (`/config`). The static files in `www/` can be accessed by the following URL `http://your.domain:8123/local/`, for example `audio.mp3` would be accessed as `http://your.domain:8123/local/audio.mp3`.

{% important %}
If you've had to create the `www/` folder for the first time, you'll need to restart Home Assistant.
{% endimportant %}

{% caution %}
Files served from the `www` folder (`/local/` URL), aren't protected by the Home Assistant authentication. Files stored in this folder, if the URL is known, can be accessed by anybody without authentication.
{% endcaution %}

## Binary sensor

The HTTP binary sensor is dynamically created with the first request that is made to its URL. You don't have to define it in the configuration first.

The sensor will then exist as long as Home Assistant is running. After a restart of Home Assistant the sensor will be gone until it is triggered again.

The URL for a binary sensor looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/binary_sensor.DEVICE_NAME
```

{% important %}
You should choose a unique device name (DEVICE_NAME) to avoid clashes with other devices.
{% endimportant %}

The JSON payload must contain the new state and can have a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "on", "attributes": {"friendly_name": "Radio"}}
```

For a quick test `curl` can be useful to "simulate" a device.

```bash
$ curl -X POST -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"state": "off", "attributes": {"friendly_name": "Radio"}}' \
    http://localhost:8123/api/states/binary_sensor.radio
```

To check if the sensor is working, use again `curl` to retrieve the [current state](https://developers.home-assistant.io/docs/api/rest/).

```bash
$ curl -X GET -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/binary_sensor.radio
{
    "attributes": {
        "friendly_name": "Radio"
    },
    "entity_id": "binary_sensor.radio",
    "last_changed": "16:45:51 05-02-2016",
    "last_updated": "16:45:51 05-02-2016",
    "state": "off"
}
```

To delete the sensor, send DELETE request with curl

```bash
$ curl -X DELETE -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       http://localhost:8123/api/states/binary_sensor.radio
```

### Examples

In this section you'll find some real-life examples of how to use this sensor, besides `curl`, which was shown earlier.

#### Using Python request module

As already shown on the [API](/developers/rest_api/) page, it's very simple to use Python and the [Requests](https://requests.kennethreitz.org/en/latest/) module for the interaction with Home Assistant.

```python
response = requests.post(
    "http://localhost:8123/api/states/binary_sensor.radio",
    headers={
        "Authorization": "Bearer LONG_LIVED_ACCESS_TOKEN",
        "content-type": "application/json",
    },
    data=json.dumps({"state": "on", "attributes": {"friendly_name": "Radio"}}),
)
print(response.text)
```

#### Using `httpie`

[`httpie`](https://github.com/httpie/httpie) is a user-friendly CLI HTTP client.

```bash
$ http -v POST http://localhost:8123/api/states/binary_sensor.radio \
      'Authorization:Bearer LONG_LIVED_ACCESS_TOKEN' content-type:application/json state=off \
      attributes:='{"friendly_name": "Radio"}'
```

## Sensor

The HTTP sensor is dynamically created with the first request that is made to its URL. You don't have to define it in the configuration first.

The sensor will then exist as long as Home Assistant is running. After a restart of Home Assistant the sensor will be gone until it is triggered again.

The URL for a sensor looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/sensor.DEVICE_NAME
```

{% important %}
You should choose a unique device name (DEVICE_NAME) to avoid clashes with other devices.
{% endimportant %}

The JSON payload must contain the new state and should include the unit of measurement and a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temperature"}}
```

For a quick test, `curl` can be useful to "simulate" a device.

```bash
$ curl -X POST -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       -H "Content-Type: application/json" \
       -d '{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temp"}}' \
       http://localhost:8123/api/states/sensor.bathroom_temperature
```

You can then use `curl` again to retrieve the [current sensor state](https://developers.home-assistant.io/docs/api/rest/) and verify the sensor is working.

```bash
$ curl -X GET -H "Authorization: Bearer LONG_LIVED_ACCESS_TOKEN" \
       -H "Content-Type: application/json" \
       http://localhost:8123/api/states/sensor.bathroom_temperature
{
    "attributes": {
        "friendly_name": "Bathroom Temp",
        "unit_of_measurement": "\u00b0C"
    },
    "entity_id": "sensor.bathroom_temperature",
    "last_changed": "09:46:17 06-02-2016",
    "last_updated": "09:48:46 06-02-2016",
    "state": "20"
}
```

For more examples please visit the [HTTP binary sensor](#examples) page.

## Troubleshooting

### The HTTP server fails to start

If a saved setting prevents the HTTP server from starting, for example if an SSL certificate file is missing or the configured port is already in use, Home Assistant falls back to the last known-good configuration so you can regain access. If no working configuration is available, Home Assistant starts with the default HTTP settings for your installation method, without SSL.

To fix this, check the logs for the underlying error. Then, open the **HTTP server** section under {% my network title="**Settings** > **System** > **Network**" %}, correct the values, and save.

### Repair issues about YAML configuration

After the migration to UI configuration, Home Assistant raises a repair issue if an `http:` block remains in {% term "`configuration.yaml`" %}:

- **The HTTP YAML configuration is deprecated** appears right after your configuration is imported.
- **HTTP YAML configuration is ignored after migration** appears on later starts if the `http:` block is still there.
- **Failed to import HTTP YAML configuration** appears if a value could not be imported. Home Assistant starts with the default HTTP settings; check the logs for the cause.

To clear the first two issues, remove the `http:` block from {% term "`configuration.yaml`" %} and restart Home Assistant. For a failed import, correct the values under {% my network title="**Settings** > **System** > **Network**" %} and save.
