---
title: Get command
action: denonavr.get_command
domain: denonavr
description: "Send a generic HTTP command to a Denon AVR receiver over the network."
related_actions:
  - denonavr.set_dynamic_eq
  - denonavr.update_audyssey
---

Use this action to send a generic HTTP command to your Denon AVR receiver. Denon AVR receivers support a simple text-based network interface, so you can reach features that do not have their own control in Home Assistant. You can also send IR remote codes through this same interface.

A list of network commands supported by the various Denon AVR receivers can be [found here](https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf). A list of IR codes can be [found here](https://assets.denon.com/DocumentMaster/UK/AVR3313_IR_CODE_V01.pdf).

{% include actions/ui_header.md %}

To send a command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Denon AVR media players you want to send the command to.
6. From the actions shown for that target, select **Get command**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Command:
  description: The endpoint of the command to send, including any associated parameters. For example, `/goform/formiPhoneAppDirect.xml?VSMONI2`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `denonavr.get_command`. A basic example looks like this:

{% example %}
action: |
  action: denonavr.get_command
  target:
    entity_id: media_player.marantz
  data:
    command: "/goform/formiPhoneAppDirect.xml?VSMONI2"
{% endexample %}

This switches the HDMI output to output 2 (if your receiver supports it). To send an IR code instead, use a command such as `/goform/formiPhoneAppDirect.xml?RCKSK0410370`, which toggles muting.

### Options in YAML

{% options_yaml %}
command:
  description: The endpoint of the command to send, including any associated parameters.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Append the specific command to the path `/goform/formiPhoneAppDirect.xml?`. For example, `/goform/formiPhoneAppDirect.xml?VSMONI2`.
- The Denon AVR receiver also supports the standard media player controls, such as `turn_on` and `volume_up`. Calling the [`media_player.turn_on`](/integrations/media_player/) action is equivalent to calling **Get command** with the command `/goform/formiPhoneAppDirect.xml?PWON`.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
