---
layout: page
title: "Publishing your add-on"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

All add-ons are simple docker containers. You can use our [build scripts][builder] to automate the whole build process or you can build your own docker image and push it manually to a docker hub. Inside your add-on `config.json` you specify the Docker image that will be installed for your add-on:

```json
{
  "image": "myhub/image-{arch}-addon-name"
}
```

You can use `{arch}` inside the image name to support multiple architectures with 1 configuration file. It will be replaced with the architecture of the user when we load the image.

Development best practices is to merge your changes into a branch like `build`. After you push the add-on to [Docker Hub](https://hub.docker.com/), you can merge this branch to master.

## {% linkable_title Custom Add-ons %}

You need a Docker Hub account to make your own add-ons. Download our [build script][builder] and run one of the following commands.

For a git repository:

```bash
# Test only:
./create_hassio_addon.sh -a amd64 -s addon-slug -r https://github.com/xy/addons -b branchname

# push to docker hub:
./create_hassio_addon.sh -a amd64 -s addon-slug -r https://github.com/xy/addons -b branchname -p

# create for all supported arch:
./create_addon_all.sh -s addon-slug -r https://github.com/xy/addons -b branchname -p
```

For a local repository:

```bash
# Test only:
./create_hassio_addon.sh -a amd64 -s addon-slug -l /home/xy/my_local_repo

# push to docker hub:
./create_hassio_addon.sh -a amd64 -s addon-slug -l /home/xy/my_local_repo -p
```

[builder]: https://github.com/home-assistant/hassio-build/tree/master/build-scripts/addons
