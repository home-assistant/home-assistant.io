---
layout: page
title: "Home Assistant Cloud"
description: "Enable the Home Assistant Cloud integration."
date: 2017-11-17 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_release: "0.60"
ha_category: Voice
ha_iot_class: "Cloud Push"
---

<p class='note'>The Home Assistant Cloud is currently free and will become part of the upcoming Community Support Package. [Learn more](/blog/2017/12/17/introducing-home-assistant-cloud/)</p>

The Home Assistant Cloud allows you to quickly integrate your local Home Assistant with various cloud services. The following integrations are currently available:

 - [Amazon Alexa (Amazon Echo)](/cloud/alexa/)
 - [Google Assistant (Google Home)](/cloud/google_assistant/)

### {% linkable_title How does it work? %}

The Home Assistant Cloud has been designed with security in mind. When you activate the Cloud component, your instance will create a secure connection to the Home Assistant Cloud. There is no need for any further configuration or to expose your instance to the internet.

Integrations like Alexa or Google will deliver messages to our cloud which we will forward to your local instance for processing. We just forward the response back. This means that we do not have to store the state of your house in our cloud, we’re just the messenger!

You can find a list of frequently asked questions (and their answers) in [this blog post](/blog/2017/12/17/introducing-home-assistant-cloud/#faq).

### {% linkable_title Enabling the cloud %}

The Home Assistant Cloud is enabled by default. If not, add this to your configuration:

```yaml
# Example configuration.yaml entry to enable the cloud component
cloud:
```

Once activated, go to the configuration panel in Home Assistant and create an account and log in. If you are not seeing the **Configuration** panel, make sure you have the following option enabled in your configuration.yaml` file.

```yaml
config:
```
