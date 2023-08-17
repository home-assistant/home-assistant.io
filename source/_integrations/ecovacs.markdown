---
title: Ecovacs
description: Instructions on how to integrate Ecovacs vacuums within Home Assistant.
ha_category:
  - Hub
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 0.77
ha_codeowners:
  - '@OverloadUT'
  - '@mib1185'
ha_domain: ecovacs
ha_platforms:
  - vacuum
ha_integration_type: integration
---

The `ecovacs` integration is the main integration to integrate all [Ecovacs](https://www.ecovacs.com) (Deebot) vacuums. You will need your Ecovacs account information (username, password) to discover and control vacuums in your account.

There is currently support for the following device types within Home Assistant:

- [Vacuum](#vacuum)

## Configuration

To add your Ecovacs devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
ecovacs:
  username: YOUR_ECOVACS_USERNAME
  password: YOUR_ECOVACS_PASSWORD
  country: YOUR_TWO_LETTER_COUNTRY_CODE
  continent: YOUR_TWO_LETTER_CONTINENT_CODE
```

{% configuration %}
username:
  description: Your username to login to your Ecovacs account.
  required: true
  type: string
password:
  description: Your password to login to your Ecovacs account.
  required: true
  type: string
country:
  description: Your two-letter country code (us, uk, etc).
  required: true
  type: string
continent:
  description: Your two-letter continent code (na, eu, etc).
  required: true
  type: string
{% endconfiguration %}

Note: For some countries, you will need to set `continent` to `ww` (meaning worldwide.) There is unfortunately no way to know the correct settings other than guessing and checking. See the [py-sucks library protocol documentation](https://github.com/mib1185/py-sucks/blob/master/protocol.md) for more information about what has been figured out about the Ecovacs servers.

Additional note: There are some issues during the password encoding. Using some special characters (e.g., `-`) in your password does not work.

### Stability and Reporting Bugs

The library that talks to the Ecovacs servers is in a very early state and still under development. As such, it is likely that not all regions and devices will work at the current time.

Please see the [py-sucks library documentation](https://github.com/mib1185/py-sucks) for some more information about what has been tested, and check out the GitHub issues to see if the issue you're having is known or being worked on.

If you have an issue with the Ecovacs integration, please file a [GitHub Issue](https://github.com/home-assistant/home-assistant/issues) and include your Home Assistant logs in the report. To get full debug output from both the Ecovacs integration and the underlying `sucks` library, place this in your `configuration.yaml` file:

```yaml
logger:
  logs:
    homeassistant.components.ecovacs: debug
    homeassistant.components.vacuum.ecovacs: debug
    sucks: debug
```

**Warning**: doing this will cause your authentication token to be visible in your log files. Be sure to remove any tokens and other authentication details from your log before posting them in an issue.


## Vacuum

The `ecovacs` vacuum platform allows you to monitor and control your Ecovacs Deebot vacuums.

### Vacuum services historical note

The `ecovacs` vacuum platform previously did not support either of the services `vacuum.pause` or `vacuum.start`, it supported the `vacuum.turn_on` and `vacuum.turn_off` instead. This functionality was replaced with standardized `vacuum.start` and `vacuum.stop` by 2023.8.

#### Service `vacuum.start`

Start a new cleaning task.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Use `entity_id: all` to target all.        |

#### Service `vacuum.stop`

Stop the current cleaning task and return to the dock.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Use `entity_id: all` to target all.        |

#### Service `vacuum.start_pause`

Start, pause or resume a cleaning task.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Use `entity_id: all` to target all.        |

### Integration lifespan

The remaining lifespan of components on your Deebot vacuum will be reported as attributes on the vacuum entity. The value will be a whole number representing the percentage of life remaining.

Here's an example of how to extract the filter's lifespan to its own sensor using a [template sensor](/integrations/template):

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - sensor:
    - name: "Vacuum Filter Remaining Lifespan"
      unit_of_measurement: "%"
      state: "{{ state_attr('vacuum.my_vacuum_id', 'component_filter') }}"
```

{% endraw %}

Or, if you want a simple binary sensor that becomes `On` when the filter needs to be replaced (5% or less):

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
    - name: "Vacuum Filter"
      device_class: problem
      state: "{{ state_attr('vacuum.my_vacuum_id', 'component_filter') <= 5 }}"
```

{% endraw %}

### Handling Errors

The vacuum entity has an `error` attribute that will contain the _most recent_ error message that came from the vacuum. There is not a comprehensive list of all error messages, so you may need to do some experimentation to determine the error messages that your vacuum can send.

If the vacuum fires a "no error" event, the `error` attribute will change back to `None`. Note, however, that this does not happen for all types of errors.

Alternatively, you can use the `ecovacs_error` event to watch for errors. This event will contain a data payload that looks like:

```json
{
  "entity_id": "vacuum.deebot_m80",
  "error": "an_error_name"
}
```

Finally, if a vacuum becomes unavailable (usually due to being idle and off its charger long enough for it to completely power off,) the vacuum's `status` attribute will change to `offline` until it is turned back on.
