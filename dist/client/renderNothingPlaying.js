export const renderNothingPlaying = (musicStats) => {
    const cardWidth = 550;
    const cardHeight = 300;
    const bgColor = "#331D2C";
    const fgColor = "#D9D9D9";
    const fontFamily = "'Montserrat', 'Poppins', sans-serif";
    const imgBgColor = "#3F2E3E";
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
                <img src="" id="cover__image" />
                <p id="cover__status">NOT PLAYING</p>
            </div>

            <div class="card__control">
                <p id="control__title"></p>
                <p id="control__artist"></p>
            </div>
        </div>
        <script>
        </script>
        `);
};
