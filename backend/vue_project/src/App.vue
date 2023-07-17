<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
}
</script>

<style>

.body {
  min-height: 100vh;
  background: url("images/cover.jpg") no-repeat;
  background-size: cover;
  padding: 5px;
}

.main-block {
  width: 65%;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 5px 10px 5px;
  min-height: 100vh;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.4);
  overflow: auto;
}

.app-form {
  padding: 1px 5px 10px 5px;
  display: flex;
  flex-direction: column;
}

.app-input {
  height: 25px;
  padding: 5px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  border-radius: 5px;
  outline: 0;
  margin-bottom: 10px;
}

select.app-input {
  height: 35px;
  color: #000000;
}

.app-input:focus {
  border-color: #bdbdbd;
  box-shadow: 0 0 0 0.1rem rgba(158, 158, 158, 0.25);
}

.btn-success {
  background-color: #e2fae2 !important;
  border: 1px solid #53cc2a !important;
  font-size: 1em !important;
  margin: 0 auto 0 !important;
}

.btn-success:hover, .btn-success:focus {
  border-color: rgb(70, 250, 3) !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgb(70, 250, 3) !important;
}

select {
  border: 1px solid #ccc;
  border-radius: 6px;
}


.inline-link {
  position: relative;
  font-size: 1.4em;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  cursor: pointer;
}

.inline-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 5px;
  transform-origin: center;
  transform: scaleX(0);
  transition: transform .3s;
}

.inline-link:hover::after {
  transform: scaleX(1);
}


.no-items {
  max-width: 100%;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
}

.item-content {
  text-align: center;
  padding: 16px;
}

.image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.5);
}

.text-content {
  max-width: 460px;
  margin: auto;
  padding: 16px;
}

table#app-table {
  margin: 0 auto;
  border-collapse: collapse;
  font-family: Agenda-Light, sans-serif;
  font-weight: 100;
  background: #5c9f5c;
  color: #fff;
  text-rendering: optimizeLegibility;
  border-radius: 10px;
  table-layout:fixed
}

table#app-table caption {
  font-size: 2rem;
  color: #1a1919;
  margin: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center left, center right;
}

table#app-table thead th {
  font-weight: 600;
}


table#app-table thead th, table#app-table tbody td {
  padding: .8rem;
  font-size: 1.4rem;
}

table#app-table tbody td {
  padding: .8rem;
  font-size: 1.4rem;
  color: #000000;
  background: #eee;
  text-align: center;
}

table#app-table tbody tr:not(:last-child) {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

@media screen and (max-width: 600px) {
  table#app-table caption {
    background-image: none;
  }

  table#app-table thead {
    display: none;
  }

  table#app-table tbody td {
    display: block;
    padding: .6rem;
  }

  table#app-table tbody tr td:first-child {
    background: #666;
    color: #fff;
  }

  table#app-table tbody td:before {
    content: attr(data-th);
    font-weight: bold;
    display: inline-block;
    width: 6rem;
  }
}

.delete-buttons {
  text-align: right;
}

.delete-button {
  font-size: 1.6rem;
  color: #ff0000;
  cursor: pointer;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(2deg);
  }

  66% {
    transform: rotate(-2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.invalid-wiggle {
  color: red !important;
  animation: wiggle 0.1s;
}

.helper-text {
  text-align: center;
  margin-left: 5px;
  color: red;
}


</style>
