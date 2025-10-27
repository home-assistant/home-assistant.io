---
title: ZoneMinder
description: How to integrate ZoneMinder into Home Assistant.
ha_category:
  - Binary sensor
  - Camera
  - Hub
  - Sensor
  - Switch
ha_release: 0.31
ha_iot_class: Local Polling
ha_codeowners:
  - '@rohankapoorcom'
  - '@nabbi'
ha_domain: zoneminder
ha_platforms:
  - binary_sensor
  - camera
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `zoneminder` integration sets up Home Assistant with your [ZoneMinder](https://www.zoneminder.com) instance.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Camera](#camera)
- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

To add the {% term integration %} to your installation, add it to the {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
zoneminder:
  - host: ZM_HOST
```

{% configuration %}
host:
  description: Your ZoneMinder server's host (and optional port), not including the scheme.
  required: true
  type: string
path:
  description: Path to your ZoneMinder install.
  required: false
  type: string
  default: "`/zm/`"
path_zms:
  description: Path to the CGI script for streaming. This should match `PATH_ZMS` in ZM's "Paths" settings.
  required: false
  type: string
  default: "`/zm/cgi-bin/nph-zms`"
ssl:
  description: Set to `true` if your ZoneMinder installation is using SSL.
  required: false
  type: boolean
  default: false
verify_ssl:
  description: Verify the certification of the endpoint.
  required: false
  type: boolean
  default: true
username:
  description: Your ZoneMinder username.
  required: false
  type: string
password:
  description: Your ZoneMinder password. Required if `OPT_USE_AUTH` is enabled in ZM.
  required: false
  type: string
{% endconfiguration %}

### Full configuration

```yaml
# Example configuration.yaml entry
zoneminder:
  - host: ZM_HOST
    path: ZM_PATH
    path_zms: ZM_PATH_ZMS
    ssl: true
    verify_ssl: true
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

### Action

Once loaded, the `zoneminder` platform will expose an action (`set_run_state`) that can be used to change the current run state of ZoneMinder.

| Data attribute | Optional | Description                       |
| :--------------------- | :------- | :-------------------------------- |
| `id`                   | no       | Host of the ZoneMinder instance.  |
| `name`                 | no       | Name of the new run state to set. |

For example, if your ZoneMinder instance was configured with a run state called "Home", you could write an [automation](/getting-started/automation/) that changes ZoneMinder to the "Home" run state by including the following [action](/getting-started/automation-action/):

 ```yaml
actions:
  action: zoneminder.set_run_state
  data:
    id: ZM_HOST
    name: Home
```

## Binary sensor

The `zoneminder` binary sensor platform lets you monitor the availability of your [ZoneMinder](https://www.zoneminder.com) install.

Each binary_sensor created will be named after the hostname used when configuring the [ZoneMinder integration](/integrations/zoneminder/).

## Camera

The `zoneminder` camera platform lets you monitor the current stream of your [ZoneMinder](https://www.zoneminder.com) cameras.

### Configuration

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: zoneminder
```

## Sensor

The `zoneminder` sensor platform lets you monitor the current state of your [ZoneMinder](https://www.zoneminder.com) install including the number of events, the current state of the cameras and ZoneMinder's current run state.

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zoneminder
    include_archived: false
```

{% configuration %}
include_archived:
  description: Whether to include archived ZoneMinder events in event counts.
  required: false
  default: false
  type: boolean
monitored_conditions:
  description: Event count sensors to display in the frontend.
  required: false
  type: list
  keys:
    all:
      description: All events.
    month:
      description: Events in the last month.
    week:
      description: Events in the last week.
    day:
      description: Events in the last day.
    hour:
      description: Events in the last hour.
{% endconfiguration %}

## Switch

The `zoneminder` switch platform allows you to toggle the current function of all cameras attached to your [ZoneMinder](https://www.zoneminder.com) instance.

{% important %}
You must have the [ZoneMinder integration](/integrations/zoneminder/) configured to use this and if ZoneMinder authentication is enabled the account specified in the integration configuration must have "Edit" permission for "System".
{% endimportant %}

To enable this switch, add the following lines to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: zoneminder
    command_on: Modect
    command_off: Monitor
```

{% configuration %}
command_on:
  description: The function you want the camera to run when turned on.
  required: true
  type: string
command_off:
  description: The function you want the camera to run when turned off.
  required: true
  type: string
{% endconfiguration %}

{% note %}
The default functions installed by ZoneMinder are: None, Monitor, Modect, Record, Mocord, Nodect.
{% endnote %}
