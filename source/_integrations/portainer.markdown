---
title: Portainer
description: Instructions on how to integrate Portainer with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
ha_release: '2025.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: portainer
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Portainer** {% term integration %} is used as an interface to the [Portainer API](https://docs.portainer.io/api).
Portainer is a lightweight management UI that allows you to easily manage your Docker containers, images, networks, and volumes. It works on every Docker host or Swarm cluster.

The Portainer API provides a way to manage Docker containers, images, networks, and volumes. It allows you to interact programmatically with your Docker host or Swarm cluster.

## Prerequisites

Before you can configure Portainer within Home Assistant, you need a few things:

- have Portainer installed and a user with administrator rights on Portainer.
- An access token. 

Create a Portainer Access Token by following these steps:

1. Log in to your Portainer instance.
2. To create an access token, follow the steps in the [Portainer documentation](https://docs.portainer.io/api/access).
3. Copy the generated Access Token and store it somewhere safe, you will need it in the next steps.

{% include integrations/config_flow.md %}

## Supported functionality

There is currently support for the following device types within Home Assistant:

### Binary sensors

- **Status**: Reports whether a container is running.

### Buttons

- **Restart container**: Restarts the container.
- **Prune unused images**: Removes unused Docker images from the endpoint.

### Sensors

#### Container sensors

- **State**: Current container state (such as `running`, `exited`, `paused`).
- **Image**: The Docker image the container is based on.
- **CPU usage total**: Total CPU time consumed by the container.
- **Memory usage**: Current memory usage of the container.
- **Memory usage percentage**: Memory usage as a percentage of the container's limit.
- **Memory limit**: Memory limit configured for the container.

#### Endpoint sensors

- **Docker version**: Docker engine version running on the host.
- **API version**: Docker API version on the host.
- **Kernel version**: Kernel version of the host operating system.
- **Operating system**: Operating system running on the host.
- **Total memory**: Total memory available on the host.
- **Total CPU**: Total CPU cores available on the host.
- **Containers running**: Number of currently running containers.
- **Containers stopped**: Number of stopped containers.
- **Containers paused**: Number of paused containers.
- **Container count**: Total number of containers on the endpoint.
- **Image count**: Total number of Docker images.
- **Container disk usage total size**: Total disk space used by containers.
- **Image disk usage total size**: Total disk space used by images.
- **Volume disk usage total size**: Total disk space used by volumes.

#### Stack sensors

- **Status**: Whether the stack is `active` or `inactive`.
- **Type**: The stack type: `Compose`, `Swarm`, or `Kubernetes`.
- **Container count**: Number of containers belonging to the stack.

### Switches

- **Container**: Starts or stops an individual Docker container.
- **Stack**: Starts or stops all containers in a stack.

## Examples

The following examples show how to use the Portainer integration in Home Assistant automations. These examples are just a starting point, and you can use them as inspiration to create your own automations.

### Notify when a container went down

The following example sends a notification to your mobile device when a container went down.

{% raw %}

```yaml
automation:
  - alias: "Container went down"
    triggers:
      - trigger: state
        entity_id:
          - sensor.container_state
        to:
          - exited

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "Container alert"
          message: "Container went down!"
```

{% endraw %}

## Actions

Portainer provides the following actions.

### Action: Prune images

The `portainer.prune_images` can be used to prune unused images more granually, such as a duration and/or if images are dangling.

- **Data attribute**: `device_id`
    - **Description**: The ID of the device/endpoint to prune images on.
    - **Optional**: No
- **Data attribute**: `until`
    - **Description**: The duration in time in the past.
    - **Optional**: Yes
- **Data attribute**: `dangling`
    - **Description**: If true, only prune dangling images.
    - **Optional**: Yes

## Supported devices

The integration creates one device per Portainer endpoint (Docker host). Containers and stacks appear as child devices under their endpoint. If a container belongs to a stack, it is nested under that stack instead.

### Endpoints

Each Docker host managed by Portainer is represented as an endpoint device, exposing host-level information such as Docker version, memory, CPU, and container counts.

### Containers

Each Docker container is a child device under its endpoint or stack. Container devices expose resource usage sensors, a status binary sensor, a restart button, and a switch to start or stop the container.

### Stacks

Each Docker Compose or Swarm stack is a child device under its endpoint. Stack devices expose a status sensor, a type sensor, a container count sensor, and a switch to start or stop the entire stack.

Docker API Engine needs to be equal to or above version 1.44. Older versions are [deprecated](https://docs.docker.com/reference/api/engine/#deprecated-api-versions). 

## Data updates

The integration normally updates every 60 seconds. For more detailed steps on how to define a custom polling interval, follow the procedure below.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Known limitations

Currently, the integration does not support stacks or Edge computing.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, consider deleting the Portainer access token.
