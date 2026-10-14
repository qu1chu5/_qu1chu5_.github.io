/**
 * Sets up one gallery. Each gallery has its own elements and state, so several can run on the same page.
 * @param {string} imageID - id of the gallery-image div
 * @param {string} textID - id of the gallery-text div
 * @param {string} prevButtonID - id of the "<" button
 * @param {string} nextButtonID - id of the ">" button
 * @param {{imageSrc: string, isVideo: boolean, isBottomAligned: boolean, galleryTextHeader: string, galleryTextBody: string}[]} items - one object per slide
 */
function initGallery(imageID, textID, prevButtonID, nextButtonID, items) {
    const galleryImageContainer = document.getElementById(imageID);
    const galleryTextContainer = document.getElementById(textID);
    const galleryHeader = galleryTextContainer.querySelector("h4");
    const galleryBody = galleryTextContainer.querySelector("p");
    const prevButton = document.getElementById(prevButtonID);
    const nextButton = document.getElementById(nextButtonID);
    let index = 0;

    function render() {
        const media = document.createElement(items[index].isVideo ? "video" : "img");
        console.log(items[index]);
        media.src = items[index].imageSrc;
        if (items[index].isVideo) {
            media.setAttribute("autoplay", "");
            media.setAttribute("muted", "");
            media.setAttribute("playsinline", "");
        }
        galleryImageContainer.replaceChildren(media);

        galleryImageContainer.classList.toggle("gallery-image-bottom-aligned", items[index].isBottomAligned);
        galleryImageContainer.classList.toggle("gallery-image", !items[index].isBottomAligned);

        galleryHeader.innerHTML = items[index].galleryTextHeader;
        galleryBody.innerHTML = items[index].galleryTextBody;

        prevButton.disabled = (index === 0);
        nextButton.disabled = (index === items.length - 1);
    }

    prevButton.addEventListener("click", () => {
        index -= 1;
        render();
    });

    nextButton.addEventListener("click", () => {
        index += 1;
        render();
    });

    render();
}
