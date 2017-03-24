export default {
    data () {
        return {
            errors: {}
        };
    },

    methods: {
        hasErrorFor(field) {
            console.log(this.errors[field]);
            return this.errors[field] !== undefined
                ;
        },

        getErrorFor(field) {
            if (!this.hasErrorFor(field)) {
                return null;
            }

            return this.errors[field];
        },

        hasErrors() {
            return Object.keys(this.errors).length > 0;
        },

        clearErrors() {
            this.errors = {};
        },

        clearErrorsFor(field) {
            if (this.hasErrorFor(field)) {
                this.errors[field] = [];
            }
        },
    }

};
