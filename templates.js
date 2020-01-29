function getObjectProperty(obj, path) {
    //obj: The data object.
    //path: The path (address) of the property in the data object.
    //delimiter: The data delimeter in the path used to split items into an array.
    //Takes a javascript or json object and a path (address) the property in the object.
    //Returns the data at the address(path) if one is present. Else returns undefined.
    var delimiter = '.',
        propertyValue = undefined;
    let pa = path.split(delimiter);
    //console.log(pa);
    try {
        propertyValue = path.replace('[', delimiter) // Replace [
            .replace(']', '')                        // Replace ]
            .split(delimiter)                        // split on '.' to create an array of 1 or more
            .reduce((o, p) => {
                        return o[p]
                    }, obj);
        return propertyValue;
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
