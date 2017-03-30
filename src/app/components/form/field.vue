<template>
    <div class="field">
        <slot></slot>
        <p class="help is-danger" >{{error}}</p>
    </div>
</template>

<script>
    import slotMixin from './../../mixins/slot';

    export default {
        props: {
            error: {
                type: String
            }
        },

        mixins: [
            slotMixin,
        ],

        compute: {
            isError () {
                return !!this.error;
            }
        },

        methods: {
        },

        created () {

        }
    }
</script>