var fieldCounter = 1;

var model = document.getElementById("modelContainer");

var template = document.getElementById("template");

ignoreFields = [
    'owner',
    'created_by',
    'last_modified_by',
    'created_at',
    'last_updated_at',
];

function getFromServer() {
    var tableName = document.getElementById("tableName").value;
    var url = "http://localhost:1337/GetTableColumns?table=" + tableName;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.addEventListener("readystatechange", processResponse, true);
    xhr.send();
}

function processResponse(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        if (response.length == 0) {
            console.log("Table doesn't exist");
            alert("Table doesn't exist");
            return;
        }
        document.getElementById("modelName").value = document.getElementById("tableName").value;
        removeColumns();
        fieldCounter = 0;
        for (let i=0;i<response.length;i++) {
            //ignore special fields
            if (ignoreFields.includes(response[i].COLUMN_NAME))
                continue;
            var secondField = template.cloneNode(true);
            secondField.setAttribute("id", fieldCounter + "");
            secondField.removeAttribute("hidden");
            secondField.children[0].children[0].id = "modelField" + fieldCounter;
            secondField.children[0].children[0].value = response[i].COLUMN_NAME;
            secondField.children[1].setAttribute("for", "modelType" + fieldCounter);
            secondField.children[2].setAttribute("id", "modelType" + fieldCounter);
            //switch for special cases of types
            switch (response[i].DATA_TYPE) {
                case "datetime2":
                    secondField.children[2].value = "DATETIME";
                    break;
                case "varchar":
                    secondField.children[2].value = "STRING";
                    break;
                case "numeric":
                    secondField.children[2].value = "INT";
                    break;
                default:
                    secondField.children[2].value = response[i].DATA_TYPE.toUpperCase();
            }
            model.appendChild(secondField);
            fieldCounter++;
        }
    }
}

function newField() {
    var secondField = template.cloneNode(true);

    secondField.setAttribute("id", fieldCounter + "");
    secondField.removeAttribute("hidden");
    secondField.children[0].children[0].id = "modelField" + fieldCounter;
    secondField.children[1].setAttribute("for", "modelType" + fieldCounter);
    secondField.children[2].setAttribute("id", "modelType" + fieldCounter);

    model.appendChild(secondField);
    fieldCounter++;
}

function generateModel() {
    let modelStr = "var Table = require(\"../core/Table\");\n\n";
    let modelName = document.getElementById("modelName").value;
    modelStr += "var model = {\n";
    //generate id special case
    modelStr += "\tid: {\n\t\ttype: Table.Types.BIGINT,\n\t\tautoIncrement: true,\n\t},\n";
    for (let i = 1; i < fieldCounter; i++) {
        let currentField = document.getElementById("" + i);
        let modelField = document.getElementById("modelField" + i).value;
        let modelType = document.getElementById("modelType" + i).value;
        modelStr += "\t" + modelField + ": Table.Types." + modelType + ",\n";
    }
    modelStr += "}\nvar modelInterface = new Table.Table(\"" + modelName + "\", model);\n\nmodule.exports = modelInterface;";
    return {modelStr: modelStr, modelName: modelName};
}
function generate() {
    var __ret = generateModel();
    let modelStr = __ret.modelStr;
    let modelName = __ret.modelName;
    document.getElementById("modelOutput").value = modelStr;
    document.getElementById("routeOutput").value = generateRoute(modelName);
}


function generateRoute(modelName) {
    return "var express = require('express');\n\nvar router = express.Router();\n\nvar " + modelName + " = require(\"../model/" + camelise(modelName) + "Model\");\n\n//Look here for routes\nrequire(\"./registerCrudMethods\")(router, " + modelName + ");\n\nmodule.exports = router;";
}

function parseDBText() {
    //remove existing fields
    if (!confirm("Warniing: unsaved changes will be lost!"))
        return;
    removeColumns();

    let script = document.getElementById("parseIn").value;
    //column names
    let text = script.replace(/ *\n */g, "").replace(/ */g,"");
    //get start of columns
    let start = text.indexOf("[");
    let end = text.indexOf("FROM");
    text = text.slice(start, end).split(",");
    let columns = text.map((currentVal, index, array) => {
            return currentVal.slice(1,-1);
    });
    let tableName = script.split(".")[2].slice(1,-1);

    //with this data now write to UI
    document.getElementById("modelName").value = tableName;

    //now add fields
    fieldCounter = 0;
    for (let i=0;i<columns.length;i++)
    {
        //ignore special fields
        if (ignoreFields.includes(columns[i]))
            continue;
        var secondField = template.cloneNode(true);
        secondField.setAttribute("id", fieldCounter + "");
        secondField.removeAttribute("hidden");
        secondField.children[0].children[0].id = "modelField" + fieldCounter;
        secondField.children[0].children[0].value = columns[i];
        secondField.children[1].setAttribute("for", "modelType" + fieldCounter);
        secondField.children[2].setAttribute("id", "modelType" + fieldCounter);
        model.appendChild(secondField);
        fieldCounter++;
    }
}

function downloadModel() {
    let modelName = document.getElementById("modelName").value;
    let modelStr = document.getElementById("modelOutput").value;
    download(camelise(modelName) + "Model.js", modelStr);
}

function downloadRoute() {
    let modelName = document.getElementById("modelName").value;
    let routeStr = document.getElementById("routeOutput").value;
    download(camelise(modelName) + ".js", routeStr)
}

function removeColumns() {
    while (model.hasChildNodes()) {
        model.removeChild(model.lastChild);
    }
}

newField();

//Util funcs
function camelise(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

