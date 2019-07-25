# (run help) {{title}}

## Summary

{{run.description}}

|              |                 |
| -----------  | --------------- |
| ___Input     |
{{#input}}
| {{format}}   | {{description}} |
{{/input}}
| ___Output    |                 | 
{{#output}}
| {{format}}   | {{description}} |
{{/output}}

## Ways to run

Use a preconfigured demo

```
$ demo run <configuration>
```

Use command-line options

```
$ demo run -- [options...]
```

## Preconfigured Demos

{{#run.preconfigured}}
{{description}}

```
$ demo run {{name}}
```
{{/run.preconfigured}}

## Command-line options

|                 |             |                   |
| --------------- | ----------- | ----------------- |
| options         | default     | description       |
|___Input         |             |                   |
{{#input}}
| {{options}}     | {{default}} | {{description}}   |
{{/input}}
|___Output        |             |                   |
{{#output}}
| {{options}}     | {{default}} | {{description}}   |
{{/output}}
|___Algorithms    |             |                   |
{{#algorithms}}
| {{options}}     | {{default}} | {{description}}   |
{{/algorithms}}
|___Parameters    |             |                   |
{{#params}}
| {{options}}     | {{default}} | {{description}}   |
{{/params}}


## Command-line examples

{{#run.examples}}
{{description}}

```
$ demo run -- {{&commandline}}
```
{{/run.examples}}
