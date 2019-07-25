# (run help) {{title}}

## Synopsis

{{run.description}}

### Input

{{#input}}
|            |                 |
| ---------- | --------------- |
| {{format}} | {{description}} |
{{/input}}

### Output

{{#output}}
|            |                 |
| ---------- | --------------- |
| {{format}} | {{description}} |
{{/input}}

## Ways to run

Using a preconfigured demo

```
$ demo run <configuration>
```

Using command-line options

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

### Input

|             |                 |
| ----------  | --------------- |
{{#input}}
| {{options}} | {{format}} |
{{/input}}

See 'Synopsis' above for descriptions

### Output

|             |                 |
| ----------  | --------------- |
{{#output}}
| {{options}} | {{format}} |
{{/output}}

See 'Synopsis' above for descriptions

### Algorithms

|             |                 | default     |
| ----------- | --------------- |:-----------:|
{{#algorithms}}
| {{options}} | {{description}} | {{default}} |
{{/algorithms}}

### Parameters

|             |                 |
| ----------- | --------------- |
{{#params}}
| {{options}} | {{description}}\n(default: {{default}}) |
{{/params}}


## Examples

{{#run.examples}}
{{description}}

```
$ demo run -- {{options}}
```
{{/run.examples}}
