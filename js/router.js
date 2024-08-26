export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        const href = event.target.href || event.target.getAttribute('href')
        if (href) {
            window.history.pushState({}, "", href)
            this.handle()
        }
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes['/']

        fetch(route)
            .then(response => response.text())
            .then(html => {
                document.querySelector('#app').innerHTML = html

            
                document.body.className = ''

                if (pathname === '/' || !this.routes[pathname]) {
                    document.body.classList.add('home')
                } else if (pathname === '/universe') {
                    document.body.classList.add('universe')
                } else if (pathname === '/explorer') {
                    document.body.classList.add('explorer')
                }

                this.setActiveNavLink()
                this.setupButtonEvents()
                this.setupLogoClick()
            })
            .catch(error => {
                console.error('Erro ao carregar a página:', error)
            })
    }

    setActiveNavLink() {
        const links = document.querySelectorAll('nav a')
        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active')
            } else {
                link.classList.remove('active')
            }
        })
    }

    setupButtonEvents() {
        const learnMoreButton = document.getElementById('learn-more-button')
        if (learnMoreButton) {
            learnMoreButton.addEventListener('click', (event) => {
                event.preventDefault()
                window.history.pushState({}, "", '/universe')
                this.handle()
            })
        }
    }

    setupLogoClick() {
        const logo = document.getElementById('logo')
        if (logo) {
            logo.addEventListener('click', (event) => {
                event.preventDefault()
                window.history.pushState({}, "", '/')
                this.handle()
            })
        }
    }
}
