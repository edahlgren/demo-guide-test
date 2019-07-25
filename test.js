const util = require('util');
const fs = require('fs');
const path = require('path');

const toml = require('toml');
const cli = require('command-line-args');

const convert = require('./convert');

const cliSpec = [
    { name: 'toml' },
    { name: 'md' },
    { name: 'html' },
    { name: 'outdir' }
];

function main() {
    const args = cli(cliSpec);
    checkArgs(args);

    var topic = path.basename(args.md, '.md');
    var vars = parseVars(args, topic);

    var out = path.join(args.outdir, topic);
    var config = {
        vars: vars,
        template: {
            md: args.md,
            html: args.html
        },
        out: {
            md: out + '.md',
            html: out + '.html',
            text: out + '.text'
        }
    };

    convert.makeDocs(config);
}

function checkArgs(args) {
    if (!args.toml) {
        console.log("Need a path to a toml file");
        process.exit(1);
    }
    if (!args.md) {
        console.log("Need a path to a markdown template");
        process.exit(1);
    }
    if (!args.html) {
        console.log("Need a path to an html template");
        process.exit(1);
    }
    if (!args.outdir) {
        console.log("Need a path to an output directory");
        process.exit(1);
    }
}

function parseVars(args, topic) {
    var content = '';
    try {
        var content = fs.readFileSync(args.toml, 'utf8');
    } catch (error) {
        throw error;
    }

    var tomlData = {};
    try {
        tomlData = toml.parse(content);
    } catch (error) {
        throw error;
    }

    switch (topic) {
    case 'run':
        return dataForRun(tomlData);
    default:
        return tomlData;
    }
}

function dataForRun(data) {
    console.log(data);
    var out = {
        title: data.title,
        run: {
            description: data.run.description,
        }
    };
    out.run['preconfigured'] = objectToArray(data.run.preconfigured);
    out.run['examples'] = objectToArray(data.run.examples);
    out['input'] = objectToArray(data.input);
    out['output'] = objectToArray(data.output);
    out['algorithms'] = objectToArray(data.algorithms);
    out['params'] = objectToArray(data.params);

    console.log(util.inspect(out, false, null, true /* enable colors */));
    
    // TODO: Convert Demofile json to json that works with run.md
    //
    // - Fill out run.description to Demofile
    //
    // - Transform
    //     [run.preconfigured], [run.examples], [input], [output],
    //     [algorithms], [params],
    //   { run: { preconfigured: { djibouti: { description: ... } } }
    //   { run: { preconfigured: [ { name: djibouti, description: ... } }
    //
    // - Make output options show "(not configurable)"
    return out;
}

function objectToArray(orig) {
    var out = [];
    for (var key in orig) {
        let newobj = { name: key };

        let child = orig[key];
        for (var attr in child) {
            let field = child[attr];
            if (attr === "options") {
                if (field.length == 0)
                    newobj[attr] = "none";
                else
                    newobj[attr] = field.join(", ");
            } else {
                newobj[attr] = field;
            }
        }

        out.push(newobj);
    }
    return out;
}

main();
