---
title: HTTP
description: Configure the Home Assistant HTTP server, including the listening port, SSL, CORS, trusted reverse proxies, and IP banning.
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

The **HTTP** {% term integration %} serves the Home Assistant frontend and powers the [REST API](https://developers.home-assistant.io/docs/api/rest/), the [Python API](https://developers.home-assistant.io/docs/api_lib_index/), and the [WebSocket API](https://developers.home-assistant.io/docs/api/websocket/). It is part of every Home Assistant installation and does not need to be added manually.

The integration supports these entity types:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)

## HTTP server settings

To change the listening port, set up SSL, allow CORS origins, configure trusted reverse proxies, or tune IP banning, go to {% my network title="**Settings** > **System** > **Network**" %}, then find the **HTTP server** section.

{% important %}
The **Listen addresses** option should only be used on a Home Assistant Container installation.
{% endimportant %}

### Options

{% options_ui %}
Server port:
  description: |
    <a id='server_port'></a>The TCP port the HTTP server listens on. The default is `8123`.

    _Caution_: If you use the
    [Home Assistant Companion app](https://companion.home-assistant.io/), update the Home Assistant URL
    in the app after changing this port.
  required: true
Listen addresses:
  description: "<a id='server_host'></a>Only listen for incoming requests on specific IP addresses. By default, Home Assistant auto-detects IPv4 and IPv6 and listens on all interfaces. Set this to `0.0.0.0` to listen only on IPv4 addresses. This option is intended for Home Assistant Container installations."
  required: false
SSL certificate path:
  description: "<a id='ssl_certificate'></a>Path on the Home Assistant host to your TLS/SSL certificate to serve Home Assistant over a secure connection. If you use the [Let's Encrypt add-on](https://github.com/home-assistant/addons/tree/master/letsencrypt), this is `/ssl/fullchain.pem`. For most setups, the [NGINX add-on](https://github.com/home-assistant/addons/tree/master/nginx_proxy) is recommended instead."
  required: false
SSL key path:
  description: "<a id='ssl_key'></a>Path on the Home Assistant host to your TLS/SSL private key. If you use the Let's Encrypt add-on, this is `/ssl/privkey.pem`."
  required: false
SSL peer certificate path:
  description: "<a id='ssl_peer_certificate'></a>Path on the Home Assistant host to a client certificate Home Assistant should require for secure connections."
  required: false
SSL profile:
  description: "<a id='ssl_profile'></a>The [Mozilla SSL profile](https://wiki.mozilla.org/Security/Server_Side_TLS) to use. Select **Intermediate** only if integrations cause SSL handshake errors. The default is **Modern**."
  required: false
CORS allowed origins:
  description: "<a id='cors_allowed_origins'></a>Origin domains that may make [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) requests. Provide the exact origin including the scheme, for example `https://www.home-assistant.io`. Enabling this sets the `Access-Control-Allow-Origin` header to the origin if it appears in the list."
  required: false
Trust X-Forwarded-For:
  description: "<a id='use_x_forwarded_for'></a>Trust the `X-Forwarded-For` header from a reverse proxy to receive the client's real IP address. Requires the **Trusted proxies** list to be populated. Requests carrying this header from non-trusted sources are treated as spoofing attempts, and the header is ignored."
  required: false
Trusted proxies:
  description: "<a id='trusted_proxies'></a>Reverse-proxy IP addresses or CIDR networks allowed to set the `X-Forwarded-For` header. Configure with care: if the immediate upstream proxy is not in the list, the request is rejected; if an intermediate proxy is not in the list, the first untrusted proxy is treated as the client. When using a network mask, use the network address (for example, `192.168.1.0/24`), not a host address (for example, `192.168.1.50/24`)."
  required: false
Send X-Frame-Options:
  description: "<a id='use_x_frame_options'></a>Set the `X-Frame-Options` header to help prevent [clickjacking](https://en.wikipedia.org/wiki/Clickjacking). Enabled by default."
  required: false
Enable IP banning:
  description: "<a id='ip_ban_enabled'></a>Automatically ban remote clients after repeated failed login attempts. Enabled by default."
  required: false
Login attempts before ban:
  description: "<a id='login_attempts_threshold'></a>Failed login attempts from a single IP address before that address is banned, when **Enable IP banning** is on. Set to `-1` to disable adding new bans automatically. The default is `-1`."
  required: true
{% endoptions_ui %}

Saving HTTP server settings restarts Home Assistant. After Home Assistant restarts, an administrator is asked to confirm the new settings. If the settings are not confirmed within 5 minutes, Home Assistant automatically returns to the previous settings.

## Migrating from YAML

Before Home Assistant 2026.6, the HTTP integration was configured in {% term "`configuration.yaml`" %}. On the first startup after the upgrade, your existing `http:` block is imported into the UI and a repair issue is raised under {% my repairs title="**Settings** > **System** > **Repairs**" %} prompting you to remove the YAML configuration.

To complete the migration:

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. Verify that the **HTTP server** section shows your imported values.
3. Remove the `http:` block from {% term "`configuration.yaml`" %}.
4. Restart Home Assistant.

The repair issue clears once the YAML block is gone. If the import fails, for example when a value is invalid or **Trust X-Forwarded-For** is enabled without trusted proxies, Home Assistant starts with default HTTP settings and the repair issue reports the cause. Review the values in the UI, save, and restart.

## Reverse proxies

<a id="use_x_forwarded_for"></a>

When Home Assistant runs behind a reverse proxy such as NGINX, Caddy, Traefik, or HAProxy, enable **Trust X-Forwarded-For** and add the proxy's IP address or network to **Trusted proxies**. Requests from a reverse proxy are rejected otherwise.

{% important %}
When a network mask is provided, you must use the network address (for example, `192.168.1.0/24`), not a host address (for example, `192.168.1.50/24`).
{% endimportant %}

{% note %}
**Trust X-Forwarded-For** and **Trusted proxies** apply only to traditional reverse proxies. If you use [Home Assistant Cloud](/integrations/cloud/) for remote access, requests arrive through a secure tunnel without `X-Forwarded-*` headers containing the original client IP address. For cloud connections, these options have no effect and all requests appear as coming from `127.0.0.1`.
{% endnote %}

## APIs

On top of the `http` integration is a [REST API](https://developers.home-assistant.io/docs/api/rest/), [Python API](https://developers.home-assistant.io/docs/api_lib_index/) and [WebSocket API](https://developers.home-assistant.io/docs/api/websocket/) available.

The `http` platforms are not real platforms within the meaning of the terminology used around Home Assistant. Home Assistant's [REST API](/developers/rest_api/) sends and receives messages over HTTP.

## HTTP sensors

To use an HTTP [sensor](#sensor) or [binary sensor](#binary-sensor), you do not need to configure anything in Home Assistant. All configuration is done on the devices themselves. This means that you must be able to edit the target URL or endpoint and the payload. The entity is created after the first message arrives.

If you want to use an HTTP sensor, create a [Long-Lived Access Token](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token) in the Home Assistant UI in the **Security** section of your {% my profile title="**User profile**" %} page.

All [requests](https://developers.home-assistant.io/docs/api/rest#post-apistatesentity_id) need to be sent to the endpoint of the device and use **POST**.

## IP filtering and banning

To apply additional IP filtering and automatically ban brute-force attempts, enable **Enable IP banning** and set **Login attempts before ban** to the number of failed logins allowed before a ban is added.

{% note %}
If you use [Home Assistant Cloud](/integrations/cloud/) for remote access, all cloud connections appear with the IP address `127.0.0.1`. IP-based banning cannot distinguish between individual remote clients connecting through the cloud, and banning `127.0.0.1` would block _all_ cloud connections.
{% endnote %}

After the first ban, an `ip_bans.yaml` file is created in the configuration folder with the banned IP address and the time, in UTC, at which the ban was added:

```yaml
127.0.0.1:
  banned_at: "2016-11-16T19:20:03"
```

After a ban is added, a persistent notification is shown in the Home Assistant frontend.

To clear an IP ban, you can either:

- Remove the specific IP entry from `ip_bans.yaml`.
- Delete the entire `ip_bans.yaml` file. It is recreated automatically the next time a ban occurs.

After making changes, restart Home Assistant to apply them.

## Hosting files

To use Home Assistant to host or serve static files, create a directory called `www` under the configuration path (`/config`). Static files in `www/` are accessed by the following URL `http://your.domain:8123/local/`. For example, `audio.mp3` is accessed as `http://your.domain:8123/local/audio.mp3`.

{% important %}
If you have just created the `www/` folder for the first time, you need to restart Home Assistant.
{% endimportant %}

{% caution %}
Files served from the `www` folder (the `/local/` URL) are not protected by Home Assistant authentication. If the URL is known, the files can be accessed by anybody without authentication.
{% endcaution %}

## Binary sensor

The HTTP binary sensor is created dynamically with the first request made to its URL. You do not have to define it in the configuration first.

The sensor exists as long as Home Assistant is running. After a restart, the sensor is gone until it is triggered again.

The URL for a binary sensor looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/binary_sensor.DEVICE_NAME
```

{% important %}
Choose a unique device name (`DEVICE_NAME`) to avoid clashes with other devices.
{% endimportant %}

The JSON payload must contain the new state and can have a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "on", "attributes": {"friendly_name": "Radio"}}
```

For a quick test, `curl` can be useful to simulate a device.

```bash
$ curl -X POST -H "Authorization: ******" \
    -H "Content-Type: application/json" \
    -d '{"state": "off", "attributes": {"friendly_name": "Radio"}}' \
    http://localhost:8123/api/states/binary_sensor.radio
```

To check if the sensor is working, use `curl` again to retrieve the [current state](https://developers.home-assistant.io/docs/api/rest/).

```bash
$ curl -X GET -H "Authorization: ******" \
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

To delete the sensor, send a DELETE request with `curl`:

```bash
$ curl -X DELETE -H "Authorization: ******" \
       http://localhost:8123/api/states/binary_sensor.radio
```

### Examples

This section shows real-life examples of how to use this sensor, besides `curl`.

#### Using the Python `requests` module

As already shown on the [API](/developers/rest_api/) page, you can use Python and the [Requests](https://requests.kennethreitz.org/en/latest/) module to interact with Home Assistant.

```python
response = requests.post(
    "http://localhost:8123/api/states/binary_sensor.radio",
    headers={
        "Authorization": "******",
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
      'Authorization:******' content-type:application/json state=off \
      attributes:='{"friendly_name": "Radio"}'
```

## Sensor

The HTTP sensor is created dynamically with the first request made to its URL. You do not have to define it in the configuration first.

The sensor exists as long as Home Assistant is running. After a restart, the sensor is gone until it is triggered again.

The URL for a sensor looks like the example below:

```bash
http://IP_ADDRESS:8123/api/states/sensor.DEVICE_NAME
```

{% important %}
Choose a unique device name (`DEVICE_NAME`) to avoid clashes with other devices.
{% endimportant %}

The JSON payload must contain the new state and should include the unit of measurement and a friendly name. The friendly name is used in the frontend to name the sensor.

```json
{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temperature"}}
```

For a quick test, `curl` can be useful to simulate a device.

```bash
$ curl -X POST -H "Authorization: ******" \
       -H "Content-Type: application/json" \
       -d '{"state": "20", "attributes": {"unit_of_measurement": "°C", "friendly_name": "Bathroom Temp"}}' \
       http://localhost:8123/api/states/sensor.bathroom_temperature
```

You can then use `curl` again to retrieve the [current sensor state](https://developers.home-assistant.io/docs/api/rest/) and verify the sensor is working.

```bash
$ curl -X GET -H "Authorization: ******" \
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

For more examples, see the [HTTP binary sensor](#examples) section.

## Troubleshooting

### The HTTP server failed to start

If a stored value prevents the HTTP server from starting, for example an SSL certificate path that no longer exists, Home Assistant falls back to default HTTP settings on port `8123` without SSL so you can recover access. A repair issue titled **HTTP configuration was rejected on startup** is raised under {% my repairs title="**Settings** > **System** > **Repairs**" %} with the underlying error.

To fix this, open the **HTTP server** section in {% my network title="**Settings** > **System** > **Network**" %}, correct the values, save, and restart.

### Repair issue: the HTTP YAML configuration is deprecated

This issue appears when an `http:` block is still present in {% term "`configuration.yaml`" %} after the values were imported into the UI.

To fix this, verify your settings under {% my network title="**Settings** > **System** > **Network**" %}, remove the `http:` block, and restart Home Assistant.
