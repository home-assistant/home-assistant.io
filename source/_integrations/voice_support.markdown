---
title: Voice support
description: Test the next generation of voice in Home Assistant.
ha_release: '2026.12'
ha_domain: voice_support
related:
  - docs: /integrations/labs/
    title: Home Assistant Labs
  - docs: /voice_control/
    title: Assist
---

The **Voice support** {% term integration %} lets you test the next generation of voice in Home Assistant.

It connects Home Assistant to the **Voice Support** app, which gives a second opinion on what your voice satellites hear:

- **Wake word verification**: Your satellite detects its wake word on the device itself. That check has to be quick, so it is a little eager. When a satellite wakes up, Home Assistant sends the audio to the app, which checks it with a much larger model. If it was not really the wake word, for example when the television said something that sounded like "Okay Nabu", the command is dropped and nothing happens.
- **No pause after the wake word**: You can say the wake word and your command in one go, for example "Okay Nabu, turn on the lights". Without next-generation voice, your satellite plays a wake sound, and you wait for it before you speak. With next-generation voice turned on, there is no wake sound.
- **End of command detection**: The app also listens for when you stop talking. It is better at hearing quiet voices and children, so your commands are cut off less often.

Next-generation voice is a preview feature in [Home Assistant Labs](/integrations/labs/). It is still in development and may change.

## Prerequisites

- A voice satellite that sends Home Assistant the audio from just before it woke up. The [Home Assistant Voice Preview Edition](/voice-pe/) needs the beta firmware for this.
  <!-- TODO: link to how to install the Voice PE beta firmware -->
- A wake word the app can verify. It currently verifies **Okay Nabu**, **Hey Jarvis**, and **Hey Mycroft**, in English.
- A 64-bit system (amd64 or aarch64) to run the app.

Satellites and wake words that are not supported keep working exactly as they do today, without the second opinion.

## Turning on next-generation voice

1. Go to {% my labs title="**Settings** > **System** > **Labs**" %}.
2. Turn on **Next-generation voice**.

What happens next depends on how you run Home Assistant:

- **Home Assistant OS**: Home Assistant installs and starts the Voice Support app and sets up the integration for you. There is nothing else to do.
- **Home Assistant Container**: You need to run the Voice Support app yourself. Follow the steps in [Running the app in a container](#running-the-app-in-a-container).

The first time it starts, the app downloads a speech model of about 174&nbsp;MB. Until the download has finished, wake words are checked without it.

## Running the app in a container

If you run Home Assistant in a container, there is no Supervisor to install the app for you. Run the standalone image of the app instead, on the same machine or on another one on your network.

### Docker Compose

```yaml
services:
  voice-support:
    container_name: voice-support
    image: ghcr.io/ohf-voice/app-voice-support-standalone:latest
    network_mode: host
    volumes:
      - ./voice-support:/data
    restart: unless-stopped
```

### Docker CLI

```bash
docker run -d \
  --name voice-support \
  --network=host \
  -v /PATH_TO_YOUR_DATA:/data \
  --restart=unless-stopped \
  ghcr.io/ohf-voice/app-voice-support-standalone:latest
```

The app listens on port `10900`. The `/data` volume keeps the downloaded speech model, so it is not downloaded again when the container is recreated.

With host networking, the app announces itself on your network and Home Assistant discovers it. If you cannot use host networking, publish the port instead with `-p 10900:10900` (or `ports: ["10900:10900"]` in Docker Compose) and add the integration manually.

### Connecting Home Assistant to the app

Turn on **Next-generation voice** in Labs first. Home Assistant ignores the app until you do.

If Home Assistant discovered the app, it shows up under {% my integrations title="**Settings** > **Devices & services**" %}. Select **Add** to set it up. Otherwise, add the integration manually:

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the machine running the Voice Support app.
Port:
  description: The port the Voice Support app listens on. The default is `10900`.
{% endconfiguration_basic %}

Keep the app up to date. If Home Assistant and the app do not speak the same protocol version, the integration does not connect and tells you which one to update.

## If the app is stopped

Nothing stops working. Wake words are accepted without the second opinion, and Home Assistant detects the end of your command itself. This is how your satellites behave without the app.

## Turning off next-generation voice

Turn off **Next-generation voice** in {% my labs title="**Settings** > **System** > **Labs**" %}.

On Home Assistant OS, Home Assistant automatically removes the integration and uninstalls the Voice Support app. It makes a backup of the app first. There is nothing else to do.

If you run the app in a container, remove the integration and stop the app's container yourself.

## Troubleshooting

### The Voice Support app could not be set up

On Home Assistant OS, Home Assistant creates a repair issue when it cannot install or start the app. Check the app in {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}, then restart Home Assistant to try again.

### Home Assistant cannot connect to the app

- Check that the app's container is running and that its logs show no errors.
- Check that Home Assistant can reach the app on port `10900`, for example with `curl http://HOST:10900/info`.
- If you published the port instead of using host networking, enter the IP address of the machine running the container, not the container's name.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

On Home Assistant OS, if Home Assistant installed the Voice Support app, removing the integration also backs up and uninstalls the app.
