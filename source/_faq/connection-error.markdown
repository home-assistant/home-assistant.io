---
title: "Connection error"
description: "A connection error in the logs almost always means a device, service, or network on your side is unreachable, not a bug in Home Assistant."
ha_category: Usage
---

A connection error in the logs almost always means a device, service, or network on your side is unreachable, not a bug in Home Assistant. For example:

```text
ConnectionRefusedError: [Errno 111] Connection refused
```

A few things to check:

- The device or service that the {% term integration %} talks to is powered on and reachable on your network.
- Your network is healthy. Routers, DNS, or DHCP problems can take services offline.
- For cloud services, check the provider's status page. The internet service may be temporarily down.

If the error mentions a specific integration, the integration page often has a troubleshooting section with more focused advice.
