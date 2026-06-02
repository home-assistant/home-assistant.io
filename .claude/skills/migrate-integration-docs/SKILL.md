---
name: migrate-integration-docs
description: Migrate Home Assistant integration docs to split-page format.
---

Usage: `/migrate-integration-docs <domain> [epic-or-issue]`

Migrate `./source/_integrations/<domain>.markdown` to the current Home Assistant split-page documentation format.

Keep the main context small.
Use sub-agents for discovery and review.
Do not trust the epic, issue text, or existing docs unless Core confirms them.
Treat `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/integration-docs-examples.md` as the canonical template for split pages.
Treat `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/yaml-style-guide.md` as the YAML style source for all YAML examples.
Do not loosely imitate it.
Follow its structure closely unless Core implementation makes a specific section inapplicable.

## Stage 1: inventory with a sub-agent

Launch a sub-agent to inspect:

- `./source/_integrations/<domain>.markdown`
- If you have Home Assistant Core checked out, inspect:
  - `../core/homeassistant/components/<domain>/conditions.yaml`
  - `../core/homeassistant/components/<domain>/services.yaml`
  - `../core/homeassistant/components/<domain>/triggers.yaml`
  - `../core/homeassistant/components/<domain>/strings.json`
  - `../frontend/src/translations/en.json`
- any existing split pages for `<domain>` in:
  - `./source/_triggers`
  - `./source/_conditions`
  - `./source/_actions`

The sub-agent must return only this compact inventory:

```md
Domain: <domain>

Triggers to document:
- key: <domain>.<trigger_key>
  title: <title>
  description: <description>
  target domains: [...]
  options: [...]

Conditions to document:
- key: <domain>.<condition_key>
  title: <title>
  description: <description>
  target domains: [...]
  options: [...]

Actions to document:
- key: <domain>.<action_key>
  title: <title>
  description: <description>
  target domains: [...]
  fields: [...]

Categories not implemented:
- ...

Existing split pages:
- ...

UI wording:
- trigger behavior labels: ...
- condition behavior labels: ...
- action-specific labels: ...
- automation example action labels to mirror: ...

Important implementation notes:
- ...

Mismatches between epic/issue text and Core:
- ...
```

Rules for Stage 1:

- Core is the source of truth.
- Verify categories from Core, not from the issue.
- Verify exact keys from YAML or implementation.
- Verify supported target entity domains.
- Verify behavior labels from frontend strings.
- If actions exist, capture the current UI action label forms once in Stage 1 and reuse them later instead of doing extra lookups during writing.
- Keep the output short and factual.
- Note any mismatch between existing split pages and the current developer examples template.

## Stage 2: template and style extraction with a sub-agent

Launch a sub-agent to inspect:

- `./source/_integrations/_integration_docs_template.markdown`
- `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/integration-docs-examples.md`
- `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/general-style-guide.md`
- `https://raw.githubusercontent.com/home-assistant/developers.home-assistant/master/docs/documenting/yaml-style-guide.md`
- relevant include snippets under `./source/_includes`
- 2-4 existing files across triggers, conditions, and actions

The sub-agent must return only this:

```md
Integration page requirements:
- ...
- automation examples section requirement: ...

Trigger page requirements:
- required includes in order: ...
- required heading flow: ...
- required UI wording: ...
- Good to know guidance: ...

Condition page requirements:
- required includes in order: ...
- required heading flow: ...
- required UI wording: ...
- Good to know guidance: ...

Action page requirements:
- required includes in order: ...
- required heading flow: ...
- required UI wording: ...
- Good to know guidance: ...

Common pitfalls to avoid:
- ...
```

Focus on include order, heading expectations, UI wording, Good to know placement, and the integration-level automation examples section.
Keep it compact.

The sub-agent must explicitly call out mandatory split-page sections and include order from the developer examples template, including sections that are often missing in older docs.

## Stage 3: write or update the docs

Using only the distilled outputs from Stage 1 and Stage 2:

1. Update `./source/_integrations/<domain>.markdown`.
2. Create or update one split page per trigger.
3. Create or update one split page per condition.
4. Create or update one split page per action.
5. If a category is not implemented, do not create pages for it.
6. If split pages already exist, update them instead of duplicating them.

Hard requirements:

- In the integration page, if triggers, conditions, and actions all exist, use `{% include integrations/triggers_conditions_actions.md %}`.
- If one or more of those categories does not exist, do not use `triggers_conditions_actions.md`.
- Instead, include only the applicable lines below, separated by blank lines:
  - `{% include integrations/triggers.md %}`
  - `{% include integrations/conditions.md %}`
  - `{% include integrations/actions.md %}`
- Ensure the integration page has an `## <Integration name> automation examples` section that follows the current integration template.
- Add that section even if it was missing before the migration.
- In that section, example headings must be level-3 headings prefixed with `Automation:`.
- The integration-page automation examples must match the documented split pages and use the same feature names and behavior.
- Do not document unsupported Core features.
- When documenting a `for` attribute in options or fields, document its type as `string`, not `time`.
- Do not use Markdown H1 headings.
- Keep blank lines around headings and Liquid blocks.
- Follow the Home Assistant YAML style guide for all YAML examples.
- In UI options and YAML options sections, list default values when applicable.
- Use sentence-style capitalization.
- Prefer globally understood wording.
- Avoid region-specific household terms.
- Avoid invented workflows like “Away mode” unless explicitly framed as user-created.
- If using a helper, explicitly say it must be created separately and use `{% term helper %}` where appropriate.
- Do not assume a Labs note is required for actions.
- Include `integrations/labs_entity_triggers_note.md` only where the current template or existing Home Assistant docs pattern actually requires it.
- For trigger, condition, and action pages, follow the developer examples template section-for-section unless a section is truly not applicable.
- Do not omit a template section just because the older page for this integration did not have it.
- Keep include order aligned with the developer examples template.
- Keep heading flow aligned with the developer examples template and the headings produced by includes.
- Keep UI-step and options-section structure aligned with the developer examples template.
- If deviating from the template, do so only for a Core-based reason and keep the deviation minimal.

UI wording requirements:

- Do not prefix selected UI items with the domain.
- Trigger pages must say: `Select what you want to monitor. Under **By target** ...`
- Condition pages must say: `Select what you want to check. Under **By target** ...`
- Action pages must say: `Select what you want to control. Under **By target** ...`
- In automation examples, do not repeat the domain in UI action names. Use the action label without the `Domain: ` prefix.
- If the current UI label is `Light: Turn on light`, write `Turn on light`.
- If the current UI label would read awkwardly with the domain, such as `Lock: Lock lock`, write only the non-prefixed label.
- Use the action labels from their related strings.json in Core to make sure they match what users see in the UI.

Split-page naming rules:

- Triggers: `source/_triggers/<domain>.<trigger_key>.markdown`
- Conditions: `source/_conditions/<domain>.<condition_key>.markdown`
- Actions: `source/_actions/<domain>.<action_key>.markdown`

Use exact Core keys.

Each trigger, condition, and action page must have:

- a strong introductory context explaining when it is useful
- exactly two concrete automation examples for different use cases

Example rules:

- Examples must match what the page claims.
- Prefer standard Home Assistant concepts like time, sun, person/zone, notifications, locks, lights, alarm control panels, scripts, and automations.
- Do not invent unsupported modes, flows, or features.
- Do not imply a helper exists unless you explicitly say it is user-created.
- In automation examples, do not list default values such as default `for` or `behavior` values.
- In automation examples, use the correct full action labels, such as `Lock lock` or `Turn on switch`, not shortened labels like `Lock` or `Turn on`.

## Stage 4: review with a sub-agent

Launch a sub-agent to review the updated files against Core, templates, includes, and developer examples.

It must return only:

```md
Problems found:
- [severity] <file>: <issue>

Passed checks:
- <check>
```

Required review checks:

- integration page uses `{% include integrations/triggers_conditions_actions.md %}` only when triggers, conditions, and actions all exist
- if one or more categories is missing, the integration page uses only the applicable individual include lines with blank lines between them
- integration page contains the `## <Integration name> automation examples` section when required by the current template
- integration-page example headings are level 3 and start with `Automation:`
- integration-page automation example content is consistent with the split pages
- split pages follow the current developer examples template closely
- no mandatory split-page template section was omitted without a Core-based reason
- split pages contain required includes
- include order matches the developer examples template
- heading levels align with include-generated headings
- section order matches the developer examples template
- UI wording matches current developer examples
- selected item labels do not use `Domain: Label`
- trigger steps use `Select what you want to monitor. Under **By target** ...`
- condition steps use `Select what you want to check. Under **By target** ...`
- action steps use `Select what you want to control. Under **By target** ...`
- automation examples do not use `Domain: Label` for action names
- automation example action names reuse the current non-prefixed UI label form already captured during Stage 1
- `unavailable` / `unknown` notes are in **Good to know**
- every documented feature exists in Core
- no unsupported feature was invented
- examples are realistic and globally understandable
- in YAML options, `for` is documented as `type: string` and the format is explained in the description
- UI options and YAML options sections list default values when applicable
- automation examples do not list default values such as for `for` or `behavior`
- automation examples use correct full action labels such as `Lock lock` or `Turn on switch`
- YAML examples follow the Home Assistant YAML style guide
- helper usage, if any, is explicitly framed as user-created
- Labs note usage matches the current template and actual feature requirements

## Stage 5: fix and re-review

If the review sub-agent reports problems:

- fix them
- run one more compact review pass
- stop only when no material issues remain

## Final response

Return:

```md
Summary:
- ...

Files updated:
- ...

Files created:
- ...

Categories intentionally not documented:
- <category>: <reason>

Mismatches found between epic/issue text and Core:
- ...

Assumptions:
- ...
```
