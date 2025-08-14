---
title: "Setting up local media sources"
description: "More information on how to set up local media sources in Home Assistant."
---

Home Assistant has a local media folder. Any audio or video files placed in this folder will be accessible via the media browser.

The easiest way to manage your local media is using {% my supervisor_addon title="Samba" addon="core_samba" %}.

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

The above example adds two media folders to Home Assistant. They will
show up as "media" and "recording" in the media browser. You can add
as many media folders as you like, using any name you want.

## Home Assistant Container

If you run the Home Assistant Container you'll need to
add a Docker volume mount to the Home Assistant container, to mount in
your local media.

The default path Home Assistant will try to use, is `/media`.

For example, if you are currently using this command for Docker:

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  {{ site.installation.container }}:stable
```

You'll need to change it to this:

```bash
docker run -d --name="home-assistant" \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /PATH_TO_YOUR_MEDIA:/media \
  -v /etc/localtime:/etc/localtime:ro \
  --net=host \
  {{ site.installation.container }}:stable
```

If you are using Docker compose, you can add a volume to your composition file
in a similar fashion as listed in the command above.

## Home Assistant Core

If you run Home Assistant Core you'll need to create a media folder yourself.

By default, Home Assistant will look for the `media` folder inside your current
Home Assistant configuration folder.

For example, if your current configuration folder is stored in:

`/home/frenck/.homeassistant/`

Then you'll need to create a media folder in that same path:

`/home/frenck/.homeassistant/media`

[basic-configuration]: /docs/configuration/basic/#media_dirs
