---
title: MPRIS media playback remote control
description: Instructions on how to integrate Linux media players into Home Assistant
ha_category:
  - Media Player
ha_release: 2022.09
ha_iot_class: Local Push
ha_codeowners:
  - '@Rudd-O'
ha_domain: hassmpris
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `hassmpris` platform lets you govern all of your Linux media players from Home Assistant, provided that:

1. your media players are [MPRIS-compatible](https://specifications.freedesktop.org/mpris-spec/) (most are), and
2. your desktop session is active (whether the screen is locked or not).

This is particularly useful in home theater PC setups, in which a regular desktop session is automatically logged on right after boot.

The integration requires an agent on your media player computer, explained below.

## Agent setup

The agent is easily set up in a few steps.

### Ensure your media player computer carries basic dependencies

Your media player computer must have two important system packages:

1. `libnotify`
2. GTK+ version 4
3. Python 3

While both these packages are shipped in the overwhelming majority of Linux systems, do please ensure your system has these two libraries already available before proceeding with the next step. Your operating system's package manager will help in this task.

### Install the MPRIS agent on your media player computer

The MPRIS agent is the key piece that allows Home Assistant to access and control your media players.

On the computer you intend to control via Home Assistant, you must install the [`hassmpris_agent` package](https://pypi.org/project/hassmpris-agent/),

There are a number of ways to install the `hassmpris_agent` package, but perhaps the most straightforward one is using `pip` on the command line:

```
pip3 install --user hassmpris_agent
# The command above deploys the agent and all its dependencies to
# ~/.local in your home directory.
```

At some point in the future, these packages may ship directly in your Linux distribution.

### Enable the agent on your media player computer

The next step is to enable the MPRIS agent. See your desktop menus for an entry called *MPRIS media control settings* or *Multimedia control from Home Assistant*. If you can't find this, open up a terminal window and run the following command:

```
python3 -m hassmpris_agent.settings
```

The settings window will pop up, with a slider titled *Enable remote control of media*. Turn it on. This will start the agent immediately, and ensure the agent starts on boot.

You can close the settings window now.

### Ensure Home Assistant can connect to two specific TCP ports

TCP ports 40051 and 40052 must be opened in your media player computer such that Home Assistant can connect to them.

{% include integrations/config_flow.md %}

You are now ready to pair your Home Assistant with your media players.

### Pair your Home Assistant instance with your media player computer

A window will then pop up where you can enter the host name or IP address of the media player computer. Confirm that the information is correct, then proceed to the next step.

At this point, you'll see two things:

1. A pop-up notification will pop up on your media player computer, asking you to *verify* that Home Assistant is connecting.
2. A series of emojis will appear on your Home Assistant setup screen.

On your media player computer, click on the *Verify* button in the notification, then verify on the next window that the emojis match what you see onscreen in Home Assistant. Then go back to Home Assistant and verify that the emojis match as well.

*Congratulations!*  Your Home Assistant can now govern all media players on your desktop computer, which will appear as new `media_player` entities as you open them. The completed pairing is secure and cannot be spoofed or snooped by any potential attacker.

## Use

There is currently support for the following device types within Home Assistant:

- [Media Player](#configuration)
