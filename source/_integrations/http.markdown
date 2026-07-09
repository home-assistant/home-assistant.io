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
---

The **HTTP** {% term integration %} serves the Home Assistant frontend and APIs. You can manage the HTTP server settings from the UI under {% my network title="**Settings** > **System** > **Network**" %}.

The integration provides these platforms:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)

## HTTP server settings

To change how Home Assistant serves its web interface, go to {% my network title="**Settings** > **System** > **Network**" %}, then find the **HTTP server** section.

### Options in the UI

{% options_ui %}
Server port:
  description: The port Home Assistant listens on. The default is `8123`.
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

## YAML configuration

The `http:` YAML configuration is deprecated and has been replaced by the **HTTP server** settings in the UI. During the migration period, Home Assistant can still import supported `http:` YAML options into the UI-managed settings. Support for `http:` YAML configuration is planned to be removed in Home Assistant 2027.6.

If you already have an `http:` block in your {% term "configuration.yaml" %} file, Home Assistant imports it once and creates a repair issue asking you to remove the YAML configuration. After it has been imported, the `http:` block is ignored.

The repair issue for imported `http:` YAML can be fixed by removing the `http:` block from {% term "configuration.yaml" %} and restarting Home Assistant.

The following YAML options are kept for migration. Use the **HTTP server** settings in the UI for new changes.

{% configuration %}
server_host:
  description: "Only listen to incoming requests on specific IP addresses or host names. By default, the `http` integration auto-detects IPv4 and IPv6 support and listens on all interfaces. Use `server_host: 0.0.0.0` if you want to listen only on IPv4 addresses. On Home Assistant OS and Home Assistant Supervised, this option is deprecated because it can interfere with communication between Home Assistant Core and Supervisor."
  required: false
  type: [list, string]
  default: "0.0.0.0, ::"
server_port:
  description: The port Home Assistant listens on.
  required: false
  type: integer
  default: 8123
ssl_certificate:
  description: "The absolute path to the TLS certificate to use for secure connections, for example `/ssl/fullchain.pem`."
  required: false
  type: string
ssl_peer_certificate:
  description: The absolute path to the client or peer TLS certificate to accept for secure connections.
  required: false
  type: string
ssl_key:
  description: "The absolute path to the TLS private key to use for secure connections, for example `/ssl/privkey.pem`."
  required: false
  type: string
cors_allowed_origins:
  description: "A list of origins that may make [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) requests. You must provide the exact origin. For example, `https://www.home-assistant.io` allows requests from `https://www.home-assistant.io`, but not from `http://www.home-assistant.io`."
  required: false
  type: [list, string]
  default: "https://cast.home-assistant.io"
use_x_forwarded_for:
  description: "Enable parsing of the `X-Forwarded-For` header, passing on the client's correct IP address when Home Assistant is behind a reverse proxy. You must also set `trusted_proxies`. Requests with this header from proxies that are not trusted are rejected."
  required: false
  type: boolean
  default: false
trusted_proxies:
  description: "A list of trusted reverse proxy IP addresses or networks that are allowed to set the `X-Forwarded-For` header. This is required when using `use_x_forwarded_for`. If the immediate upstream proxy is not in the list, the request is rejected. If any other intermediate proxy is not in the list, the first untrusted proxy is treated as the client."
  required: false
  type: [list, string]
ip_ban_enabled:
  description: Whether additional IP filtering is enabled.
  required: false
  type: boolean
  default: true
login_attempts_threshold:
  description: The number of failed login attempts from a single IP address before it is automatically banned if `ip_ban_enabled` is `true`. When set to `-1`, no new automatic bans are added.
  required: false
  type: integer
  default: -1
ssl_profile:
  description: "The [Mozilla SSL profile](https://wiki.mozilla.org/Security/Server_Side_TLS) to use. Use `intermediate` only if integrations have SSL handshake issues."
  required: false
  type: string
  default: modern
use_x_frame_options:
  description: "Controls the `X-Frame-Options` header to help prevent [clickjacking](https://en.wikipedia.org/wiki/Clickjacking)."
  required: false
  type: boolean
  default: true
{% endconfiguration %}

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
