function getObjectProperty(obj, path) {
    //obj: The data object.
    //path: The path (address) of the property in the data object.
    //delimiter: The data delimeter in the path used to split items into an array.
    //Takes a javascript or json object and a path (address) the property in the object.
    //Returns the data at the address(path) if one is present. Else returns undefined.
    var delimiter = '.',
        propertyValue = undefined;
    let pa = path.split(delimiter);
    try {
        propertyValue = path.replace('[', delimiter) // Replace [
            .replace(']', '')                        // Replace ]
            .split(delimiter)                        // split on '.' to create an array of 1 or more
            .reduce((o, p) => {
                        return o[p];
                    }, obj);
        return propertyValue;
    } catch (err) {
        return undefined;
    }
}

function setObjectProperty(obj, path, value) {
    //obj: The data object.
    //path: The path (address) of the property in the data object.
    //delimiter: The data delimeter in the path used to split items into an array.
    //Takes a javascript or json object and a path (address) the property in the object.
    //Returns the data at the address(path) if one is present. Else returns undefined.
    var delimiter = '.',
        propertyValue = undefined;
    let pa = path.split(delimiter);
    let op = undefined;
    let pp = '';
    try {
        propertyValue = path.replace('[', delimiter) // Replace [
            .replace(']', '')                        // Replace ]
            .split(delimiter)                        // split on '.' to create an array of 1 or more
            .reduce((o, p) => {
                        op = o;
                        pp = p;
                        return o[p];
                    }, obj);
        
        op[pp] = value;   
        obj.isDirty = true;         
        return true;
    } catch (err) {
        return undefined;
    }
}
function bind(template, obj){
    //  Captures brackets and any content, e.g. {{propertyName}} Or {{object.propertyName}}.
    let brackets = /{{(.*?)}}/g;

    // Captures content between brackets. Does not capture the brackets themselves.
    let propertyPattern = /(?<=\{{)(.*?)(?=\}})/g;

    // Match all brackets and content (property name), e.g. {{propertyName}} Or {{object.propertyName}}.
    let match = template.match(brackets);
    match.forEach(m => {
        // Now replace the property name with the value in
        // the data object, whilst removing the brackets.
        let propertyName = m.match(propertyPattern).toString();
        // Now get the value from object. Works if property is nested, e.g. address.street.number
        let t = getObjectProperty(obj, propertyName);
        // Update the template by replacing the brackets with the object content.
        template = template.replace(m,t || '');
    });

    // Finally, return the updated template.
    return template;
}

function castValues(propertyValue, dataValue) {
    let returnValue = undefined;
    switch (typeof(propertyValue)) {
        case "boolean":
            return dataValue;
        case "number":
            return Number(dataValue);
        case "string":
            return String(dataValue).trim();
        case null:
            return "";
        default:
            return dataValue;
    }
}

// Get JSON data from uri.
// uri: endpoint uri/address or file location.
// callback: a callback function that takes a data argument.
function getJSON(uri, callback) {
    fetch(uri)
    .then(res =>{
            return res.json();
        })
        .then((data)=>{
            if(callback){
                callback(data);
            }
            return data;
        })
        .catch(err => {
            console.log(`Error (getApiData), File: ${uri}`);
            return err;
        });
}


function getJsonXhr(file, callback, funcs){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onprogress = function() {
        // Run functions (func);
        if(func){
            funcs.forEach(func => {
                func();
            });
        }
    };
    xhr.onload = function() { 
        if (this.status === 200) {
            // Gets the html text from the template.
            let html = xhr.responseText.trim();
            callback(html);
        }
    };
    xhr.send();
}
