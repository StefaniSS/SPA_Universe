import { Router } from './router.js'

const router = new Router()
router.add('/', "/pages/home.html")
router.add("/universe", "/pages/universe.html")
router.add("/explorer", "/pages/explorer.html")

document.addEventListener('DOMContentLoaded', () => {
    router.handle() 
});

window.onpopstate = () => router.handle()
window.route = (event) => router.route(event)
