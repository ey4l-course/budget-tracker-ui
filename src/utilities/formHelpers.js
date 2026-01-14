// formHelpers.js

export const flattenForm = (config, parentPath = "") => {
    const flatForm = [];
    for (const [key, value] of Object.entries(config)){
        const currentPath = parentPath ? `${parentPath}.${key}` : key;

        if (value.type){
            flatForm.push({...value, path: currentPath});
        }else{
            const Children = flattenForm (value, currentPath);
            flatForm.push(...Children)
        }
    }
    return flatForm
}

export const packForm = (FormData) => {
    const result = {};

Object.entries(FormData).forEach(([path, value]) => {
    const keys = path.split(".");
    let pointer = result;

    for (let i = 0; i < keys.length - 1; i++){
        const currentKey = keys[i];
        if (!pointer[currentKey])
            pointer[currentKey] = {};
        pointer = pointer[currentKey];
    }
    const setKey = keys[keys.length - 1];
    pointer[setKey] = value;
});
return result;
}