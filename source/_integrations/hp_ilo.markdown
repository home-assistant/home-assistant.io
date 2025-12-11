---
title: HP Integrated Lights-Out (ILO)
description: How to integrate HP ILO (Integrated Lights-Out) sensors within Home Assistant.
ha_category:
  - System monitor
ha_release: 0.27
ha_iot_class: Local Polling
ha_domain: hp_ilo
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `hp_ilo` {% term integration %} allows you to do an API call to the HP ILO (Integrated Lights-Out) sensor of your server, and use this data in Home Assistant sensors.

If the ILO or specified jsonpath query returns only a single value (e.g., a temperature or state), it will be put in the state field. If a data structure is returned, it will be placed in the `ilo_data` attribute.

Some more details about what can be retrieved from these sensors is available in the [python-hpilo documentation](https://seveas.github.io/python-hpilo/).

<p class='img'>
  <img src='/images/screenshots/hp_ilo.png' />
</p>

## Configuration

To use this integration in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hp_ilo
    host: IP_ADDRESS or HOSTNAME
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    monitored_variables:
      - name: SENSOR NAME
        sensor_type: SENSOR TYPE
```

{% configuration %}
host:
  description: The hostname or IP address on which the ILO can be reached.
  required: true
  type: string
port:
  description: The port on which the ILO can be reached.
  required: false
  default: 443
  type: string
username:
  description: The username used to connect to the ILO.
  required: true
  type: string
password:
  description: The password used to connect to the ILO.
  required: true
  type: string
monitored_variables:
  description: Sensors created from the ILO data.
  required: false
  default: Defaults to an empty list (no sensors are created).
  type: list
  keys:
    name:
      description: The sensor name.
      required: true
      type: string
    sensor_type:
      description: The sensor type, has to be one of the valid sensor types specified below.
      required: true
      type: string
    unit_of_measurement:
      description: The sensors' unit of measurement.
      required: false
      type: string
    value_template:
      description: When a Jinja2 template is specified here, the created sensor will output the template result. The ILO response can be referenced with the `ilo_data` variable.
      required: false
      type: template
{% endconfiguration %}

Valid sensor_types:
- **server_name**: Get the name of the server this iLO is managing.
- **server_fqdn**: Get the fqdn of the server this iLO is managing.
- **server_host_data**: Get SMBIOS records that describe the host.
- **server_oa_info**: Get information about the Onboard Administrator of the enclosing chassis.
- **server_power_status**: Whether the server is powered on or not.
- **server_power_readings**: Get current, min, max and average power readings.
- **server_power_on_time**: How many minutes ago has the server been powered on (Non-resetting counter, akin to hours used).
- **server_asset_tag**: Gets the server asset tag.
- **server_uid_status**: Get the status of the UID light.
- **server_health**: Get server health information.
- **network_settings**: Get the iLO network settings.

## Example

In order to get two sensors reporting CPU fan speed and Ambient Inlet Temperature, as well as a dump of `server_health` on a HP Microserver Gen8, you could use the following in your {% term "`configuration.yaml`" %} file

{% raw %}

```yaml
sensor:
  - platform: hp_ilo
    host: IP_ADDRESS or HOSTNAME
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    monitored_variables:
      - name: CPU fanspeed
        sensor_type: server_health
        unit_of_measurement: "%"
        value_template: '{{ ilo_data.fans["Fan 1"].speed[0] }}'
      - name: Inlet temperature
        sensor_type: server_health
        unit_of_measurement: "°C"
        value_template: '{{ ilo_data.temperature["01-Inlet Ambient"].currentreading[0] }}'
      - name: Server Health
        sensor_type: server_health
        value_template: '{{ ilo_data.health_at_a_glance }}'
```

{% endraw %}

<p class='img'>
  <img src='/images/screenshots/hp_ilo_sensors.png' />
</p>

## Hardware specifics

{% note %}
Not every hardware supports all values.
{% endnote %}

### HP Microserver Gen8

On this hardware you should avoid using the following sensor_types as `monitored_variables:` to prevent errors.

- `server_oa_info`
- `server_power_readings`
- `server_power_on_time`
