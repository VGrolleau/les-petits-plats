export function createTag(type, data) {
    const selectionSection = document.querySelector(".selection-section");
    const tagDiv = document.createElement('div');
    const xMark = '<i class="fa-regular fa-circle-xmark close"></i>';
    tagDiv.classList.add("tag-div");
    tagDiv.innerHTML = data + xMark;

    switch (type) {
        case "ingredient":
            tagDiv.style.backgroundColor = "#3282F7";
            break;

        case "appliance":
            tagDiv.style.backgroundColor = "#68D9A4";
            break;

        case "ustensil":
            tagDiv.style.backgroundColor = "#ED6454";
            break;
    }

    selectionSection.appendChild(tagDiv);
}