---
description: Access and control Agent DVR from Home Assistant.
ha_release: '0.110'
ha_domain: agent_dvr
---

[Agent DVR](https://www.ispyconnect.com/download.aspx/) is a free* software DVR solution for Windows 10, Mac and Linux. Agent DVR runs as a service or console application and can access and control a huge range of third party cameras with advanced motion detection, including DeepStack integration for object recognition. The iSpyConnect website provides secured (SSL) remote access without port forwarding needed.

You can add Agent DVR via integrations using the IP address and port of the server, like: `http://192.168.1.3:8090/`. If you have "Protect API" turned on in your Agent DVR server configuration, you can supply the username and password as part of the URL, for example, `http://username:password@192.168.1.3:8090`.

## Agent DVR app

On Home Assistant OS, you can also run Agent DVR as an app on the same machine:

{% my supervisor_addon badge addon="a910219e_agentdvr" repository_url="https://github.com/ispysoftware/home-assistant-apps" %}

When the app is running, Home Assistant discovers it and shows **Agent DVR** as **Discovered** under {% my integrations title="**Settings** > **Devices & services**" %}. Select **Add** to set it up; you don't need to enter a host or port.

{% include integrations/config_flow.md discovery=true %}

{% important %}
Please ensure you are using Agent DVR v2.6.1.0 +
{% endimportant %}

## Alarm control panel

Reports on the current alarm status and can be used to arm and disarm the system.

{% include integrations/actions.md %}

The Agent DVR cameras also support the standard [camera actions](/integrations/camera/#list-of-actions), such as turning the camera on or off and toggling motion detection.

## Iframe

- Using the Webpage Card you can embed the Agent DVR viewer directly in Home Assistant. Just point it to [the Agent DVR web app](https://www.ispyconnect.com/app/)

<p class='img'>
<img src='/images/screenshots/agent_dvr.jpg' />
</p>

*Agent offers additional services like secured remote access (without port forwarding) and cloud uploads via a subscription service.
