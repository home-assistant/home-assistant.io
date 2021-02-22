---
title: "Setting up local media sources"
description: "More information on how to set up local media sources in Home Assistant."
---

In order to use the media browser with Home Assistant, it needs to know where to
find you local media.

## Home Assistant OS and Supervised

No action is needed from your end to set it up. Home Assistant will
automatically use the "media" folder that is provided on these systems.

## Home Assistant Container

If you run the Home Assistant Container in, for example, Docker, you'll need to
add a Docker volume mount to the Home Assistant container, to mount in
your local media.

The default path Home Assistant will try to use, is `/media`.

For example, if you are currently using this command for Docker:

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  homeassistant/home-assistant:stable
```

You'll need to change it to this:

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /PATH_TO_YOUR_MEDIA:/media \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  homeassistant/home-assistant:stable
```

If you are using Docker compose, you can add a volume to your composition file
in similar fashion as listed in the command above.

## Home Assistant Core

If you run Home Assistant Core directly in, for example, a Python virtual
environment, you'll need to create a media folder yourself.

By default, Home Assistant will look for the `media` folder inside your current
Home Assistant configuration folder.

For example, if your current configuration folder is stored in:

`/home/frenck/.homeassistant/`

The you'll need to create a media folder in that same path:

`/home/frenck/.homeassistant/media`

## Using custom folders

It is also possible to set up custom and additional media directories. To do
so, you'll need to adjust the [core configuration][basic-configuration].

This example adds the two media folders to Home Assistant:

```yaml
# Example configuration.yaml
homeassistant:
  media_dirs:
    media: /media
    recording: /mnt/recordings
```

[basic-configuration]: /docs/configuration/basic/#media_dirs
