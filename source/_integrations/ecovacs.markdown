---
title: Ecovacs
description: Instructions on how to integrate Ecovacs vacuums and mowers within Home Assistant.
ha_category:
  - Hub
  - Lawn mower
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 0.77
ha_codeowners:
  - '@mib1185'
  - '@edenhaus'
  - '@Augar'
ha_config_flow: true
ha_domain: ecovacs
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - event
  - image
  - lawn_mower
  - number
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
---

The `ecovacs` {% term integration %} is the main integration to integrate [Ecovacs](https://www.ecovacs.com) (Deebot) vacuums and mowers. You will need your Ecovacs account information (username, password) to discover and control vacuums and mowers in your account.

{% include integrations/config_flow.md %}

Additional note: There are some issues during the password encoding. Using some special characters (e.g., `-`) in your password does not work.

With `advanced_mode` enabled, users can use their self-hosted instance over the cloud servers. Self-hosting comes with some requirements and limitations. See [Self-hosted configuration](#self-hosted-configuration) for additional details.

## Provided entities

The Ecovacs integration provides a vacuum {% term entity %} for each device that is connected to your Ecovacs account.

Using the vacuum entity, you can monitor and control your Ecovacs Deebot vacuum.

Additionally, **depending on your model**, the integration provides the following entities:

- **Binary sensor**:
  - `Mop attached`: On if the mop is attached. Note: If you do not see the state change to `Mop attached` in Home Assistant, you may need to wake up the robot in order to push the state change. Some models report an entity state change only if the overall status of the vacuum has changed. For example, if the overall state changes from `docked` to `cleaning`.
- **Button**:
  - `Reset lifespan`: For each supported component, a button entity to reset the lifespan will be created. All disabled by default.
  - `Relocate`: Button entity to trigger manual relocation.
  - `Station actions`: For each supported station action, a button entity will be created.
- **Event**:
  - `Last job`: Provides the stop reason as event_type
- **Image**:
  - `Map`: The floorplan/map as an image in SVG format.
- **Number**:
  - `Clean count`: Set the number of times to clean the area.
  - `Cut direction`: Set the mower cutting direction (from 0 to 180 degrees).
  - `Volume`: Set the volume.
- **Select**:
  - `Water amount`: Specify the water amount used during cleaning with the mop.
  - `Work mode`: Specify the mode, how the bot should clean.
- **Sensor**:
  - `Error`: The error code and a description of the error. `0` means no error. Disabled by default.
  - `Lifespan`: For each supported component, an entity with the remaining lifespan will be created.
  - `Network`: The following network related entities will be created. All disabled by default.
    - `Ip address`
    - `Wi-Fi RSSI`
    - `Wi-Fi SSID`
  - `Cleaning cycle`:
    - `Area`: The cleaned area
    - `Time`: The cleaned time
  - `Station state`: Station state enum sensor. See options to see all possible states
  - `Total statistics`: Updated after each cleaning cycle:
    - `Area`: Total cleaned area
    - `Cleanings`: The number of cleanings
    - `Time`: The total cleaning time
- **Switch**:
  - `Advanced mode`: Enable advanced mode. Disabled by default.
  - `Border switch`: Enable border switch. Disabled by default.
  - `Carpet auto fan speed boost`: Enable maximum fan speed if a carpet is detected. Disabled by default.
  - `Child lock`: Enable child lock. Disabled by default.
  - `Move up warning`: Enable device move up warning. Disabled by default.
  - `Cross map border warning`: Enable warning for crossing the map border. Disabled by default.
  - `Continuous cleaning`: Enable continuous cleaning, which means the bot resumes the cleaning job if he needs to charge in between. Disabled by default.
  - `Safe protect`: Enable "Safe protect" feature. Disabled by default.
  - `True detect`: Enable "True detect" feature. Disabled by default.

## Vacuum

The `ecovacs` vacuum platform allows you to monitor and control your Ecovacs Deebot vacuums.

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

### Handling errors

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

### Getting device and chargers coordinates

The integration has a `raw_get_positions` action to retrieve device and chargers coordinates.

Example:

```yaml
action: ecovacs.raw_get_positions
target:
  entity_id: vacuum.deebot_n8_plus
```

{% details "Action response example" %}
The action returns a raw response with a list of coordinates available in `resp -> body -> data` like this:

```yaml
vacuum.deebot_n8_plus:
  ret: ok
  resp:
    header:
      pri: 1
      tzm: 480
      ts: "1717748487712"
      ver: 0.0.1
      fwVer: 1.2.0
      hwVer: 0.1.1
    body:
      code: 0
      msg: ok
      data:
        deebotPos:
          x: 1
          y: 5
          a: 85
          invalid: 0
        chargePos:
          - x: 5
            y: 9
            a: 85
            t: 1
            invalid: 0
        mid: "200465850"
  id: 5o81
  payloadType: j
```

{% enddetails %}

## Self-hosted configuration

Depending on your setup of the self-hosted instance, you can connect to the server using the following settings:
- `Username`: Enter the email address configured in your instance. If authentication is disabled, you can enter any valid email address.
- `Password`: Enter the password configured in your instance. If authentication is disabled, you can enter any string (series of characters).
- `REST URL`: http://`SELF_HOSTED_INSTANCE`:8007
- `MQTT URL`: mqtts://`SELF_HOSTED_INSTANCE`:8883
- `Verify MQTT SSL certificate`: disabled

Replace `SELF_HOSTED_INSTANCE` with either the IP address or the hostname of your instance.

The above configuration is based on the information from [Bumper's documentation](https://bumper.readthedocs.io).

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs stop the debug logging again (_download of debug log file will start automatically_). Further _if still possible_, please also download the [diagnostics](/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

### Your device is not supported?

Because Ecovacs doesn't provide a public documentation about their APIs, the support of devices is based on reverse engineering of the communication of the device. This reverse engineering can only be done by persons, who are in possession of such a device and the knowledge how to do the reverse engineering. Therefore the support of devices heavily depends on contributions from the community.
If your device is not supported, please request for help or contribute on your own the support of your device directly to the [`deebot_client`](https://github.com/DeebotUniverse/client.py) library.
