const fs = require('fs');

const mustache = require('mustache');
const remarkable = require('remarkable');
const htmlToText = require('html-to-text');

var compact = require('lodash/compact');
var zip = require('lodash/zip');
var max = require('lodash/max');
var padEnd = require('lodash/padEnd');

// vars for template.md
// template.md
// template.html
// out.md
// out.html
// out.text

function makeDocs(config) {
    // Create the markdown
    var md = renderMarkdown(config);
    fs.writeFileSync(config.out.md, md);
    console.log("Wrote", config.out.md);

    // Create the html body
    var innerHtml = renderInnerHtml(md);
    
    // Create the full html file
    var html = renderHtml(config, innerHtml);
    fs.writeFileSync(config.out.html, html);
    console.log("Wrote", config.out.html);

    // Create the text file
    var text = renderText(innerHtml);
    fs.writeFileSync(config.out.text, text);
    console.log("Wrote", config.out.text);
}

function renderMarkdown(config) {
    var md = '';
    try {
        md = fs.readFileSync(config.template.md, 'utf8');
    } catch (error) {
        throw error;
    }

    try {    
        md = mustache.render(md, config.vars);
    } catch (error) {
        throw error;
    }

    return md;
}

function renderInnerHtml(md) {
    var htmlTemplate = '<div class="guide">{{&content}}</div>';
    var mdParser = new remarkable({ html: true, breaks: true });
    
    var inner = '';
    try {
        inner = mdParser.render(md);
    } catch (error) {
        throw error;
    }

    var html = '';
    try {
        html = mustache.render(htmlTemplate, { content: inner });
    } catch (error) {
        throw error;
    }

    return html;
}

function renderHtml(config, innerHtml) {
    var html = '';
    try {
        html = fs.readFileSync(config.template.html, 'utf8');
    } catch (error) {
        throw error;
    }

    try {
        html = mustache.render(html, { guide: innerHtml });
    } catch (error) {
        throw error;
    }

    return html;
}

function renderText(html) {
    var buffer = '';

    // Write heading
    var empty = " ";
    buffer += empty.repeat(60) + "type 'q' to exit\n";
    buffer += empty.repeat(60) + "scroll to view all\n";

    try {
        buffer += __renderText(html);
    } catch (error) {
        throw error;
    }

    return buffer;
}
function __renderText(html) {
    var buffer = '';
    
    // Only parses headings, paragraphs, and tables. Code is
    // handled in paragraphs
    htmlToText.fromString(html, {
        baseElement: "div.guide",
        
        // Parse all tables
        tables: true,

        // Don't uppercase headings as they're parsed
        uppercaseHeadings: false,

        // Won't have any images so doesn't matter
        ignoreImage: true,
        
        // This doesn't seem to work properly
        wordwrap: null,
        
        format: {
            heading: function(elem, fn, options) {
                let text = formatHeading(elem, fn, options);
                buffer += text;
                return text;
            },
            paragraph: function(elem, fn, options) {
                let text = formatParagraph(elem, fn, options);
                buffer += text;
                return text;
            },
            table: function(elem, fn, options) {
                let text = formatTable(elem, fn, options);
                buffer += text;
                return text;
            },
            lineBreak: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning: didn't write line break: " +
                            elem.name + ": " + text);
                return text;
            },
            anchor: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning: didn't write anchor: " +
                            elem.name + ": " + text);
                return text;
            },
            orderedList: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write ordered list: " +
                            elem.name + ": " + text);
                return text;
            },
            unorderedList: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write unordered list: " +
                            elem.name + ": " + text);
                return text;
            },
            listItem: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write list item: " +
                            elem.name + ": " + text);
                return text;
            },
            horizontalLine: function(elem, fn, options) {
                let text = fn(elem.children, options);
                console.log("Warning didn't write horizontal line: " +
                            elem.name + ": " + text);
                return text;
            }
        }
    });

    return buffer;
}

var header = '';
function formatIndent(isHeader) {
    if (isHeader) {
        switch (header) {
        case 'h1':
            return '  ';
        case 'h2':
            return '  ';
        case 'h3':
            return '    ';
        case 'h4':
            return '      ';
        default:
            return '  ';
        }
    }
    
    switch (header) {
    case 'h1':
        return '  ';
    case 'h2':
        return '    ';
    case 'h3':
        return '      ';
    case 'h4':
        return '        ';
    default:
        return '  ';
    }
}

function formatHeading(elem, fn, options) {
    header = elem.name;            

    let text = fn(elem.children, options);    
    text = '\n' + formatIndent(true) + text + '\n';
    
    if (elem.name !== 'h1') {
        let underline = "=";
        text += formatIndent(true) +  underline.repeat(text.length) + '\n';
    }
    
    text += '\n';
    
    return text;
}

function formatParagraph(elem, fn, options) {
    let text = fn(elem.children, options);
    let lines = text.split('\n');
    let _indent = formatIndent(false);
    
    if (isCode(elem, options))
        _indent += '  ';

    text = '';
    lines.forEach(function(line) {
        text += _indent + line + '\n';
    });
    
    if (!isCode(elem, options))
        text += '\n';
    
    return text;
}

function isCode(elem, options) {
    return (options.isInPre &&
            elem.children.length == 1 &&
            elem.children[0].name == 'code');
}

function formatTable(elem, fn, options) {
    var table = [];
    function tryParseRows(elem) {
        if (elem.type !== 'tag') {
            return;
        }
        switch (elem.name.toLowerCase()) {
        case "thead":
        case "tbody":
        case "tfoot":
        case "center":
            elem.children.forEach(tryParseRows);
            return;            
        case 'tr':
            var row = [];
            elem.children.forEach(function(elem) {
                var tokens;
                if (elem.type === 'tag') {
                    if (elem.name.toLowerCase() === 'td') {
                        tokens = fn(elem.children, options).split('\n');
                        row.push(compact(tokens)[0]);
                    }
                }
            });
            table.push(row);
            break;
        }
    }    
    elem.children.forEach(tryParseRows);

    let lines = tableToString(table).split('\n');

    let text = '';
    lines.forEach(function(line) {
        text += formatIndent(false) + line + '\n';
    });

    return text;    
}

function tableToString(table) {
    // Determine space width per column
    // Convert all rows to lengths
    var widths = table.map(function(row) {
        return row.map(function(col) {
            return col.length;
        });
    });
    
    // Invert rows with colums
    widths = zip.apply(null, widths);
    // Determine the max values for each column
    widths = widths.map(function(col) {
        return max(col);
    });
    
    // Build the table
    var text = '';
    table.forEach(function(row) {
        var i = 0;
        row.forEach(function(col) {
            text += padEnd(col, widths[i++], ' ') + '   ';
        });
        if (text.length == 0)
            return;
        text += '\n';
    });
    return text;
}

module.exports = {
    makeDocs: makeDocs
};
