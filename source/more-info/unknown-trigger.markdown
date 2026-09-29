---
title: "No page for this trigger"
description: "There is no documentation page for the trigger you requested."
sidebar: false
---

There is no documentation page for the trigger you were looking for. This can have a few reasons:

- The trigger comes from a custom integration. Custom integrations document their own triggers themselves. Check the documentation of the custom integration you installed.
- The trigger is documented on the general [automation triggers](/docs/automation/trigger/) page, together with other built-in triggers.
- The trigger was renamed, removed, or deprecated. Triggers that are no longer supported are removed from the documentation. If an automation still uses it, Home Assistant usually tells you what to use instead under {% my repairs title="**Settings** > **System** > **Repairs**" %}.

You can also browse all [documented triggers](/triggers/), or search the documentation using the search at the top of this page.

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function () {
  if (typeof window.plausible === "function") {
    window.plausible("Unknown trigger", { props: { path: window.location.pathname } });
  }
});
</script>
