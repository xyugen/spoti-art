export const renderCurrentlyPlaying = (musicStats) => {
    const cardWidth = 550;
    const cardHeight = 300;
    const bgColor = "#331D2C";
    const fgColor = "#D9D9D9";
    const fontFamily = "'Montserrat', 'Poppins', sans-serif";
    const imgBgColor = "#3F2E3E";
    const computeTitleSize = () => {
        const controlTitle = document.getElementById("control__title");
        if (controlTitle) {
            const titleText = controlTitle.textContent || "";
            const titleLength = titleText.length;
            controlTitle.style.fontSize = `${78 - (titleLength * 1.5)}px`;
        }
    };
    const setCSS = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .card {
                width: ${cardWidth}px;
                height: ${cardHeight}px;
                background-color: ${bgColor};
                display: flex;
                border-radius: 5px;
                color: ${fgColor};
                font-family: ${fontFamily};
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
    `;
    return (`
        <html lang="en">
            ${setCSS}
        </html>
        <div class="card">
            <div class="card__cover">
                <img src="${musicStats.item.album.images[1].url}" id="cover__image" />
                <p id="cover__status">PLAYING</p>
            </div>

            <div class="card__control">
                <p id="control__title">${musicStats.item.name}</p>
                <p id="control__artist">${musicStats.item.album.artists[0].name}</p>
            </div>
        </div>
        <script>
            document.addEventListener("DOMContentLoaded", ${computeTitleSize});
        </script>
        `);
};
