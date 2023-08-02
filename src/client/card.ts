import html2canvas from "html2canvas";

interface Colors {
    bgColor?: string,
    fgColor?: string,
    imgBgColor?: string,
}

class Card {
    width: number;
    height: number;
    fontFamily: string;
    borderRadius: number;
    colors: Colors;
    html: string;
    css: string;

    constructor({
        width = 550,
        height = 300,
        fontFamily = "'Montserrat', 'Poppins', sans-serif",
        borderRadius = 5,
        colors = {
            bgColor: "#331D2C",
            fgColor: "#D9D9D9"
        },
    }) {
        this.width = width;
        this.height = height;
        this.fontFamily = fontFamily;
        this.borderRadius = borderRadius;
        this.colors = colors;

        this.html = "";
        this.css = "";
    }

    setHTML(value: string) {
        this.html = value;
    }

    setCSS(value: string) {
        this.css = value;
    }
    /*`
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .card__cover {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
            }
            #cover__image {
                width: 207px;
                height: 207px;
                border-radius: 5px;
                background-color: ${imgBgColor};
            }
            #cover__status {
                font-weight: 500;
                font-size: 18px;
                margin-top: 15px;
            }
            .card__control {
                width: 100%;
                word-wrap: break-word;
            }
            #control__title {
                margin-top: 47px;
                font-weight: 600;
                width: 250px;
            }
            #control__artist {
                font-size: 20px;
                font-weight: 600;
                margin-left: 8px;
            }
        </style>
    `*/


    renderCard() {
        const htmlElement = `
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
                        @media print {
                            /* Define print styles here */
                            body *:not(#my-content) {
                                display: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${this.html}
                    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
                    <script>
                        document.addEventListener("DOMContentLoaded", ${convertToImage});
                    </script>
                </body>
            </html>
        `;

        return htmlElement;
    }
}

const convertToImage = () => {
    const cardHtml = document.getElementById('card') as HTMLDivElement;
    html2canvas(cardHtml, { allowTaint: true, useCORS: true }).then(canvas => {
        const imageUrl = canvas.toDataURL('image/png')
        const img = document.createElement('img') as HTMLImageElement;
        img.src = imageUrl;
        document.body.appendChild(img);
        
        cardHtml.style.display = 'none';
    })
}

export { Card };
export default Card;