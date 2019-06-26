export const convertUnicode = input => {
    return input.replace(/\\u(\w\w\w\w)/g, (a, b) => {
        return String.fromCharCode(parseInt(b, 16));
    });
};

export const decodeEntities = input => {
    let paragraph = document.createElement('p');
    paragraph.innerHTML= input;
    const result = paragraph.textContent || paragraph.innerText;
    paragraph = null;
    return result;
}

export const prepareSongTitle = input => {
    return input;
};
