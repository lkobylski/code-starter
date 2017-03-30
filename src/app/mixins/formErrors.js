import FormError from '../components/form/FormError';

export default {
    data () {
        return {
            errors: {}
        };
    },

    methods: {
        hasErrorFor(field) {

            return this.errors[field] !== undefined
                &&
                this.errors[field]
                &&
                this.errors[field].constructor === FormError
                ;
        },

        getErrorFor(field) {

            if (!this.hasErrorFor(field)) {
                return null;
            }

            return this.errors[field].message;
        },

        hasErrors() {
            return Object.keys(this.errors).length > 0;
        },

        clearErrors() {
            this.errors = {};
        },

        clearErrorsFor(field) {
            if (this.hasErrorFor(field)) {
                this.errors[field] = null;
            }
        },
    }

};
