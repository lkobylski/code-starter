<template>
    <form @submit.prevent="submit(model)">
        <slot></slot>
        <div v-if="hasErrors" class="notification is-danger">{{showErrors}}</div>
    </form>
</template>

<script>
    import slotMixin from './../../mixins/slot';
    import formErrors from './../../mixins/formErrors';
    import FormError from './FormError';


    export default {
        data () {
            return {
                fields: []
            }
        },
        props: {
            model: {required: true},
            error: null
        },

        mixins: [
            slotMixin
        ],

        methods: {

            submit () {
                this.$emit('send', this.model);
            }
        },

        computed : {
            showErrors () {

                if(this.error) {
                    return this.error.message;
                }
                return "";

            },

            hasErrors() {
                return !!this.error;
            },
        }

    }
</script>