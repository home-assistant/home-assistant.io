## Install Home Assistant Supervised

{% caution %}

This way of running Home Assistant will require the most of you. It also has strict requirements you need to follow.

Unless you really need this installation type, you should install Home Assistant OS (this can also be a [virtual machine](#install-home-assistant-operating-system)), or [Home Assistant Container](#install-home-assistant-container).

{% endcaution %}

1. First make sure you understand the <a href="https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md" target="_blank">requirements</a>.
2. This installation method has very strict requirements, for example, it only
   supports Debian (and Ubuntu, Armbian, Raspberry Pi OS are **not** 
   supported). So, make sure you understand the requirements from step 1 above.
3. Then head over to <a href="https://github.com/home-assistant/supervised-installer" target="_blank">home-assistant/supervised-installer</a> to set it up.

Once the {% term "Home Assistant Supervised" %} installation is running and Home Assistant is accessible you can continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}
