---
title: "KNX Climate"
description: "Instructions on how to integrate KNX thermostats with Home Assistant."
ha_category:
  - Climate
ha_release: 0.25
ha_iot_class: Local Push
ha_domain: knx
---

<div class='note'>
  
The `knx` integration must be configured correctly to use this integration, see [KNX Integration](/integrations/knx).

</div>

The `knx` climate platform is used as an interface to KNX thermostats and room controllers.

To use your KNX thermostats in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
   - platform: knx
     name: HASS-Kitchen.Temperature
     temperature_address: '5/1/1'
     setpoint_shift_address: '5/1/2'
     setpoint_shift_state_address: '5/1/3'
     target_temperature_state_address: '5/1/4'
     operation_mode_address: '5/1/5'
     operation_mode_state_address: '5/1/6'
```

Alternatively, if your device has dedicated binary group addresses for frost/night/comfort mode:

```yaml
# Example configuration.yaml entry
climate:
  - platform: knx
    name: HASS-Kitchen.Temperature
    temperature_address: '5/1/1'
    setpoint_shift_address: '5/1/2'
    setpoint_shift_state_address: '5/1/3'
    target_temperature_state_address: '5/1/4'
    operation_mode_frost_protection_address: '5/1/5'
    operation_mode_night_address: '5/1/6'
    operation_mode_comfort_address: '5/1/7'
    operation_mode_state_address: '5/1/8'
```

If your device doesn't support setpoint_shift calculations (i.e., if you don't provide a `setpoint_shift_address` value) please set the `min_temp` and `max_temp`
attributes of the climate device to avoid issues with exceeding valid temperature values in the frontend. Please do also make sure to add the `target_temperature_address`
to the configuration in this case.:

```yaml
# Example configuration.yaml entry
climate:
  - platform: knx
    name: HASS-Kitchen.Temperature
    temperature_address: '5/1/2'
    target_temperature_address: '5/1/4'
    target_temperature_state_address: '5/1/1'
    operation_mode_frost_protection_address: '5/1/5'
    operation_mode_night_address: '5/1/6'
    operation_mode_comfort_address: '5/1/7'
    operation_mode_state_address: '5/1/8'
    min_temp: 7.0
    max_temp: 32.0
```

`operation_mode_frost_protection_address` / `operation_mode_night_address` / `operation_mode_comfort_address` are not necessary if `operation_mode_address` is specified.
If the actor doesn't support explicit state communication objects the *_state_address can be configured with the same group address as the writeable *_address. The Read-Flag for the *_state_address communication object has to be set in ETS to support initial reading e.g., when starting Home Assistant.

The following values are valid for the `hvac_mode` attribute:

- Off (maps internally to HVAC_MODE_OFF within Home Assistant)
- Auto (maps internally to HVAC_MODE_AUTO within Home Assistant)
- Heat (maps internally to HVAC_MDOE_HEAT within Home Assistant)
- Cool (maps internally to HVAC_MDOE_COOL within Home Assistant)
- Fan only (maps internally to HVAC_MODE_FAN_ONLY within Home Assistant)
- Dry (maps internally to HVAC_MODE_DRY within Home Assistant)

The following presets are valid for the `preset_mode` attribute:

- Comfort (maps internally to PRESET_COMFORT within Home Assistant)
- Standby (maps internally to PRESET_AWAY within Home Assistant)
- Night (maps internally to PRESET_SLEEP within Home Assistant)
- Frost Protection (maps internally to PRESET_ECO within Home Assistant)

{% configuration %}
name:
  description: A name for this device used within Home Assistant.
  required: false
  default: KNX Climate
  type: string
temperature_address:
  description: KNX group address for reading current room temperature from KNX bus. *DPT 9.001*
  required: true
  type: string
target_temperature_address:
  description: KNX group address for setting target temperature. *DPT 9.001*
  required: false
  type: string
target_temperature_state_address:
  description: KNX group address for reading current target temperature from KNX bus. *DPT 9.001*
  required: true
  type: string
setpoint_shift_address:
  description: KNX address for setpoint_shift. *DPT 6.010*
  required: false
  type: string
setpoint_shift_state_address:
  description: KNX address for reading setpoint_shift. *DPT 6.010*
  required: false
  type: string
setpoint_shift_step:
  description: Defines the step size in Kelvin for each step of setpoint_shift.
  required: false
  default: 0.5
  type: float
setpoint_shift_min:
  description: Minimum value of setpoint shift.
  required: false
  default: -6
  type: float
setpoint_shift_max:
  description: Maximum value of setpoint shift.
  required: false
  default: 6
  type: float
operation_mode_address:
  description: KNX address for setting operation mode (Frost protection/night/comfort). *DPT 20.102*
  required: false
  type: string
operation_mode_state_address:
  description: KNX address for reading operation mode. *DPT 20.102*
  required: false
  type: string
controller_status_address:
  description: KNX address for HVAC controller status (in accordance with KNX AN 097/07 rev 3).
  required: false
  type: string
controller_status_state_address:
  description: KNX address for reading HVAC controller status.
  required: false
  type: string
controller_mode_address:
  description: KNX address for setting HVAC controller modes. *DPT 20.105*
  required: false
  type: string
controller_mode_state_address:
  description: KNX address for reading HVAC Control Mode. *DPT 20.105*
  required: false
  type: string
operation_mode_frost_protection_address:
  description: KNX address for switching on/off frost/heat protection mode.
  required: false
  type: string
operation_mode_night_address:
  description: KNX address for switching on/off night mode.
  required: false
  type: string
operation_mode_comfort_address:
  description: KNX address for switching on/off comfort mode.
  required: false
  type: string
operation_modes:
  description: Overrides the supported operation modes. Provide the supported `hvac_mode` and `preset_mode` values for your device.
  required: false
  type: list
on_off_address:
  description: KNX address for switching the climate device on/off.
  required: false
  type: string
on_off_invert:
  description: Value for switching the climate device on/off is inverted.
  required: false
  default: false
  type: boolean
on_off_state_address:
  description: KNX address for gathering the current state (on/off) of the climate device.
  required: false
  type: string
min_temp:
  description: Override the minimum temperature.
  required: false
  type: float
max_temp:
  description: Override the maximum temperature.
  required: false
  type: float
{% endconfiguration %}
