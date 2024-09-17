---
title: Image
description: Instructions on how to integrate images within Home Assistant.
ha_category:
  - Image
ha_release: 2023.7
ha_quality_scale: internal
ha_domain: image
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Image** {% term integration %} allows other integrations to display a static image.

{% include integrations/building_block_integration.md %}

## The state of an image integration

The state of an image integration is a timestamp, showing the date and time when the image was last changed.
