---
title: "Quality Scale"
description: "Details about the classification of integrations."
---

The Integration Quality Scale scores each integration based on the code quality and user experience. Each level of the quality scale consists of a list of requirements. If an integration matches all requirements, it's considered to have reached that level.

[Integration Quality Scale](https://developers.home-assistant.io/docs/en/integration_quality_scale_index.html) for developers.

## No score

This integration passes the bare minimum requirements. That's the level of most integrations when they are introduced into Home Assistant. It doesn't mean that they are bad or buggy, just that you need to configure them with an entry in your {% term "`configuration.yaml`" %} file.

## Silver 🥈

This integration is able to cope when things go wrong. It will not print any exceptions nor will it fill the log with retry attempts. Also, it will show you if a device is offline or not ready when you start Home Assistant.

## Gold 🥇

This is a solid integration that is able to survive poor conditions and can be configured via the user interface.

## Platinum 🏆

Best of the best. The integration is completely async, meaning it's super fast and gives you an excellent user experience.

## Internal 🏠

All integrations which are marked as **internal** are part of Home Assistant.

