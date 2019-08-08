<template>
    <div>
        <div id="nav">
            <router-link to="/">Month</router-link> |
            <router-link to="/week">Week</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'layout'
}
</script>
