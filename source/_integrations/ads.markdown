---
title: ADS
description: Connect Home Assistant to TwinCAT devices via the ADS interface
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Hub
  - Light
  - Sensor
  - Select
  - Switch
  - Valve
ha_release: '0.60'
ha_iot_class: Local Push
ha_domain: ads
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - select
  - sensor
  - switch
  - valve
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@mrpasztoradam'
  - '@christian9712'
ha_quality_scale: legacy
---

The ADS (automation device specification) describes a device-independent and fieldbus independent interface for communication between [Beckhoff](https://www.beckhoff.com/) automation devices running [TwinCAT](https://www.beckhoff.com/en-en/products/automation/twincat/) and other devices implementing this interface.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor-1)
- [Light](#light-1)
- [Sensor](#sensor-1)
- [Switch](#switch-1)
- [Cover](#cover-1)
- [Select](#select)
- [Valve](#valve)
- [Climate](#climate-1)

<!-- omit in toc -->
## Configuration

To enable ADS, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example: Single hub configuration.yaml entry
ads:
    device: "127.0.0.1.1.1"
    port: 851
    ip_address: "192.168.1.11"
```

```yaml
# Example: Multiple hub configuration with a customized template for autodiscovery of symbols configuration.yaml entry
ads:
  - adshub: CX8190
    device: "192.168.1.11.1.1"
    port: 851
    ip_address: "192.168.1.11"
    amsnetid: "192.168.1.30.1.1" # Custom hass hub amsnetid
    timeout: 5
    retry: 15
    template:
      cover:
        fields:
          adsval_open_position: 0
          adsval_close_position: 100
          adsval_open_tilt: 100
          adsval_close_tilt: 0
          adstype: uint
      light:
        fields:
          adsval_min_brightness: 0
          adsval_max_brightness: 100
          adstype: uint
  - adshub: CX7000
    device: "192.168.1.11.1.1"
    port: 851
    amsnetid: "192.168.1.30.1.2"
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the ADS component belongs. If not set, instances will automatically increment (e.g., HUB1, HUB2, HUB3, etc.).
  type: string
  default: "HUB1"
device:
  required: true
  description: The AMS NetId that identifies the device.
  type: string
port:
  required: true
  description: The port that runs the AMS server on the device, typically 801 or 851.
  type: integer
ip_address:
  required: false
  description: The IP address of the ADS device. If not set, the first 4 bytes of the device ID will be used.
  type: string
amsnetid:
  required: false
  description: The Amsnetid of the ADS Hub in Home Assistant. If not set, the default Amsnetid will be used <Home Assistant Ip><.1.1>.
  type: string
timeout:
  required: false
  description: Timeout duration in seconds for ADS requests.
  type: integer
  default: 5
retry:
  required: false
  description: |
    Specifies the interval (in seconds) to retry establishing the ADS connection after a failure.
    
    - This is particularly useful in cases where the TwinCAT 3 system undergoes an **online change** or **restarts**, as all ADS notifications are reset in such scenarios.
    - When a connection loss is detected, Home Assistant will automatically attempt to reinitialize **all ADS notifications** to restore the communication between TwinCAT 3 and Home Assistant.
    - A lower value (e.g., `5` seconds) ensures faster recovery but may cause more frequent connection attempts, whereas a higher value (e.g., `15` seconds) reduces system load but increases reconnection time.
  type: integer
  default: 15
template:
  required: false
  description: Defines the available entity types to be automatically created based on structures in the PLC project. (See template description below)
  type: mapping
{% endconfiguration %}


### Template

The `template` parameter defines the available entity types to be automatically created based on structures in the PLC project. This allows automatic discovery and integration of compatible entities.

The `name` field (e.g., `sName`) and `devicetype` field (e.g., `eDevicetype`) are automatically read during initialization. The entity is configured accordingly, significantly reducing setup time. 
This feature is based on the soon publicly available **Tc3_IoT_BA** TwinCAT 3 library, which provides predefined structures for various Home Assistant entity types. These structures allow automatic interaction with actuators, dimmers, and other devices by directly writing and reading their states.

#### Default configuration
```yaml
template:
  light:
    name: Tc3_IoT_BA.ST_IoT_Control_Light
    fields:
      adsvar: "bOn"
      adsvar_brightness: "nBrightness"
      adsval_min_brightness: 0
      adsval_max_brightness: 100
      adsvar_color_temp_kelvin: "nColorTemperature"
      adsval_min_color_temp_kelvin: 2000
      adsval_max_color_temp_kelvin: 6500
      adsvar_hue: "nHue"
      adsvar_saturation: "nSaturation"
      adsvar_color_mode: "eActiveColorMode"
      adsvar_name: "sName"
      adstype: "uint"
      adstype_mode: "uint"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
  switch:
    name: Tc3_IoT_BA.ST_IoT_Control_Switch
    fields:
      adsvar: "bOn"
      adsvar_name: "sName"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
  climate:
    name: Tc3_IoT_BA.ST_IoT_Control_Thermostat
    fields:
      adsvar_current_temperature: "rCurrentTemperature"
      adsvar_target_temperature: "rTargetTemperature"
      adsval_min_temp: 7.0
      adsval_max_temp: 31.0
      unit_of_measurement: "°C"
      adsvar_hvac_mode: "eActiveHVACMode"
      factor: 1
      adsvar_name: "sName"
      adstype: "real"
      adstype_mode: "uint"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
  cover:
    name: Tc3_IoT_BA.ST_IoT_Control_Blind
    fields:
      adsvar: "bClosed"
      adsvar_position: "nCurrentPosition"
      adsvar_set_position: "nTargetPosition"
      adsval_open_position: 0
      adsval_close_position: 100
      adsvar_tilt: "nCurrentTiltAngle"
      adsvar_set_tilt: "nTargetTiltAngle"
      adsval_open_tilt: 100
      adsval_close_tilt: 0
      adsvar_open: "bPositionUp"
      adsvar_close: "bPositionDown"
      adsvar_stop: "bHoldPosition"
      adsvar_open_tilt: "bAngleLimitDown"
      adsvar_close_tilt: "bAngleLimitUp"
      adsvar_name: "sName"
      adstype: "uint"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
  sensor:
    name: Tc3_IoT_BA.ST_IoT_Control_Sensor
    fields:
      adsvar: "fValue"
      unit_of_measurement: "°C"
      factor: 1
      state_class: "measurement"
      adsvar_name: "sName"
      adstype: "real"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
  binary_sensor:
    name: Tc3_IoT_BA.ST_IoT_Control_Sensor
    fields:  
      adsvar: "bOn"
      adsvar_name: "sName"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
  valve:
    name: Tc3_IoT_BA.ST_IoT_Control_Valve
    fields:  
      adsvar: "bOn"
      adsvar_name: "sName"
      adsvar_devicetype: "eDeviceType"
      adsvar_error: "eError"
```

#### Base Control Structure Definition

The following TwinCAT 3 structure defines the base control parameters for ADS devices. It includes a device name and error code, serving as the foundation for extended control structures.

##### Base structure
```plaintext
TYPE ST_IoT_Control :
    STRUCT
        {attribute 'TcEncoding':='UTF-8'}
        sName  : STRING; (* RW / Name of the device*)
        eError : UINT;
    END_STRUCT
END_TYPE
```
##### Binary Sensor
```plaintext 
TYPE ST_IoT_Control_BinarySensor EXTENDS ST_IoT_Control :
    STRUCT
        bOn         : BOOL; (* R / Binary state for the sensor: 0=Inactive (e.g., no motion), 1=Active (e.g., motion detected). *)
        eDeviceType : E_IoT_BinarySensorType; (* R / Type of the sensor device, based on the `E_IoT_BinarySensorType` enumeration. *)
    END_STRUCT
END_TYPE
```
```plaintext
{attribute 'qualified_only'}
{attribute 'strict'}
{attribute 'to_string'}
TYPE E_IoT_BinarySensorType : (
        None            := 0, // No specific functionality assigned.
        Battery         := 1, // Indicates battery status.
        BatteryCharging := 2, // Indicates battery charging state.
        CarbonMonoxide  := 3, // Detects carbon monoxide.
        Cold            := 4, // Indicates cold conditions.
        Connectivity    := 5, // Monitors connectivity status.
        Door            := 6, // Indicates door open/close status.
        GarageDoor      := 7, // Indicates garage door open/close status.
        Gas             := 8, // Detects gas presence.
        Heat            := 9, // Indicates heat conditions.
        Light           := 10, // Detects light levels.
        Lock            := 11, // Monitors lock/unlock status.
        Moisture        := 12, // Detects moisture or water presence.
        Motion          := 13, // Detects motion.
        Moving          := 14, // Indicates movement status.
        Occupancy       := 15, // Detects occupancy.
        Opening         := 16, // Monitors opening/closing status.
        Plug            := 17, // Monitors plug connection status.
        Power           := 18, // Indicates power presence.
        Presence        := 19, // Detects presence of an entity.
        Problem         := 20, // Indicates a problem or fault.
        Running         := 21, // Indicates a running status.
        Safety          := 22, // Monitors safety conditions.
        Smoke           := 23, // Detects smoke presence.
        Sound           := 24, // Detects sound levels.
        Tamper          := 25, // Indicates tampering.
        Update          := 26, // Indicates available updates.
        Vibration       := 27, // Detects vibration.
        Window          := 28 // Indicates window open/close status.
    ) UINT;
END_TYPE
```
##### Cover
```plaintext
TYPE ST_IoT_Control_Blind EXTENDS ST_IoT_Control :
    STRUCT
        nTargetPosition   : UINT; (* RW / 0-100% / Step 1% / Target position of the blind covering drive *)
        nCurrentPosition  : UINT; (* R / 0-100% / Step 1% / Current position of the blind covering drive *)
        nTargetTiltAngle  : UINT; (* RW / 0-100% / Step 1% / Target angle of the horizontal slats (Venetian blinds) *)
        nCurrentTiltAngle : UINT; (* R / 0-100% / Step 1% / Current angle of the horizontal slats (Venetian blinds) *)
        nPositionState    : UINT; (* R / 0: Going to the minimum 1: Going to the maximum 2: Stopped / Status of the blind position *)
        bHoldPosition     : BOOL; (* W / Stop at the current position / Command to hold the current position *)
        bPositionUp       : BOOL; (* W / Command to move the blind upwards *)
        bPositionDown     : BOOL; (* W / Command to move the blind downwards *)
        bAngleLimitUp     : BOOL; (* W / Command to move the tilt angle to the upper limit (Venetian blinds) *)
        bAngleLimitDown   : BOOL; (* W / Command to move the tilt angle to the lower limit (Venetian blinds) *)
        bClosed           : BOOL; (* R / The blind is fully closed *)
        eDeviceType       : E_IoT_BlindType; (* R / Type of blind (Roller, Venetian, etc.) *)
    END_STRUCT
END_TYPE
```
```plaintext
{attribute 'qualified_only'}
{attribute 'strict'}
{attribute 'to_string'}
TYPE E_IoT_BlindType : (
        None    := 0, // No specific functionality assigned.
        Awning  := 1, // Awning functionality.
        Blind   := 2, // Generic blind functionality.
        Curtain := 3, // Curtain functionality.
        Damper  := 4, // Damper for ventilation systems.
        Door    := 5, // Door cover functionality.
        Garage  := 6, // Garage door functionality.
        Gate    := 7, // Gate functionality.
        Shade   := 8, // Shade functionality (e.g., roll-down).
        Shutter := 9, // Window shutter functionality.
        Window  := 10 // Standard vertical window cover functionality.
    ) UINT;
END_TYPE
```
##### Light
```plaintext
TYPE ST_IoT_Control_Light EXTENDS ST_IoT_Control :
    STRUCT
        bOn               : BOOL; (* RW / On/off state of the device. *)
        nBrightness       : UINT; (* RW / Brightness level of the light in percentage (0-100%). Incremental steps: 1%. *)
        nColorTemperature : UINT; (* RW / Color temperature of the light in Kelvin. Default range: 2400-6500. 0 indicates no setting. Incremental steps: 1. *)
        nHue              : UINT; (* RW / Hue of the light color in degrees (0-360°). Incremental steps: 1°. Used for full color control. *)
        nSaturation       : UINT; (* RW / Saturation level of the light color in percentage (0-100%). Incremental steps: 1%. *)
        eActiveColorMode  : E_Iot_LightType; (* R / Active Mode of light. *)
        eDeviceType       : E_Iot_LightType; (* R / Type of light functionality provided by the device. See E_Iot_LightType for details. *)
    END_STRUCT
END_TYPE
```
Supported light features `"eDeviceType"` in this case, can be combined using a bitwise OR operation. For instance, if a light supports both basic on/off control and brightness adjustment, you can represent this as: `E_IoT_LightType.OnOff OR E_IoT_LightType.Brightness`.

Below is the definition of the `E_IoT_LightType` enumeration that can be used for this purpose:


```plaintext
{attribute 'qualified_only'}
{attribute 'to_string'}
TYPE E_IoT_LightType : (
        None       := 0, // No specific functionality assigned.
        OnOff      := 1, // Supports basic on/off control.
        Brightness := 2, // Brightness adjustment is available.
        ColorTemp  := 4, // Allows adjustment of white color temperature.
        HS         := 8, // Supports color control (Hue/Saturation).
    ) UINT;
END_TYPE
```
##### Sensor
```plaintext
TYPE ST_IoT_Control_Sensor EXTENDS ST_IoT_Control :
    STRUCT
        fValue      : REAL; (* R / Sensor measurement value (e.g., temperature, humidity, light intensity). *)
        eDeviceType : E_IoT_SensorType; (* R / Type of the sensor device, based on the `E_IoT_SensorType` enumeration. *)
    END_STRUCT
END_TYPE
```
```plaintext
{attribute 'qualified_only'}
{attribute 'strict'}
{attribute 'to_string'}
TYPE E_IoT_SensorType : (
        None                          := 0, // No specific functionality assigned.
        ApparentPower                 := 1, // Apparent power (VA).
        AQI                           := 2, // Air Quality Index (None).
        AtmosphericPressure           := 3, // Atmospheric pressure (Pa, hPa, bar).
        Battery                       := 4, // Battery level (%).
        BloodGlucoseConcentration     := 5, // Blood glucose concentration (mg/dL, mmol/L).
        CarbonMonoxide                := 6, // Carbon Monoxide (ppm).
        CarbonDioxide                 := 7, // Carbon Dioxide (ppm).
        Conductivity                  := 8, // Conductivity (S/cm, mS/cm, µS/cm).
        Current                       := 9, // Electric current (A, mA).
        DataRate                      := 10, // Data rate (bps, kbps, Mbps).
        DataSize                      := 11, // Data size (bytes, MB, GB).
        Distance                      := 12, // Distance (m, cm, mm).
        Duration                      := 13, // Duration (s, ms, h).
        Energy                        := 14, // Energy (Wh, kWh, J).
        EnergyStorage                 := 15, // Stored energy (Wh, kWh, J).
        Frequency                     := 16, // Frequency (Hz, kHz).
        Gas                           := 17, // Gas volume (m³, ft³).
        Humidity                      := 18, // Humidity (%).
        Illuminance                   := 19, // Illuminance (lx).
        Irradiance                    := 20, // Irradiance (W/m²).
        Moisture                      := 21, // Moisture (%).
        Monetary                      := 22, // Monetary value (ISO4217 currency code).
        NitrogenDioxide               := 23, // Nitrogen Dioxide (µg/m³).
        NitrogenMonoxide              := 24, // Nitrogen Monoxide (µg/m³).
        NitrousOxide                  := 25, // Nitrous Oxide (µg/m³).
        Ozone                         := 26, // Ozone concentration (µg/m³).
        PH                            := 27, // Acidity/alkalinity (pH).
        PM1                           := 28, // Particulate matter <= 1 μm (µg/m³).
        PM10                          := 29, // Particulate matter <= 10 μm (µg/m³).
        PM25                          := 30, // Particulate matter <= 2.5 μm (µg/m³).
        PowerFactor                   := 31, // Power factor (%).
        Power                         := 32, // Power (W, kW).
        Precipitation                 := 33, // Accumulated precipitation (mm, cm).
        PrecipitationIntensity        := 34, // Precipitation intensity (mm/h).
        Pressure                      := 35, // Pressure (Pa, hPa, bar).
        ReactivePower                 := 36, // Reactive power (var).
        SignalStrength                := 37, // Signal strength (dBm).
        SoundPressure                 := 38, // Sound pressure level (dB).
        Speed                         := 39, // Speed (m/s, km/h).
        SulphurDioxide                := 40, // Sulphur Dioxide (µg/m³).
        Temperature                   := 41, // Temperature (°C, °F, K).
        VolatileOrganicCompounds      := 42, // VOC concentration (µg/m³).
        VolatileOrganicCompoundsParts := 43, // VOC ratio (ppm, ppb).
        Voltage                       := 44, // Voltage (V, mV).
        Volume                        := 45, // Volume (L, m³).
        VolumeStorage                 := 46, // Stored volume (L, m³).
        VolumeFlowRate                := 47, // Flow rate (m³/h, L/min).
        Water                         := 48, // Water volume (L, m³).
        Weight                        := 49, // Weight (kg, g, lb).
        WindSpeed                     := 50 // Wind speed (m/s, km/h).
    ) UINT;
END_TYPE
```
##### Switch
```plaintext
TYPE ST_IoT_Control_Switch EXTENDS ST_IoT_Control :
    STRUCT
        bOn         : BOOL; (* RW / Switch state: 0=Off, 1=On. *)
        eDeviceType : E_Iot_SwitchType; (* R / Specifies the type of the switch device, based on `E_Iot_SwitchType`. *)
    END_STRUCT
END_TYPE
```
```plaintext
{attribute 'qualified_only'}
{attribute 'strict'}
{attribute 'to_string'}
TYPE E_IoT_SwitchType : (
        None   := 0, // No specific functionality assigned.
        Switch := 1, // Generic switch functionality.
        Plug   := 2, // Basic on/off functionality for a plug.
        Scene  := 3, // Represents a scene for controlling multiple devices.
        Group  := 4 // Represents a group of devices controlled together.
    ) UINT;
END_TYPE
```
##### Climate

```plaintext
TYPE ST_IoT_Control_Thermostat EXTENDS ST_IoT_Control :
    STRUCT
        rCurrentTemperature : REAL; (* R / Current temperature in Celsius (-99.0°C to 100.0°C, step size 0.1°C). *)
        rTargetTemperature  : REAL; (* RW / Desired target temperature in Celsius (10.0°C to 38.0°C, step size 0.1°C). *)
        eActiveHVACMode     : E_Iot_ThermostatType; (* RW / Current operating mode of the thermostat, based on `E_Iot_ThermostatType`. *)
        eDeviceType         : E_Iot_ThermostatType; (* R / Supported HVAC modes, represented as a combination of `E_Iot_ThermostatType` values. *)
    END_STRUCT
END_TYPE
```
For climate devices, supported HVAC modes `"eDeviceType"`can be combined using a bitwise OR operation. For example, if a thermostat supports both cooling and heating, you can represent its modes as: `E_Iot_ThermostatType.Cool OR E_Iot_ThermostatType.Heat`.
Below are the TwinCAT 3 structure and enumeration definitions:

```plaintext
{attribute 'qualified_only'}
{attribute 'to_string'}
TYPE E_Iot_ThermostatType : (
        None     := 0, // No specific functionality assigned.
        Off      := 1, // Thermostat supports off mode.
        Cool     := 2, // Cooling mode only.
        Heat     := 4, // Heating mode only.
        HeatCool := 8, // Combined heating and cooling mode.
        Auto     := 16, // Automatic mode for thermostat operation.
        Dry      := 32, // Drying mode to reduce humidity.
        FanOnly  := 64, // Fan-only mode for air circulation.
    ) UINT;
END_TYPE

```

{% configuration %}
template:
  required: false
  description: |
    Defines the available entity types that are automatically created based on the structures in the PLC project.

    - Each entity type corresponds to a predefined TwinCAT 3 structure, enabling direct interaction with actuators, sensors, dimmers, and other components.
    - Only the variables within the structure defined by `name` need to be specified.
    - Entities are automatically named using the `sName` field, reducing manual configuration effort. Their type (e.g., supported features for climate & light, or device class for sensors and switches) is determined by the `eDeviceType` field. If the `sName` field is not set, the entity is ignored.

  type: mapping
  default: {}

  fields:
    light:
      required: false
      description: Configuration for light entities, including brightness, color temperature, and on/off states.
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all light-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Light"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar:
              required: false
              description: The variable inside the structure that controls the light state (on/off).
              type: string
              default: "bOn"
            adsvar_brightness:
              required: false
              description: The variable inside the structure that controls brightness.
              type: string
              default: "nBrightness"
            adsval_min_brightness:
              required: false
              description: Minimum brightness value.
              type: integer
              default: 0
            adsval_max_brightness:
              required: false
              description: Maximum brightness value.
              type: integer
              default: 100
            adsvar_color_temp_kelvin:
              required: false
              description: The variable inside the structure that controls the color temperature in Kelvin.
              type: string
              default: "nColorTemperature"
            adsval_min_color_temp_kelvin:
              required: false
              description: Minimum color temperature in Kelvin.
              type: integer
              default: 2000
            adsval_max_color_temp_kelvin:
              required: false
              description: Maximum color temperature in Kelvin.
              type: integer
              default: 6500
            adsvar_hue:
              required: false
              description: The variable inside the structure that controls hue.
              type: string
              default: "nHue"
            adsvar_saturation:
              required: false
              description: The variable inside the structure that controls saturation.
              type: string
              default: "nSaturation"
            adsvar_color_mode:
              required: false
              description: The variable inside the structure that defines the active color mode.
              type: string
              default: "eActiveColorMode"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adstype:
              required: false
              description: The ADS data type used for communication. It applies to `adsvar_brightness`, `adsvar_color_temp_kelvin`, `adsvar_hue`, and `adsvar_saturation` to ensure compatibility with the PLC.
              type: string
              default: "uint"
            adstype_mode:
              required: false
              description: ADS type mode.
              type: string
              default: "uint"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"
    switch:
      required: false
      description: Configuration for switch entities that control binary states (on/off).
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all switch-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Switch"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar:
              required: false
              description: The variable inside the structure that controls the switch state (on/off).
              type: string
              default: "bOn"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"
    climate:
      required: false
      description: Configuration for thermostat entities that control temperature and HVAC modes.
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all climate-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Thermostat"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar_current_temperature:
              required: false
              description: The variable inside the structure that stores the current temperature.
              type: string
              default: "rCurrentTemperature"
            adsvar_target_temperature:
              required: false
              description: The variable inside the structure that sets the target temperature.
              type: string
              default: "rTargetTemperature"
            adsval_min_temp:
              required: false
              description: Minimum allowed temperature.
              type: float
              default: 7.0
            adsval_max_temp:
              required: false
              description: Maximum allowed temperature.
              type: float
              default: 31.0
            factor:
              required: false
              description: A factor that divides the stored value before displaying it in Home Assistant.
              type: integer
              default: None
            unit_of_measurement:
              required: false
              description: The unit of the measured values (e.g., "°C" for temperature, "m" for meters).
              type: string
            adsvar_hvac_mode:
              required: false
              description: The variable inside the structure that controls the HVAC mode.
              type: string
              default: "eActiveHVACMode"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adstype:
              required: false
              description: Data type of the ADS variable.
              type: string
              default: "real"
            adstype_mode:
              required: false
              description: ADS type mode.
              type: string
              default: "uint"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"
    cover:
      required: false
      description: Configuration for cover entities, such as blinds or shutters.
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all cover-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Blind"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar:
              required: false
              description: The variable inside the structure that stores the cover state (open/closed).
              type: string
              default: "bClosed"
            adsvar_position:
              required: false
              description: The variable inside the structure that stores the current position.
              type: string
              default: "nCurrentPosition"
            adsvar_set_position:
              required: false
              description: The variable inside the structure that sets the target position.
              type: string
              default: "nTargetPosition"
            adsval_open_position:
              required: false
              description: |
                The minimum position value for the ADS system. This defines the lowest limit for the cover's position.
                If your PLC uses an inverted position scale (`0` = open, `100` = closed), you can swap `adsval_open_position` 
                and `adsval_close_position` to match Home Assistant's convention.
              type: integer
              default: 0
            adsval_close_position:
              required: false
              description: |
                The maximum position value for the ADS system. This defines the highest limit for the cover's position.
                If your PLC uses an inverted position scale (`0` = open, `100` = closed), swapping `adsval_open_position` 
                and `adsval_close_position` will ensure correct scaling.
              type: integer
              default: 100
            adsvar_tilt:
              required: false
              description: The variable inside the structure that controls the tilt angle.
              type: string
              default: "nCurrentTiltAngle"
            adsvar_set_tilt:
              required: false
              description: The variable inside the structure that sets the target tilt angle.
              type: string
              default: "nTargetTiltAngle"
            adsval_open_tilt:
              required: false
              description: |
                The minimum tilt value for the ADS system. Defines the lower tilt limit.
                If your PLC uses an inverted tilt scale, swapping `adsval_open_tilt` and `adsval_close_tilt` 
                will correct the scaling.
              type: integer
              default: 100
            adsval_close_tilt:
              required: false
              description: |
                The maximum tilt value for the ADS system. Defines the upper tilt limit.
                If your PLC uses an inverted tilt scale, swapping `adsval_open_tilt` and `adsval_close_tilt` 
                will ensure correct alignment with Home Assistant.
              type: integer
              default: 0
            adsvar_open:
              required: false
              description: The variable inside the structure that opens the cover.
              type: string
              default: "bPositionUp"
            adsvar_close:
              required: false
              description: The variable inside the structure that closes the cover.
              type: string
              default: "bPositionDown"
            adsvar_stop:
              required: false
              description: The variable inside the structure that stops the cover movement.
              type: string
              default: "bHoldPosition"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adstype:
              required: false
              description: The ADS data type used for communication. It applies to `adsvar_position`, `adsvar_set_position`, `adsvar_tilt`, and `adsvar_set_tilt` to ensure compatibility with the PLC.
              type: string
              default: "uint"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"
    sensor:
      required: false
      description: Configuration for sensor entities that read values from TwinCAT 3.
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all sensor-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Sensor"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar:
              required: false
              description: The variable inside the structure that stores the sensor value.
              type: string
              default: "fValue"
            factor:
              required: false
              description: A factor that divides the stored value before displaying it in Home Assistant.
              type: integer
              default: None
            unit_of_measurement:
              required: false
              description: The unit of the measured values (e.g., "°C" for temperature, "m" for meters).
              type: string
            state_class:
              required: false
              description: Sets the [class of the state](/integrations/sensor/), If not None, the sensor is assumed to be numerical and will be displayed as a line-chart in the frontend instead of as discrete values.
              type: string
              default: "measurement"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adstype:
              required: false
              description: Data type of the ADS variable.
              type: string
              default: "real"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"
    binary_sensor:
      required: false
      description: Configuration for binary sensor entities, such as motion detectors or contact switches.
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all binary sensor-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Sensor"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar:
              required: false
              description: The variable inside the structure that stores the binary sensor state.
              type: string
              default: "bOn"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"

    valve:
      required: false
      description: Configuration for valve entities that control the flow of a medium.
      type: mapping
      fields:
        name:
          required: false
          description: The TwinCAT 3 structure that contains all valve-related variables.
          type: string
          default: "Tc3_IoT_BA.ST_IoT_Control_Valve"
        fields:
          required: false
          type: mapping
          description: Defines the ADS variables within the specified structure.
          fields:
            adsvar:
              required: false
              description: The variable inside the structure that stores the valve state (open/closed).
              type: string
              default: "bOn"
            adsvar_name:
              required: false
              description: The variable inside the structure that stores the entity name.
              type: string
              default: "sName"
            adsvar_devicetype:
              required: false
              description: The variable inside the structure that defines the device type.
              type: string
              default: "eDeviceType"
            adsvar_error:
              required: false
              description: The variable inside the structure that stores the device error state.
              type: string
              default: "eError"
    
{% endconfiguration %}



<!-- omit in toc -->
## Action

The `ads` integration registers the `write_data_by_name` action, allowing you to write a value to a variable on your ADS device.

### Example Usage

```json
{
    "adshub": "HUB1",
    "adsvar": ".global_var",
    "adstype": "int",
    "value": 100
}
```

### Action Parameters

- **adshub** *(optional)*: The name of the ADS adshub to target. Default is `HUB1`.
- **adsvar** *(required)*: The name of the variable on the ADS device.
- **adstype** *(required)*: The data type of the variable. Supported types:
  - `bool`, `byte`, `dint`, `int`, `udint`, `uint`, `sint`, `usint`, `word`, `dword`, `lreal`, `real`, `string`, `time`, `date`, `dt`, `tod`
- **value** *(required)*: The value that will be written to the variable.

{% configuration %}
write_data_by_name:
  name: "Write data by name"
  description: "Write a value to the connected ADS device."
  fields:
    adshub:
      description: "The name of the ADS adshub to target. (Default = HUB1)"
      example: "HUB1"
      selector:
        text:
    adsvar:
      description: "The name of the variable to write to."
      example: ".global_var"
      selector:
        text:
    adstype:
      description: "The data type of the variable to write to."
      example: "bool"
      selector:
        select:
          options:
            - "bool"
            - "byte"
            - "dint"
            - "int"
            - "udint"
            - "uint"
            - "sint"
            - "usint"
            - "word"
            - "dword"
            - "lreal"
            - "real"
            - "string"
            - "time"
            - "date"
            - "dt"
            - "tod"
    value:
      description: "The value to write to the variable."
      example: "100"
      selector:
        text:
{% endconfiguration %}

## Binary Sensor

The `ads` binary sensor platform allows monitoring a boolean value on your ADS device.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ads
    adshub: HUB1
    adsvar: .boolean1
    name: Door Sensor
    device_class: door
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the binary sensor belongs.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the variable to be monitored on the ADS device.
  type: string
name:
  required: false
  description: An identifier for the binary sensor in the frontend.
  type: string
device_class:
  required: false
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  type: string
{% endconfiguration %}


## Light

The `ads` light platform allows you to control your connected ADS lights.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: ads
    adshub: HUB1
    adsvar: GVL.enable_light
    adsvar_brightness: GVL.brightness
    adsvar_color_temp_kelvin: GVL.color_temp_kelvin
    adsvar_hue: GVL.hue
    adsvar_saturation: GVL.saturation
    adsvar_color_mode: GVL.color_mode
    adstype: byte
    adstype_mode: uint
    adsval_min_brightness: 0
    adsval_max_brightness: 255
    adsval_min_color_temp_kelvin: 2000
    adsval_max_color_temp_kelvin: 6500
```


{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the ADS component belongs.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the boolean variable that switches the light on.
  type: string
adsvar_brightness:
  required: false
  description: The name of the variable that controls the brightness, use an unsigned integer on the PLC side.
  type: string
adsvar_color_temp_kelvin:
  required: false
  description: The name of the variable that controls the color temperature in Kelvin.
  type: string
adsvar_hue:
  required: false
  description: The name of the variable that controls the hue.
  type: string
adsvar_saturation:
  required: false
  description: The name of the variable that controls the saturation.
  type: string
adsvar_color_mode:
  required: false
  description: The name of the variable that controls the color mode.
  type: string
adstype:
  required: false
  description: The ADS data type used for communication. It applies to `adsvar_brightness`, `adsvar_color_temp_kelvin`, `adsvar_hue`, and `adsvar_saturation` to ensure compatibility with the PLC.
  type: string
  default: "byte"
adstype_mode:
  required: false
  description: The ADS data type used for mode communication, applicable only to the color mode variable.
  type: string
  default: "uint"
adsval_min_brightness:
  required: false
  description: The minimum brightness value. This setting defines the lowest brightness level that will be sent to the TwinCAT system. Home Assistant scales its brightness values (0-255) to the range defined between `adsval_min_brightness` and `adsval_max_brightness`, ensuring correct dimming behavior in TwinCAT.
  type: integer
  default: 0
adsval_max_brightness:
  required: false
  description: The maximum brightness value. This setting defines the highest brightness level that will be sent to the TwinCAT system. The brightness range from Home Assistant (0-255) is mapped to the ADS range (`adsval_min_brightness` - `adsval_max_brightness`), allowing fine control over dimming behavior.
  type: integer
  default: 255
adsval_min_color_temp_kelvin:
  required: false
  description: The minimum color temperature in Kelvin.
  type: integer
  default: 2000
adsval_max_color_temp_kelvin:
  required: false
  description: The maximum color temperature in Kelvin.
  type: integer
  default: 6500
name:
  required: false
  description: An identifier for the Light in the frontend.
  type: string
{% endconfiguration %}

**Color Mode Mapping**

The ADS light integration supports multiple color modes that can be mapped between Home Assistant and TwinCAT. The mapping is based on predefined integer values:

| TwinCAT Integer Value | Home Assistant Color Mode |
|----------------------|-------------------------|
| 1                    | ONOFF                   |
| 2                    | BRIGHTNESS              |
| 4                    | COLOR_TEMP              |
| 8                    | HS                      |

If your PLC uses different values, you will need to adjust them accordingly in the PLC program.

**PLC ENUM Definition**

Ensure that your ENUM variable is properly defined in TwinCAT 3:

```plaintext
TYPE E_ColorMode :
(
    eOnOff := 1,
    eBrightness := 2,
    eColorTemp := 4,
    eHS := 8
) UINT;
END_TYPE
```

## Sensor

The `ads` sensor platform allows reading the value of a numeric variable from your ADS device. Supported data types include: *BOOL*, *BYTE*, *INT*, *UINT*, *SINT*, *USINT*, *DINT*, *UDINT*, *WORD*, *DWORD*, *REAL*, and *LREAL*.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ads
    adshub: HUB1
    adsvar: GVL.temperature
    adstype: int
    unit_of_measurement: "°C"
    factor: 100
    device_class: temperature
    state_class: measurement
    name: Temperature
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the sensor belongs.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the variable to be read.
  type: string
adstype:
  required: false
  description: The data type of the ADS variable. Possible values: *bool*, *byte*, *int*, *uint*, *sint*, *usint*, *dint*, *udint*, *word*, *dword*, *real*, *lreal*.
  type: string
  default: int
factor:
  required: false
  description: A factor that divides the stored value before displaying it in Home Assistant.
  type: integer
  default: 1
unit_of_measurement:
  required: false
  description: The unit of the measured values (e.g., "°C" for temperature, "m" for meters).
  type: string
device_class:
  required: false
  description: Sets the [class of the device](/integrations/sensor/), changing the device state and icon that is displayed on the frontend.
  type: string
state_class:
  required: false
  description: Sets the [class of the state](/integrations/sensor/), If not None, the sensor is assumed to be numerical and will be displayed as a line-chart in the frontend instead of as discrete values.
  type: string
  default: "measurement"
name:
  required: false
  description: An identifier for the sensor in the frontend.
  type: string
{% endconfiguration %}


The *factor* can be used to implement fixed decimal places. For example, set *factor* to `100` if you want to display a fixed decimal value with two decimal places. A stored value of `123` will then be displayed as `1.23`.

## Switch

The `ads` switch platform allows controlling a boolean variable on the connected ADS device. The variable is identified by its name and directly mapped to the Home Assistant switch entity.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ads
    adshub: HUB1
    adsvar: GVL.light_switch
    device_class: switch
```

{% configuration %}
adshub:
  required: false
  description: The homeassitant adshub name of the ADS Switch belongs to.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the boolean variable on the ADS device that controls the switch.
  type: string
name:
  required: false
  description: An identifier for the switch in the frontend.
  type: string
device_class:
  required: false
  description: Defines the type of switch entity (`switch` or `outlet`). This field is automatically determined if using structured ADS data.
  type: string
  default: "switch"
{% endconfiguration %}

## Cover

The `ads` cover platform allows you to control your connected ADS covers, with tilt functionality.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: ads
    adshub: HUB1
    adsvar: covers.master_bed_room_is_closed
    adsvar_open: covers.master_bed_room_open
    adsvar_close: covers.master_bed_room_close
    adsvar_stop: covers.master_bed_room_stop
    adstype: byte
    adsvar_position: covers.master_bed_room_position
    adsvar_set_position: covers.master_bed_room_set_position
    adsval_open_position: 0
    adsval_close_position: 100
    adsvar_tilt: covers.master_bed_room_tilt
    adsvar_set_tilt: covers.master_bed_room_set_tilt
    adsvar_open_tilt: covers.master_bed_room_open_tilt
    adsvar_close_tilt: covers.master_bed_room_close_tilt
    adsval_open_tilt: 0
    adsval_close_tilt: 100
    name: Curtain master bed room
    device_class: curtain
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the ADS component belongs.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the boolean variable that returns the current status of the cover (`True` = closed).
  type: string
adsvar_open:
  required: false
  description: The name of the boolean variable that triggers the cover to open.
  type: string
adsvar_close:
  required: false
  description: The name of the boolean variable that triggers the cover to close.
  type: string
adsvar_stop:
  required: false
  description: The name of the boolean variable that triggers the cover to stop.
  type: string
adstype:
  required: false
  description: The ADS data type used for communication. It applies to `adsvar_position`, `adsvar_set_position`, `adsvar_tilt`, and `adsvar_set_tilt` to ensure compatibility with the PLC.
  type: string
  default: "byte"
adsvar_position:
  required: false
  description: The name of the variable that returns the current cover position. Use a numeric variable on the PLC side. Home Assistant defines positions with `100` as fully open and `0` as fully closed, but some PLC systems use the opposite convention (`0` = open, `100` = closed). If your PLC uses an inverted scale, you can swap `adsval_open_position` and `adsval_close_position` to align the scaling correctly.
  type: string
adsvar_set_position:
  required: false
  description: The name of the variable that sets the new cover position. Use a numeric variable on the PLC side. Scaling between Home Assistant and ADS is handled automatically based on `adsval_open_position` and `adsval_close_position`.
  type: string
adsval_open_position:
  required: false
  description: The minimum position value for the ADS system. This defines the lowest limit for the cover's position. If your PLC uses an inverted position scale (`0` = open, `100` = closed), you can swap `adsval_open_position` and `adsval_close_position` to match Home Assistant's convention.
  type: integer
  default: 100
adsval_close_position:
  required: false
  description: The maximum position value for the ADS system. This defines the highest limit for the cover's position. If your PLC uses an inverted position scale (`0` = open, `100` = closed), swapping `adsval_open_position` and `adsval_close_position` will ensure correct scaling.
  type: integer
  default: 0
adsvar_tilt:
  required: false
  description: The name of the variable that returns the current tilt position of the cover. Use a numeric variable on the PLC side. Home Assistant defines tilt with `0` as fully closed and `100` as fully open, but some PLC systems use an inverted scale. If needed, swap `adsval_open_tilt` and `adsval_close_tilt` to align with your PLC configuration.
  type: string
adsvar_set_tilt:
  required: false
  description: The name of the variable that sets the new tilt position. Use a numeric variable on the PLC side. Scaling between Home Assistant and ADS is handled based on `adsval_open_tilt` and `adsval_close_tilt`.
  type: string
adsval_open_tilt:
  required: false
  description: The minimum tilt value for the ADS system. Defines the lower tilt limit. If your PLC uses an inverted tilt scale, swapping `adsval_open_tilt` and `adsval_close_tilt` will correct the scaling.
  type: integer
  default: 0
adsval_close_tilt:
  required: false
  description: The maximum tilt value for the ADS system. Defines the upper tilt limit. If your PLC uses an inverted tilt scale, swapping `adsval_open_tilt` and `adsval_close_tilt` will ensure correct alignment with Home Assistant.
  type: integer
  default: 100
adsvar_open_tilt:
  required: false
  description: The name of the boolean variable that triggers the tilt to open.
  type: string
adsvar_close_tilt:
  required: false
  description: The name of the boolean variable that triggers the tilt to close.
  type: string
name:
  required: false
  description: An identifier for the Cover in the frontend.
  type: string
device_class:
  required: false
  description: Sets the [class of the device](/integrations/cover/), changing the device state and icon that is displayed on the frontend.
  type: device_class
{% endconfiguration %}




## Select

The `ads` select entity allows controlling an ENUM (integer) variable on the connected ADS device. The variable is identified by its name and must be defined as an ENUM type in the TwinCAT PLC. It is recommended to use explicit values starting from `0` to ensure consistent mapping between Home Assistant and the TwinCAT system.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
select:
  - platform: ads
    adshub: HUB1
    adsvar: GVL.mode_select
    options:
      - "Off"
      - "Setup"
      - "Automatic"
      - "Manual"
      - "Error"
    name: "Operating Mode"
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the ADS component belongs.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the ENUM variable on the ADS device that defines the select entity.
  type: string
name:
  required: false
  description: An identifier for the select entity in the frontend.
  type: string
options:
  required: true
  description: A list of human-readable options corresponding to the ENUM values defined in the TwinCAT PLC.
  type: list
{% endconfiguration %}

 **TwinCAT 3 ENUM Definition**

Ensure that your ENUM variable is properly defined in TwinCAT 3, with explicitly assigned integer values starting from `0`:

```plaintext
# Example TwinCAT 3 structure definition
TYPE E_SampleA :
(
    eOff := 0,
    eSetup := 1,
    eAutomatic := 2,
    eManual := 3,
    eError := 4
);
END_TYPE
```


## Valve

The `ads` valve entity allows controlling a boolean variable on the connected ADS device. The variable is identified by its name and mapped to a valve entity in Home Assistant.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
valve:
  - platform: ads
    adshub: HUB1
    adsvar: MAIN.bValveControl
    device_class: water
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the ADS component belongs.
  type: string
  default: "HUB1"
adsvar:
  required: true
  description: The name of the boolean variable on the ADS device that controls the valve.
  type: string
name:
  required: false
  description: An identifier for the valve in the frontend.
  type: string
device_class:
  required: false
  description: Defines the type of valve entity (`gas` or `water`).
  type: string
  default: "water"
{% endconfiguration %}

**Controlling the Valve**

The ADS valve entity supports standard open/close operations:

- **Opening the valve**: Writes `True` to the ADS variable.
- **Closing the valve**: Writes `False` to the ADS variable.

This allows seamless integration with automated control systems and manual interactions in Home Assistant.

## Climate

The `ads` climate platform allows you to integrate and control climate devices connected via ADS.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: ads
    adshub: HUB1
    adsvar_current_temperature: HVAC.current_temp
    adsvar_target_temperature: HVAC.target_temp
    adsvar_hvac_mode: HVAC.hvac_mode
    adstype: real
    adstype_mode: uint
    factor: 10
    hvac_modes:
      - "off"
      - "heat"
      - "cool"
      - "auto"
      - "dry"
      - "fan_only"
    adsval_min_temperature: 7.0
    adsval_max_temperature: 35.0
    temperature_unit: "°C"
    name: "Living Room Climate"
```

{% configuration %}
adshub:
  required: false
  description: The Home Assistant hub name to which the ADS component belongs.
  type: string
  default: "HUB1"
adsvar_current_temperature:
  required: true
  description: The name of the variable that returns the current temperature from the ADS device.
  type: string
adsvar_target_temperature:
  required: false
  description: The name of the variable that sets the target temperature on the ADS device.
  type: string
adsvar_hvac_mode:
  required: false
  description: The name of the variable that controls the HVAC mode.
  type: string
adstype:
  required: false
  description: The ADS data type used for temperature values (e.g., real, lreal, int, etc.).
  type: string
  default: "real"
adstype_mode:
  required: false
  description: The ADS data type used for HVAC mode values.
  type: string
  default: "uint"
factor:
  required: false
  description: Factor to scale the temperature values between Home Assistant and TwinCAT.
  type: integer
  default: 1
hvac_modes:
  required: false
  description: The list of HVAC modes that are supported by the device.
  type: list
min_temp:
  required: false
  description: The minimum temperature setpoint allowed.
  type: float
  default: 7.0
max_temp:
  required: false
  description: The maximum temperature setpoint allowed.
  type: float
  default: 35.0
temperature_unit:
  required: false
  description: The temperature unit used by the device. Supports "°C", "°F", and "K".
  type: string
  default: "°C"
name:
  required: false
  description: An identifier for the climate device in the frontend.
  type: string
{% endconfiguration %}

**HVAC Mode Mapping**

The ADS climate integration supports multiple HVAC modes that can be mapped between Home Assistant and TwinCAT. The mapping is based on predefined integer values:

| TwinCAT Integer Value | Home Assistant HVAC Mode |
|----------------------|-------------------------|
| 1                    | off                     |
| 2                    | cool                    |
| 4                    | heat                    |
| 8                    | heat_cool               |
| 16                   | auto                    |
| 32                   | dry                     |
| 64                   | fan_only                |

If your PLC uses different values, you will need to adjust them accordingly in the PLC program.

```plaintext
TYPE E_HVAC_Mode :
(
    eOff := 1,
    eCool := 2,
    eHeat := 4,
    eHeatCool := 8,
    eAuto := 16,
    eDry := 32,
    eFanOnly := 64
);
END_TYPE
```