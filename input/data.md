# (data) - {{title}}

Data sets included in /root/data

{{#data.preconfigured}}
## {{title}}

| ------- | ---------- |
| source  | {{source}} |
| url     | {{url}}    |

### Files

{{#files}}
| -------- | ---------- | --------------- |
| {{file}} | {{format}} | {{description}} |
{{/files}}

### Metadata

| --------------- | ---------- |
{{#files}}
| ___{{title}}    |            |
{{#meta}}
| {{description}} | {{data}}   |
{{/meta}}
{{/files}}

{{/data.preconfigured}}
