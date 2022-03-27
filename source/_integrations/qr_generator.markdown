---
title: QR Code Generator
description: Instructions on how to set up QR Code Generator in Home Assistant.
ha_category:
  - Camera
ha_release: 2022.4
ha_iot_class: Calculated
ha_config_flow: true
ha_codeowners:
  - '@DeerMaximum'
ha_domain: qr_generator
ha_platforms:
  - camera
---

This integration allows to create QR Codes with static or dynamic content.

{% include integrations/config_flow.md %}

### Options

| Options    | Description                            | Default
| ------------ | -------------------------------------- | -------- |
| `Name` | *(str)* Name of the QR Code. | - |
| `Content` | *(str)* Content of the QR Code. Can be a template. | - |
| `Color` | *(str)* Color of the QR Code in hex. Supports transparency (#RRGGBBAA). | #000 |
| `Background color` | *(str)* Color of the background in hex. Supports transparency (#RRGGBBAA). | #FFF |
| `Scale` | *(int)* Scale of the QR Code. | 10 |
| `Border` | *(int)* Thickness of the QR Code border in "QR Code boxes". | 2 |
| `Error correction` | *(str)* Strength of error correction. Possible values: <br> L - About 7% or less errors can be corrected. <br> M - About 15% or less errors can be corrected. <br> Q - About 25% or less errors can be corrected. <br> H - About 30% or less errors can be corrected. | H |

### ATTRIBUTES

| Attribute    | Description                            | 
| ------------ | -------------------------------------- |
| `text` | *(str)* Rendered content of the QR Code. |
| `color` | *(str)* Color of the QR Code in hex. |
| `background_color` | *(str)* Color of the background in hex.|
| `scale` | *(int)* Scale of the QR Code. |
| `border` | *(int)* Thickness of the QR Code border in "QR Code boxes". |
| `error_correction` | *(str)* Strength of error correction. Possible values: <br> L<br> M <br> Q  <br> H |
