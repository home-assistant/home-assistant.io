---
title: "Evaluate"
action: ai_task.evaluate
domain: ai_task
description: "Uses AI to evaluate questions about supplied text, structured data, or attachments."
related_actions:
  - ai_task.generate_data
---

The **Evaluate** action uses AI to answer questions about information you provide. For example, you can assess whether a delivery has arrived, classify where it was left, or score how urgently it needs attention. Each question returns a probability, a choice, or a score that you can use in later steps of an automation or script.

All questions in a task use the same input: text or structured data in **State**, files in **Attachments**, or both. The selected AI task entity must support evaluation.

## Using this action from the user interface

To evaluate information from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Evaluate**.
6. Enter a **Task name** and choose an **Entity ID** that supports evaluation. You can leave the entity empty if you have set a preferred evaluation entity.
7. Provide the information to evaluate in **State**, **Attachments**, or both.
8. Enter the **Questions** to ask. **State** and **Questions** use YAML editors. For the question format, refer to [Question types](#question-types).
9. In **Response variable**, enter a name to store the answers, such as `evaluation`.
10. Select **Save**.

### Options in the UI

{% options_ui %}
Task name:
  description: A name that identifies the task, such as "Check delivery".
  required: true
Entity ID:
  description: The AI task entity to run the evaluation on. When left empty, the preferred evaluation entity is used.
  required: false
State:
  description: The information to evaluate, entered as YAML. This can be text or structured data. Required when no attachments are supplied.
  required: false
Questions:
  description: Named questions to ask about the supplied information, entered as YAML. Each question has a type and instructions. Choice and score questions also need criteria.
  required: true
Attachments:
  description: Files to evaluate, such as a camera snapshot. Supported file types depend on the selected entity. Required when no state is supplied.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ai_task.evaluate`. The following is a single action for the automation or script editor. It uses the preferred evaluation entity and stores the answers in `evaluation`:

{% example %}
action: |
  action: ai_task.evaluate
  data:
    task_name: "Check delivery"
    state: "Your package was left at the front door."
    questions:
      delivered:
        type: noul
        instructions: "Has the package arrived?"
      location:
        type: choice
        instructions: "Where was the package left?"
        criteria:
          door: "At the front door"
          other: "Somewhere else"
      attention:
        type: score
        instructions: "How urgently does this delivery need attention?"
        criteria:
          - "No action needed"
          - "Action needed soon"
          - "Immediate action needed"
  response_variable: evaluation
{% endexample %}

This action does not support targets. To select an entity explicitly, add `entity_id` under `data`.

### Options in YAML

{% options_yaml %}
task_name:
  description: A name that identifies the task.
  required: true
  type: string
entity_id:
  description: The AI task entity to run the evaluation on. If omitted, the preferred evaluation entity is used.
  required: false
  type: string
state:
  description: >
    The information to evaluate. Accepts text or JSON-compatible data, such as
    a mapping, a list, a number, or a boolean. Required when no attachments
    are supplied.
  required: false
  type: any
questions:
  description: >
    A nonempty mapping of question IDs to question definitions. Each
    definition contains `type` and `instructions`, plus `criteria` for
    choice and score questions. See [Question types](#question-types).
  required: true
  type: map
attachments:
  description: >
    A list of files to evaluate. Each attachment is the output of the
    [Media selector](/docs/blueprint/selectors/#media-selector).
    Required when no state is supplied.
  required: false
  type: list
{% endoptions_yaml %}

## Question types

Each entry in `questions` has an ID you choose, such as `delivered`, and a definition with a `type` and nonempty `instructions`. You use that ID to find the answer in the response. You can mix question types in the same task.

### Yes-probability questions (`noul`)

Use `type: noul` for a yes-or-no question. The answer's `noul` field is the estimated probability of yes, from `0` to `1`. For example, `0.97` means an estimated 97% probability of yes. It is a number, not a boolean. This question type does not accept `criteria`.

### Choice questions (`choice`)

Use `type: choice` to choose between named alternatives. Set `criteria` to a mapping of at least two option names to descriptions. The answer's `choice` field contains the selected option name, and `probabilities` maps each option name to its probability.

### Score questions (`score`)

Use `type: score` to assess ordered levels. Set `criteria` to a list of at least two descriptions, ordered from the lowest level to the highest. The first level has index `0`, the next has index `1`, and so on.

The answer's `score` is the expected level index and can be fractional. With three levels, it ranges from `0` to `2`. The `probabilities` list follows the same order as `criteria`.

## Response data

The response contains an `answers` mapping keyed by your question IDs. Every answer includes its `type` and the fields described above. Probabilities use values from `0` to `1`.

For the delivery action above, a response could look like this:

```yaml
answers:
  delivered:
    type: noul
    noul: 0.97
  location:
    type: choice
    choice: "door"
    probabilities:
      door: 0.9
      other: 0.1
  attention:
    type: score
    score: 0.15
    probabilities:
      - 0.9
      - 0.05
      - 0.05
```

With `response_variable: evaluation`, read these values in later templates as `evaluation.answers.delivered.noul`, `evaluation.answers.location.choice`, and `evaluation.answers.attention.score`. For example, comparing `evaluation.answers.delivered.noul` with `0.9` checks whether the estimated probability of delivery reaches 90%.

## Good to know

- Provide state, attachments, or both. The action cannot run without input.
- The preferred evaluation entity is separate from the preferred data generation entity. An entity that supports generating data does not necessarily support evaluation.
- Attachments must be local media or a supported media source, such as a camera snapshot. The selected entity must support attachments and their file types.

## Try it yourself

Open {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}, search for **Evaluate**, and fill in the fields. Enter **State** and **Questions** as YAML, then select **Perform action** to inspect the response.

{% include actions/stuck.md %}

{% include actions/related.md %}
