---
title: "No page for this action"
description: "There is no documentation page for the action you requested."
sidebar: false
---

There is no documentation page for the action you were looking for. This can have a few reasons:

- The action comes from a custom integration. Custom integrations and tools that add their own actions document those actions themselves. Check the documentation of the custom integration you installed.
- The action is named after something you created. Some actions are named after your own scripts or commands, like `script.good_morning` or `shell_command.clean_up`. These don't have their own page. See the documentation of the integration instead, like [scripts](/integrations/script/), [shell commands](/integrations/shell_command/), or [RESTful commands](/integrations/rest_command/).
- The action was removed or deprecated. Actions that are no longer supported are removed from the documentation. If an automation or script still uses it, Home Assistant usually tells you what to use instead under {% my repairs title="**Settings** > **System** > **Repairs**" %}.

To find an action on your own system, go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %} and search for it. Every available action is listed there, along with any description and options it provides.

You can also browse all [documented actions](/actions/), or search the documentation using the search at the top of this page.

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function () {
  if (
    typeof window.plausible === "function" &&
    window.location.pathname.startsWith("/actions/")
  ) {
    window.plausible("Unknown action", { props: { path: window.location.pathname } });
  }
});
</script>
