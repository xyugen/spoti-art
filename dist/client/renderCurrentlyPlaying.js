import Card from "./card.js";
export const renderCurrentlyPlaying = (musicStats, key, options) => {
    let isPlaying = musicStats.is_playing ? "Playing" : "Paused";
    const imageUrl = musicStats.item?.album.images[1].url;
    const musicTitle = musicStats.item?.name;
    const musicArtist = musicStats.item?.album.artists[0].name;
    if (!musicStats.item?.name)
        isPlaying = "Not playing";
    const card = new Card({});
    card.setHTML(`
        <div class="card" id="card">
            <div class="card__cover">
                <img src="${imageUrl || ""}" id="cover__image" />
                <p id="cover__status">${isPlaying.toUpperCase()}</p>
            </div>

            <div class="card__control">
                <p id="control__title">${musicTitle || ""}</p>
                <p id="control__artist">${musicArtist || ""}</p>
            </div>
        </div>
        <script>
            document.addEventListener("DOMContentLoaded", ${computeTitleSize});
        </script>
    `);
    card.setCSS(`
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
            background-color: ${options?.imgBgColor || "#3F2E3E"};
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
    `);
    return (card.renderCard());
};
const computeTitleSize = () => {
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    const controlTitle = document.getElementById("control__title");
    if (controlTitle) {
        const titleText = controlTitle.textContent || "";
        const titleLength = titleText.length;
        const newFontSize = 78 - (titleLength * 1.75);
        controlTitle.style.fontSize = `${clamp(newFontSize, 30, 78)}px`;
    }
};
