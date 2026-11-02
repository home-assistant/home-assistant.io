---
title: JVC Projector
description: Control JVC projectors from Home Assistant, and use their power status, signal information, and picture settings in automations.
ha_categories:
  - media_entertainment.tv_streaming
ha_release: '2023.6'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@SteveEasley'
ha_domain: jvc_projector
ha_platforms:
  - binary_sensor
  - remote
  - select
  - sensor
  - switch
ha_integration_type: device
---

The **JVC Projector** {% term integration %} lets you control and automate [JVC projectors](https://www.jvc.com/usa/projectors/) from Home Assistant. You can turn the projector on and off, send remote commands, change settings such as the input and picture mode, and use the power status and signal information in automations.

## Supported devices

The integration supports JVC D-ILA projectors with a LAN port, including the following models and their regional variants:

- DLA-NZ900 and NZ800 (DLA-RS4200 and RS3200)
- DLA-NZ700 and NZ500 (DLA-RS2200 and RS1200)
- DLA-NZ9, NZ8, NZ7, and NP5 (DLA-RS4100, RS3100, RS2100, and RS1100)
- DLA-NX9, NX7, and NX5 (DLA-RS3000, RS2000, and RS1000)
- DLA-Z1 (DLA-RS4500)
- DLA-X990R, X970R, X790R, X770R, X590R, and X570R (DLA-RS640, RS620, RS540, RS520, RS440, and RS420)
- DLA-X950R, X750R, and X550R (DLA-RS600, RS500, and RS400)
- DLA-X900R, X700R, and X500R (DLA-RS67, RS57, and RS49)
- DLA-X95R, X75R, X55R, and X35 (DLA-RS66, RS56, RS48, and RS46)
- DLA-X90R, X70R, and X30 (DLA-RS65, RS55, and RS45)

A projector that the integration does not recognize gets basic support only: the **Power** binary sensor, the **Status** and **Light Time** sensors, the **Input** select, and the remote.

## Prerequisites

1. Connect the projector's LAN port to the same network as Home Assistant, and note the projector's IP address.
2. Some JVC projectors require a network password before they accept network control. If your projector uses one, have it ready. You set the password in the projector's network settings.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the projector."
Port:
  description: "The network control port of the projector. The default is `20554`. Only change it if you changed the communication port on the projector."
Password:
  description: "The network password of the projector. Leave it empty if the projector does not use a network password."
{% endconfiguration_basic %}

If the password on the projector changes, Home Assistant asks you to enter the new one.

## Supported functionality

The **JVC Projector** integration creates a device for the projector. The device information shows the projector's model code, firmware version, and MAC address. The model code is JVC's internal code for the model, such as `B5A2` for the DLA-NZ8.

The integration provides the following entities. Entities for features that your model does not support are not created.

### Remote

The integration creates a [remote](/integrations/remote/) entity for the projector. It turns the projector on and off, and you can use it with the [**Send remote command**](/actions/remote.send_command/) action to send the following commands.

Navigation:

- `menu`, `advanced-menu`
- `up`, `down`, `left`, `right`
- `ok`, `back`
- `info`, `hide`

Input:

- `input`
- `hdmi1`, `hdmi2`

Picture:

- `picture-mode`, `picture-adjust`
- `natural`, `cinema`
- `mode-1` through `mode-10`
- `color-profile`, `color-temp`
- `gamma`, `gamma-settings`
- `mpc`, `cmd`

Lens and installation:

- `lens-control`, `lens-aperture`
- `anamorphic`
- `setting-memory`

3D:

- `3d-format`

For example, this action opens the projector menu:

{% example %}
action: |
  action: remote.send_command
  target:
    entity_id: remote.jvc_projector
  data:
    command: menu
{% endexample %}

### Binary sensors

- **Power**
  - **Description**: Whether the projector is on. It is on while the **Status** sensor shows **On** or **Warming**, and off otherwise.
  - **Available for models**: all

### Sensors

- **Status**
  - **Description**: The power status of the projector: **On**, **Warming**, **Cooling**, **Standby**, or **Error**.
  - **Available for models**: all
- **Light Time**
  - **Description**: How long the light source (lamp or laser) has been used.
  - **Unit**: h
  - **Available for models**: all
- **Color Depth**
  - **Description**: The color depth of the input signal.
  - **Available for models**: all
  - **Remarks**: [Disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
- **Color Space**
  - **Description**: The color space of the input signal.
  - **Available for models**: DLA-X500R, X700R, X900R, and newer
  - **Remarks**: Disabled by default.
- **HDR**
  - **Description**: The HDR format of the input signal.
  - **Available for models**: DLA-Z1, and the DLA-NX, NP, and NZ series
  - **Remarks**: Disabled by default.
- **Resolution**
  - **Description**: The resolution of the input signal.
  - **Available for models**: all
  - **Remarks**: Disabled by default.
- **Colorimetry**
  - **Description**: The colorimetry of the input signal, such as BT.709 or BT.2020.
  - **Available for models**: DLA-Z1, and the DLA-NX, NP, and NZ series
  - **Remarks**: Disabled by default.
- **Link Rate**
  - **Description**: The HDMI link rate and lane configuration of the input signal.
  - **Available for models**: DLA-NP and NZ series
  - **Remarks**: Disabled by default.

### Selects

The options of some selects depend on the model.

- **Input**
  - **Description**: The HDMI input.
  - **Options**: HDMI 1, HDMI 2
  - **Available for models**: all
- **Installation Mode**
  - **Description**: The installation mode.
  - **Available for models**: all
  - **Remarks**: Disabled by default.
- **Light Power**
  - **Description**: The power level of the light source.
  - **Available for models**: all
  - **Remarks**: Disabled by default.
- **Dynamic Control**
  - **Description**: The dynamic control setting.
  - **Available for models**: DLA-Z1 and the DLA-NZ series
  - **Remarks**: Disabled by default.
- **Clear Motion Drive**
  - **Description**: The Clear Motion Drive setting.
  - **Available for models**: all
  - **Remarks**: Disabled by default.
- **Motion Enhance**
  - **Description**: The Motion Enhance setting.
  - **Options**: High, Low, Off
  - **Available for models**: DLA-X550R, X750R, X950R, and newer, except the DLA-NZ500 and NZ700
  - **Remarks**: Disabled by default.
- **Anamorphic**
  - **Description**: The anamorphic setting.
  - **Available for models**: all
  - **Remarks**: Disabled by default.
- **HDR Processing**
  - **Description**: The HDR processing setting.
  - **Available for models**: DLA-NX, NP, and NZ series
  - **Remarks**: Disabled by default.
- **Picture Mode**
  - **Description**: The picture mode.
  - **Available for models**: all
  - **Remarks**: Disabled by default.

### Switches

- **E-Shift**
  - **Description**: Turns E-Shift on or off.
  - **Available for models**: DLA-X500R, X700R, X900R, and newer, except the DLA-NX5, NX7, NP5, NZ500, and NZ700
  - **Remarks**: Disabled by default.
- **Low latency mode**
  - **Description**: Turns low latency mode on or off.
  - **Available for models**: DLA-X570R, X770R, X970R, and newer, except the DLA-NZ500 and NZ700
  - **Remarks**: Disabled by default.

## JVC Projector automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Dim the lights when the projector turns on

This automation activates a lighting scene when the **Power** binary sensor turns on.

- **Trigger**: Entity: State
  - **Target**: JVC Projector Power (`binary_sensor.jvc_projector_power`)
  - **To**: On
- **Action**: Activate scene
  - **Target**: Theater lights (`scene.theater_lights`)

{% details "YAML example for dimming the lights when the projector turns on" %}

{% example %}
automation: |
  alias: "Dim the lights when the projector turns on"
  triggers:
    - trigger: state
      entity_id: binary_sensor.jvc_projector_power
      to: "on"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.theater_lights
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} the projector every 5 seconds while it is on, warming up, or cooling down, and every 10 seconds while it is in standby. The **Input** select and **Light Time** sensor are only updated while the projector is on. The other settings and the signal information are only updated while the projector is on and receiving a signal. When the signal is lost, they are cleared until a signal returns.

## Known limitations

- The projector accepts one network control connection at a time. Another controller that keeps a connection open, such as a control system or calibration software, can cause connection errors.

## Troubleshooting

{% details "Failed to connect" %}

### Symptom: "Failed to connect"

When you set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant cannot reach the projector at the host and port you entered.

#### Resolution

1. Make sure the projector is plugged in and its LAN port is connected to the same network as Home Assistant.
2. Check the **Host** and **Port** you entered.
3. Make sure no other controller is connected to the projector. See [Known limitations](#known-limitations).

{% enddetails %}

{% details "Invalid authentication" %}

### Symptom: "Invalid authentication"

When you set up the integration, the form shows the message "Invalid authentication".

#### Description

The password you entered does not match the network password set on the projector.

#### Resolution

1. Check the network password in the projector's network settings.
2. Enter the same password in the **Password** field.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
