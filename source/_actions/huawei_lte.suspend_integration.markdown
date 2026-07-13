---
title: "Suspend integration"
action: huawei_lte.suspend_integration
domain: huawei_lte
description: "Suspends the integration and logs it out from the router."
related_actions:
  - huawei_lte.resume_integration
---

The **Suspend integration** action suspends the integration. It logs the integration out from the router and stops accessing it. This is useful when you temporarily need to access the router web interface from another source, such as a web browser. Use the [Resume integration](/actions/huawei_lte.resume_integration/) action to resume.

This action does not target an entity. Only users with administrator rights can run it. If you have more than one router configured, you provide the router URL.

{% include actions/ui_header.md %}

To suspend the integration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Huawei LTE: Suspend integration**.
6. If you have more than one router configured, enter the **URL** of the router to suspend.
7. Select **Save**.

### Options in the UI

{% options_ui %}
URL:
  description: The URL of the router to suspend the integration for. Optional when only one router is configured.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `huawei_lte.suspend_integration`. A basic example looks like this:

{% example %}
action: |
  action: huawei_lte.suspend_integration
  data:
    url: "http://192.168.100.1/"
{% endexample %}

This suspends the integration for the given router.

### Options in YAML

{% options_yaml %}
url:
  description: >
    The URL of the router to suspend the integration for. Optional when
    only one router is configured.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
