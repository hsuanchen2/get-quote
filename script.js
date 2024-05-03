// type effect
const typeInfo = {
    words: "",
    typingSpeed: 100,
    deletingSpeed: 50,
    nextWordDelay: 1200,
    authorName: "",
}

const typingTextField = document.querySelector(".quote-text");
const authorNameElement = document.querySelector(".author-name");
const getQuoteButton = document.querySelector(".get-quote-button");

let characterIndex = 0;

// refetch quote
const setLoading = (isLoading) => {
    getQuoteButton.disabled = isLoading;
}

const resetTypeInfo = () => {
    typeInfo.words = "";
    typeInfo.authorName = "";
}

const typeText = async () => {
    setLoading(true);
    for (characterIndex = 0; characterIndex < typeInfo.words.length; characterIndex++) {
        const newChar = typeInfo.words.charAt(characterIndex);
        typingTextField.insertAdjacentText("beforeend", newChar);
        await new Promise(resolve => setTimeout(resolve, typeInfo.typingSpeed));
    }
    authorNameElement.classList.add("show");
    setLoading(false);
}

const deleteText = async () => {
    while (characterIndex > 0) {
        currentText = typeInfo.words.substring(0, characterIndex - 1);
        typingTextField.textContent = currentText;
        characterIndex--;
        await new Promise(resolve => setTimeout(resolve, typeInfo.deletingSpeed));
    }
}

const QUOTE_API_URL = "https://api.quotable.io/random?maxLength=150&minLength=80";

const getQuote = async () => {
    setLoading(true);
    try {
        const response = await fetch(QUOTE_API_URL);
        const data = await response.json();
        resetTypeInfo();
        typeInfo.words = data.content;
        typeInfo.authorName = "-" + " " + data.author;
        authorNameElement.textContent = typeInfo.authorName;
    } catch (error) {
        console.error(error)
    } finally {
        await typeText();
        setLoading(false);
    }
}

getQuoteButton.addEventListener("click", async () => {
    authorNameElement.classList.remove("show");
    setLoading(true);
    await deleteText();
    await getQuote();
});

getQuote();