---
title: "Luxtronik"
description: "Instructions on how to integrate heat pump units controlled by a Luxtronik controller into Home Assistant."
logo: luxtronik.png
ha_category:
  - Climate
ha_release: "0.100"
ha_iot_class: Local Polling
---

The `Luxtronik` integration lets you control heat pump units controlled by a Luxtronik controller. It is used by various manufacturers such as:

- Alpha Innotec
- Siemens Novelan
- Roth
- Elco
- Buderus
- Nibe
- Wolf Heiztechnik


Its only necessary to connect the Luxtronik controller to your network, no additional hard- or software is needed.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/integrations/binary_sensor.luxtronik)
- [Sensor](/integrations/sensor.luxtronik)

## Configuration

To enable this component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
luxtronik:
  host: 192.168.178.10
  port: 8889
  safe: true
```

{% configuration %}
host:
  description: IP address or hostname of the Luxtronik controller.
  required: true
  type: string
port:
  description: The port name of the Luxtronik controller.
  required: true
  default: 8889
  type: integer
safe:
  description: Enables the writing of unknown parameters if set to false.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

<div class='note'>

Not all data received by the Luxronik controller is understood by now as the protocol is not publicly documented.  

</div>

## Service

In order to change parameters on the Luxtronik conroller, you can use the following service:

```txt
Domain: luxtronik
Service: write
Service Data: {"id": "ID_Ba_Hz_akt", "value": "Automatic"}
```

{% configuration %}
id:
  description: ID of the parameter.
  type: string
value:
  description: Value you want to set the parameter to.
  type: [string, float]
{% endconfiguration %}

Only a small number of the over 1100 parameters have a known funtion and only these can be written, these are:

- `ID_Ba_Hz_akt` The mode of operation of the heating circuit, possible values are "Automatic", "Second heatsource", "Party", "Holidays", "Off"
- `ID_Ba_Bw_akt` The mode of operation of the hot water circuit, possible valus are "Automatic", "Second heatsource", "Party", "Holidays", "Off"
- `ID_Soll_BWS_akt` The set point for hot water generation, for example 50.0 for 50.0°C 
- `ID_Einst_BA_Kuehl_akt` The mode of operation of the cooling circuit, possible values are "Automatic", "Off"
- `ID_Einst_KuehlFreig_akt` The outdoor temprature from wher on the cooling should start to operate, for example 24.0 
- `ID_Ba_Sw_akt` The mode of operation of the swimming pool heating circuit, possible values are "Automatic", "Party", "Holidays", "Off"
- `ID_Einst_TDC_Max_akt` Max. temperature difference of the hot water buffer tank, for example 70.0
- `ID_Sollwert_KuCft1_akt` Cooling set point for mixer circuit 1, for example 19.0
- `ID_Sollwert_KuCft2_akt` Cooling set point for mixer circuit 2, for example 19.0
- `ID_Sollwert_AtDif1_akt` Cooling working temperature difference 1, for example 5.0
- `ID_Sollwert_AtDif2_akt` Cooling working temperature difference 2, for example 5.0
- `ID_Ba_Hz_MK3_akt` The mode of operation of the heating mixer circuit 3, possible values are "Automatic", "Party", "Holidays", "Off"
- `ID_Einst_Kuhl_Zeit_Ein_akt` Cooling outdoor temperature overrun, for example 0.0
- `ID_Einst_Kuhl_Zeit_Aus_akt` Cooling outdoor temperature underrun, for example 0.0
- `ID_Einst_Solar_akt` Mode of operation for solar heat generation, "Automatic", "Second heatsource", "Party", "Holidays", "Off"
- `ID_Einst_BA_Lueftung_akt` Mode of operation of the integrated ventilation unit, posisble values are "Automatic", "Party", "Holidays", "Off"
- `ID_Sollwert_KuCft3_akt` Cooling set point for mixer circuit 3, for example 20.0
- `ID_Sollwert_AtDif3_akt` Cooling working temperature difference 3, for example 5.0


<div class='note'>

Before changing a parameter it smart to first read the current value and note it somewhere in case you want to set it back to its original value.
All parameters can be configured as sensors and read that way.
If you want to write unknown parameters, set the config option `safe` to `false`.

</div>
