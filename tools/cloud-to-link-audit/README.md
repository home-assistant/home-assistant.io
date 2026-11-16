# Cloud to Link audit

Home Assistant Cloud is being renamed to Home Assistant Link. This folder holds a working audit of every occurrence of "cloud" on the website, so that the copy changes can be reviewed before they are made.

This folder is working material for the rename. Remove it before the pull request is merged.

## What is here

- `audit.py`: finds every occurrence of "cloud" in the repository, records the sentence around it, and classifies it.
- `occurrences.csv`: the result, one row per occurrence.
- `sheet/part-*.csv`: the same list without the link columns, split into parts that are small enough for the review spreadsheet to import.
- `overrides.csv`: decisions made by hand. They take precedence over the automatic classification.

## Update the audit

Run this from the repository root:

```bash
python3 tools/cloud-to-link-audit/audit.py
```

To change a decision, add a row to `overrides.csv` with the file, line, and position in the line from `occurrences.csv`, then run the script again.

## Columns

- **Rewrite?**: `Yes` when the occurrence refers to Home Assistant Cloud and the copy should change. `No` for everything else, such as other vendors' clouds, integration names, code, and URLs.
- **Confidence**: `High` for clear cases, `Review` for a best guess that nobody has checked, and `Checked` for decisions made by hand.
- **Category**: why the occurrence was marked `Yes` or `No`.
- **Context**: the sentence, with the occurrence between « and ».
- **Suggested replacement**: the same sentence, with the new wording between « and ».
- **Source link**: the line on GitHub.
- **Live page link**: the published page, with the text highlighted where the browser supports it.

## What `No` covers

- URLs, anchors, and file paths, including `/cloud/` and `/integrations/cloud/`. These change only if a page is renamed, and then need a redirect.
- Code, such as `cloud.remote_connect`, `tts.home_assistant_cloud`, and `ha_domain: cloud`. These follow Home Assistant Core.
- Pull request titles in release notes. These are a historical record.
- Lowercase descriptions of the service in archived blog posts.
- Sentences that explain the rename or say "formerly Home Assistant Cloud".
