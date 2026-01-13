// formHelpers.js

export const flattenForm = (formData) => {
    const flatForm = [];
    for (obj in formData){
        if (obj.type){
            obj.path = obj.key;
            flatForm.push(obj);
        }else{
            for (field in obj){
                obj.path = obj.key + "." + field.key;
                flatForm.push(obj);
            }
        }
    }
    return flatForm
}