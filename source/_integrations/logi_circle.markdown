---
title: Logi Circle
description: Instructions on how to integrate your Logi Circle cameras within Home Assistant.
ha_category:
  - Camera
  - Sensor
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@evanjd'
ha_domain: logi_circle
ha_platforms:
  - camera
  - sensor
ha_integration_type: integration
---

The `logi_circle` implementation allows you to integrate your [Logi Circle](https://circle.logi.com/) cameras in Home Assistant. To connect Logi Circle, you will have to [sign up for API access](#requesting-api-access) and get a `client_id`, `client_secret` and `api_key`.

## Requesting API access

1. Navigate to the [Circle OAuth2 Client Request Form](https://docs.google.com/forms/d/184FUILJ10rVxotyOQR5DAiu6GcCbK31AZszUdzT1ybs).
2. Fill out your contact name and e-mail address.
3. For the User Visible Client Name, specify "Home Assistant"
3. Request the following scopes:
    * `circle:activities`
    * `circle:accessories`
    * `circle:live_image`
    * `circle:live`
    * `circle:notifications`
    * `circle:summaries`
4. Request the `authorization_code` grant type.
5. For the redirect URI, specify your Home Assistant URL followed by `/api/logi_circle`. For example, if your Home Assistant URL is `https://abc123.ui.nabu.casa`, then request `https://abc123.ui.nabu.casa/api/logi_circle`. The redirect URI must meet the following criteria:
 * The URL must be HTTPS with a SSL certificate issued by a trusted CA (i.e., trusted by normal browsers).
 * At the time you submit your request to Logitech, you need to demonstrate that you have exclusive control of the fully qualified domain name in your redirect URI. An active Home Assistant instance at the redirect URI will suffice. If you don't want to expose your Home Assistant instance publicly, you may also place a static page at the redirect URI with a short message that you will manage redirection of the authorization token to your local Home Assistant instance. Free static hosts that issue subdomains for hosting (e.g., Netlify) are permitted.
 * As the redirect URI must be public facing, no local/reserved TLDs are permitted (eg. .local, .localhost, .example, etc. are not allowed).

Please note that the turn-around time for API access takes up to a month after which you will be contacted by Logitech using the email address you provided in the form.

## Configuration

To integrate cameras linked with your [Logi Circle](https://circle.logi.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
logi_circle:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  api_key: YOUR_API_KEY
  redirect_uri: YOUR_REDIRECT_URI
```

{% configuration %}
client_id:
  description: The client ID issued to you by Logitech.
  required: true
  type: string
client_secret:
  description: The client secret issued to you by Logitech.
  required: true
  type: string
api_key:
  description: The API key issued to you by Logitech.
  required: true
  type: string
redirect_uri:
  description: >
    The redirect URI that corresponds to your Home Assistant instance.
    It must match one of the redirect URIs specified when you requested API
    access from Logitech.
  required: true
  type: string
{% endconfiguration %}

### Camera

The `logi_circle` camera platform allows you to view still frames from your [Logi Circle](https://circle.logi.com/) camera's live stream in Home Assistant.

Logi Circle cameras support the `camera.turn_on` and `camera.turn_off` services. This will set the streaming mode property of your camera accordingly, controlling whether the live stream is available and activity recordings are captured.

### Sensor

The `logi_circle` sensor platform lets you monitor sensors connected to your [Logi Circle](https://circle.logi.com) cameras in Home Assistant.

To customize which sensors are setup, you can extend the Logi Circle integration configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
logi_circle:
  sensors:
    monitored_conditions:
      - battery_level
      - last_activity_time
      - recording
      - signal_strength_category
      - signal_strength_percentage
      - streaming
```

By default, all sensors available from your Logi Circle devices will be monitored. Leave `monitored_conditions` blank to disable all sensors for the Logi Circle component. Devices without an internal battery will not expose a `battery_level` sensor.

{% configuration %}
sensor:
  description: Configuration to pass to all sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: The conditions to create sensors from.
      required: false
      type: list
      default: all
      keys:
        battery_level:
          description: Returns the battery level percentage from the camera.
        last_activity_time:
          description: Return the timestamp from the last time the Logi Circle camera detected any activity.
        recording:
          description: The camera's recording mode. If false, the camera will not capture activities.
        signal_strength_category:
          description: Return the Wi-Fi signal level from the camera.
        signal_strength_percentage:
          description: Return the Wi-Fi signal percentage from the camera.
        streaming:
          description: The soft on/off status of the camera.
{% endconfiguration %}

## Services

The `logi_circle` platform exposes 3 services for interacting with your Logi Circle device. When calling a service with one or more entity IDs, please ensure you target the camera entity (eg. `camera.living_room_camera`).

### Service `logi_circle.livestream_record`

Initiates a recording of the camera's live stream.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to initiate a recording for, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `filename `            |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/recording_{{ entity_id }}.mp4`{% endraw %}. |
| `duration`             |      no  | Duration of recording, in seconds.

The path part of `filename` must be an entry in the `allowlist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### Service `logi_circle.livestream_snapshot`

Take a snapshot from a camera's live stream. This differs from the generic [snapshot](/integrations/camera/#service-snapshot) service in that explicitly requests a fresh image from Logi Circle's API. This will force cameras in a deep sleep state to wake.

Please note that new snapshots will only be generated if the cached snapshot is older than 30s. Requesting multiple snapshots in quick succession will likely return the same image. Likewise, requesting a snapshot from a camera that is actively streaming (ie. is not in deep sleep) will return a cached image no older than 30s.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to create a live stream snapshot from, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `filename`             |      no  | Template of a file name. Variable is `entity_id`, e.g., {% raw %}`/tmp/snapshot_{{ entity_id }}.jpg`{% endraw %}. |

The path part of `filename` must be an entry in the `allowlist_external_dirs` in your [`homeassistant:`](/docs/configuration/basic/) section of your `configuration.yaml` file.

### Service `logi_circle.set_config`

Sets a configuration property for your camera.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name(s) of entities to set the operation mode for, e.g., `camera.living_room_camera`. If blank, targets all Logi Circle cameras. |
| `mode`                 |      no  | Configuration property to set. Allowed values: `LED`, `RECORDING_MODE` |
| `value`                |      no  | Mode value. Allowed values: `true`, `false` |
