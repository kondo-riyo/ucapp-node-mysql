<template>
    <div>
    <p v-show="!$store.state.users.login_user" @click="login"><a href="" class="btn-border btn--radius">LOGIN</a></p>
    <p v-show="$store.state.users.login_user" @click="logout"><a href="" class="btn-border btn--radius">LOGOUT</a></p>
    </div>
</template>
