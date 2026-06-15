---
title: WebRTC
description: Instructions on how to configure the WebRTC integration for Home Assistant.
ha_category:
  - Other
ha_release: '2026.1'
ha_quality_scale: internal
ha_domain: web_rtc
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The **WebRTC** {% term integration %} is an internal integration that provides WebRTC functionality for camera streaming in Home Assistant. It is automatically set up when needed and does not require any manual configuration.

## Advanced configuration

To configure your own <abbr title="session traversal utilities for NAT">STUN</abbr> and <abbr title="traversal using relays around NAT">TURN</abbr> servers, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
web_rtc:
```

{% configuration %}
web_rtc:
  description: Enables the WebRTC integration. Only allowed once.
  required: true
  type: map
  keys:
    ice_servers:
      description: List of STUN and TURN server configurations.
      required: true
      type: list
      keys:
        url:
          description: STUN or TURN server URLs. This can either be a single URL or a list of URLs.
          required: true
          type: string
        username:
          description: Username for TURN server authentication.
          required: false
          type: string
        credential:
          description: Credential for TURN server authentication.
          required: false
          type: string
{% endconfiguration %}

### Configuration example

```yaml
# Example configuration.yaml entry with custom STUN and TURN servers
web_rtc:
  ice_servers:
    # Add an entry for each STUN or TURN server
    - url:
        - "stun:stun.example.com:19302"
        - "stun:stun2.example.com:12345"
    - url: "turn:turn.domain.com"
      username: "username"
      credential: "abc123"
```
