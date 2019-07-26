# (source) - {{title}}

Source code included in /root/data

{{#source.preconfigured}}
## {{name}}

{{description}}

| --------- | ----------- |
| directory | {{dir}}     |
| authors   | {{authors}} |
| license   | {{license}} |
| version   | {{verion}}  |

### Notable files

| ------- | -------- | --------------- |
{{#notable_files}}
| {{tag}} | {{file}} | {{description}} |
{{/notable_files}}
{{/source.preconfigured}}
