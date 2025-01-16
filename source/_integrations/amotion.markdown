---
title: aMotion
description: Instructions on how to integrate aMotion family HVAC device unit
ha_category:
  - Health
  - Sensor
  - Climate
  - HVAC
ha_config_flow: true
ha_release: 2025.1.2
ha_iot_class: Local Polling
ha_domain: amotion
ha_platforms:
  - air_quality
  - climate
  - number
  - switch
  - button
ha_codeowners:
  - '@karelcavojsky'
ha_integration_type: integration
---

The **aMotion** {% term integration %} is a comprehensive set of devices and tools for controlling and regulating HVAC units. It supports a wide range of ventilation, cooling, heating and air conditioning devices.

{% include integrations/config_flow.md %}

## Platforms

Because the use of amotion family systems is highly variable, it is not easy to create a uniform prescription for the correct integration setup. Each device is therefore able to send complete data (amotion.description()) about its configuration. Based on this, a list of elements and entities for integration is automatically created.

### Parameters

In simple terms, parameters can be divided into monitoring and control. The tables show the most common parameters included in ventilation units for your reference.

#### Monitor Parameters

| Data attribute | Unit / Values | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `season_current`            |       AUTO_TODA<br>AUTO_TODA_RATIO<br>HEATING<br>NON_HEATING<br>USER<br> | Current season<br>   |
| `temp_oda`            |       °C | Temp. - outdoor air<br>Number between -30 and 50   |
| `temp_oda_mean`            |       °C | Temp. average- outdoor air<br>Current T-ODA mean<br>Number between -30 and 50   |
| `temp_eta`            |       °C | Temp ETA<br>Temp. - extract air<br>Number between 10 and 40   |
| `temp_eha`            |       °C | Temp. - exhaust air<br>Number between -30 and 50   |
| `fan_sup_factor`            |       % | Supply fan - power<br>Number between 0 and 100   |
| `fan_eta_factor`            |       % | Extract fan - power<br>Number between 0 and 100   |
| `temp_ida`            |       °C | Temp IDA<br>Temp. - indoor air<br>Number between 10 and 40   |
| `temp_sup`            |       °C | Temp SUP<br>Temp. - supply air<br>Number between -30 and 100   |
| `press_sup`            |       Pa | Supply duct pressure (SUP)<br>Number between 0 and 1000   |
| `press_eta`            |       Pa | Extract duct pressure(ETA)<br>Number between 0 and 1000   |
| `flow_sup`            |       m<sup>3</sup>/h | Volume flow - supply air <br>Number between 600 and 3000   |
| `flow_eta`            |       m<sup>3</sup>/h | Volume flow - extract air<br>Number between 600 and 3000   |
| `flow_oda`            |       m<sup>3</sup>/h | Ventilation air volume<br>Number between 600 and 3000   |
| `heater_status`            |       True/False | Heater status<br>   |
| `cooler_status`            |       True/False | Cooler status<br>   |
| `mode_current`            |       OFF<br>EVAPORATION<br>RUNDOWN<br>NORMAL<br>FILTER_TEST<br>FLOW_STABILIZATION<br>SUBSTITUTE_CONTROL<br>INTERVAL_VENTILATION<br>DEFROST_HRC<br>FORCE_CIRCULATION<br>STARTUP<br>WARM_UP<br>EMERGENCY_OFF<br>MANUAL<br>ANTIFREEZE<br>PREVENT_OFF<br> | Current device mode<br>   |

#### Control parameters

| Data attribute | Unit / Values | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `work_regime`            |       OFF<br>AUTO<br>VENTILATION<br>CIRCU_VENT<br>CIRCULATION<br>NIGHT_PRECOOLING<br>DISBALANCE<br>OVERPRESSURE<br>VENTMIX<br>UNDERPRESSURE<br> | Regime<br>   |
| `fan_power_req`            |       % | Required power<br>Number between 0 and 100   |
| `flow_ventilation_req`            |       m<sup>3</sup>/h | Required ventilation power<br>Number between 600 and 3000   |
| `flow_circulation_req`            |       m<sup>3</sup>/h | Required circulation air volume<br>Number between 0 and 1000   |
| `pressure_control_request`            |       OFF<br>HIGH<br>LOW<br> | Required pressure level<br>   |
| `temp_request`            |       °C | Required temperature<br>Number between 10 and 40   |
| `zone_request`            |       BOTH<br>ZONE_1<br>ZONE_2<br> | Required zone<br>   |
| `circulation_fix_request`            |       % | Circulation damper position<br>Number between 0 and 100   |
| `bypass_control_req`            |       AUTO<br>CLOSED<br>OPEN<br> | Bypass damper  - control request<br>   |
| `fan_power_req_sup`            |       % | Required power - supply<br>Number between 0 and 100   |
| `fan_power_req_eta`            |       % | Required power - extract<br>Number between 0 and 100   |
| `flow_sup_ref`            |       m<sup>3</sup>/h | Flow SUP request<br>Number between 600 and 3000   |
| `flow_eta_ref`            |       m<sup>3</sup>/h | Flow ETA request<br>Number between 600 and 3000   |
| `dehum_h_req`            |       % |  Maximal acceptable humidity<br>Number between 0 and 100   |
| `dehum_enabled`            |       True/False | Allow dehumidification<br>   |


### Scenes

Most devices also offer sets of preset behaviors, called scenes, which are uploaded as buttons when building an integration. These scenes are set directly in the device and cannot be edited by the user. They can only be activated. They are therefore visible as buttons in Home Assistant. The number of such scenes is dynamic and depends on the type and design of the HVAC
