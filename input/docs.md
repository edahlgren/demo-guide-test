# (docs help) - {{title}}

## Quick reference

Find docs

|                      |                                                                      |
| -------------------- | -------------------------------------------------------------------- |
| /docs/data/README    | overview of the data in /root/data                                   |
|                      |                                                                      |
| /docs/src/README     | overview of source code in /root/src                                 |
| /docs/src/*/         | documentation included in source repositories, linked from /root/src |
|                      |                                                                      |
| /docs/papers         | research papers that describe the demo                               |
|                      |                                                                      |
| /docs/help/text      | text file help guides for demo commands                              |
| /docs/help/html      | html help guides for demo commands                                   |

Re-generate help guides from /demo/Demofile and the markdown templates in /demo/docs

```
$ demo docs
```

View this guide

```
$ demo docs --help
```

## Summary

The 'demo docs' command generates help guides from a Demofile.

## General Options

| -------  | --------------------------------------------- |
| --help   | Show this guide                               |

## What happens

The 'demo docs' command creates a help guide for each template, first by filling in each markdown template with data from /demo/Demofile, then by converting the markdown to html, and finally by converting the html into a formatted text file.

### Input

| ---------------------- |
| /demo/Demofile         |
| /demo/docs/templates   |

### Output

| ---------------------- |
| /root/data/README      |
| /root/src/README       |
| /docs/help/text/*      |
| /docs/help/html/*      |

## Source docs

|                    |             |
| ------------------ | ----------- |
{{#docs.source}}
{{#keywords}}
| /docs/src/{{file}} | {{keyword}} |
{{/keywords}}
{{/docs.source}}

## Papers

|                       |                 |
| --------------------- | --------------- |
{{#docs.papers}}
{{#keywords}}
| /docs/papers/{{file}} | {{keyword}}     |
{{/keywords}}
{{/docs.papers}}

## Help docs

|                              |                      |
| ---------------------------- | -------------------- |
| /docs/guides/help.md         | 'demo --help'        |
| /docs/guides/run.md          | 'demo run --help'    |
| /docs/guides/build.md        | 'demo build --help'  |
| /docs/guides/share-sync.md   | 'demo share --help'  |
|                              | 'demo sync --help'   |
| /docs/guides/docs.md         | 'demo docs --help'   |
| /docs/guides/data.md         | 'demo data --help'   |
