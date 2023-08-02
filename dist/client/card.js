class Card {
    width;
    height;
    fontFamily;
    borderRadius;
    colors;
    html;
    css;
    constructor({ width = 550, height = 300, fontFamily = "'Montserrat', 'Poppins', sans-serif", borderRadius = 5, colors = {
        bgColor: "#331D2C",
        fgColor: "#D9D9D9"
    }, }) {
        this.width = width;
        this.height = height;
        this.fontFamily = fontFamily;
        this.borderRadius = borderRadius;
        this.colors = colors;
        this.html = "";
        this.css = "";
    }
    setHTML(value) {
        this.html = value;
    }
    setCSS(value) {
        this.css = value;
    }
    renderCard() {
        return `
        <html lang="en">
            <head>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .card {
                        width: ${this.width}px;
                        height: ${this.height}px;
                        background-color: ${this.colors.bgColor};
                        display: flex;
                        border-radius: 5px;
                        color: ${this.colors.fgColor};
                        font-family: ${this.fontFamily};
                    }
                    ${this.css}
                </style>
            </head>
            <body>
                ${this.html}
            </body>
        </html>
        `;
    }
}
export { Card };
export default Card;
