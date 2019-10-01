---
title: "System Health"
description: "System Health integration will report system info and allow to run system diagnostics."
logo: home-assistant.png
ha_category:
  - "Other"
ha_qa_scale: internal
ha_release: 0.87
---

The System Health integration provides an API to offer information on the system and its components. It also allows to run diagnostic tools to diagnose problems.

System health is included as part of the [default config](https://www.home-assistant.io/components/default_config/) starting with Home Assistant 0.88. If you do not wish to use the default config, you can add the following to your configuration.yaml file.

```yaml
system_health:
```

System Health integration data can be viewed in Developer Tools on the "Info" tab.
