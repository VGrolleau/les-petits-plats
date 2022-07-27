export function createTag(color, data, callback) {
    const selectionSection = document.querySelector(".selection-section");
    const tagDiv = document.createElement('div');
    const iXMark = document.createElement("i");
    iXMark.classList.add("fa-regular", "fa-circle-xmark", "close")
    tagDiv.classList.add("tag-div");
    tagDiv.innerHTML = data;
    tagDiv.appendChild(iXMark);
    tagDiv.style.backgroundColor = color;

    selectionSection.appendChild(tagDiv);

    iXMark.addEventListener("click", () => {
        tagDiv.style.display = "none";
        callback();
    });
}