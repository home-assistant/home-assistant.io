---
title: "The Docker environment is not working properly"
description: "More information on why a misconfigured Docker environment marks the system as unhealthy."
---

Docker is at the core of most operations that the Supervisor does, it is important that it is configured properly and is working the way the Supervisor expects.

The Supervisor will be marked as unhealthy if any of these requirements are not met:

- [Running unsupported software](/more-info/unsupported/software)
- [Running an unsupported Docker version](/more-info/unsupported/docker_version)
- [Running the Supervisor under LXC](/more-info/unsupported/lxc)
- [Not running the Supervisor as privileged](/more-info/unsupported/privileged)
