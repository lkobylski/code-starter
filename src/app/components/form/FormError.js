export default class FormError {

    constructor(fieldName, errorMessage)
    {
        this.message = errorMessage;
        this.field = fieldName;
    }

    getMessage() {
        return this.message;
    }



}