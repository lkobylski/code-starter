<template>
    <form @submit.prevent="submit(model)" @hasError="onHasError">
        <slot></slot>
        <div v-if="hasErrors" class="notification is-danger">{{showErrors}}</div>
    </form>
</template>

<script>
    import slotMixin from './../../mixins/slot';
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
            slotMixin,
        ],

        methods: {
            onHasError () {
                console.log('Mam błąd AAAAAA');

            },



            submit () {
                this.$emit('send', this.model);
            },

            getErrorsForm (field) {
                return "aaa";
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
        },

        created () {
            this.fields = this.$children;
            //this.fields[1].error = "TEST error";
        },

        mounted() {
         // this.fields[0].error = "Test error";
        }
    }
</script>