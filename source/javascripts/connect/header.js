export class ConnectHeader {
    constructor() {
        this.connect = document.querySelector('.ha-connect');
        if(!this.connect) return;
        this.header = this.connect.querySelector('.connect-nav');
        if(!this.header) return;

        this.headerHeight = this.header.offsetHeight;
        this.setupStickyHeader();
    }

    setupStickyHeader() {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 68) {
                this.connect.classList.add('sticky-header');
            } else {
                this.connect.classList.remove('sticky-header');
            }
        });
    }
}