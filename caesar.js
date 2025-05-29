// Get the element from DOM
const form = document.getElementById("controls");
const hInput = document.querySelector("#heading-input");
const hOutput = document.querySelector("#heading-output");
const selectEncodeOrDecode = document.getElementsByName("code");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const shiftKey = document.getElementById("shift-input");
const modulo = document.getElementById("mod-input");
const alphabet = document.getElementById("alphabet-input");
const letterCase = document.getElementById("letter-case");
const foreignChars = document.getElementById("foreign-chars");

// Change the heading title and clear the content depending on whether to encode or decode
selectEncodeOrDecode.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.value === "encode") {
            hInput.textContent = "Plaintext";
            hOutput.textContent = "Ciphertext";
            inputText.value = "";
            outputText.value = "";
            
            textAreaSection.appendChild(inputContainer);
            textAreaSection.appendChild(outputContainer);
        } else if (option.value === "decode") {
            hInput.textContent = "Ciphertext";
            hOutput.textContent = "Plaintext";
            inputText.value = "";
            outputText.value = "";

            textAreaSection.appendChild(outputContainer);
            textAreaSection.appendChild(inputContainer);
        }

        // Swap the text areas based on mode
        const textAreaSection = document.querySelector(".text-area");
        const inputOutputs = textAreaSection.querySelectorAll(".input-output");
        if (option.value === "encode") {
            textAreaSection.appendChild(inputOutputs[0]); // Plaintext first
            textAreaSection.appendChild(inputOutputs[1]); // Ciphertext second
        } else if (option.value === "decode") {
            textAreaSection.appendChild(inputOutputs[1]); // Ciphertext first
            textAreaSection.appendChild(inputOutputs[0]); // Plaintext second
        }
    });
});

// When the click submit it will perform caesar cipher
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the value of from the DOM
    let inputTextValue = inputText.value;
    let selectedOption = Array.from(selectEncodeOrDecode).find((option) => option.checked);
    let shiftValue = parseInt(shiftKey.value);
    let moduloValue = parseInt(modulo.value);
    let alphabetValue = alphabet.value;
    let letterCaseValue = letterCase.value;
    let foreignCharsValue = foreignChars.value;

    /**
     * Applies the caesar cipher to the input text using the specified shift and modulus.
     */
    function caesarCipher(decode, text, shift, mod, charset, foreignChars) {
        if (decode === "decode") {
            shift = -shift;
        }
        if (foreignChars == 1) {
            text = removeForeignChars(text);
        }
        charset = charset.toLowerCase();
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            const index = charset.indexOf(char.toLowerCase());
            if (index !== -1) {
                let newIndex = (index + shift) % mod;
                if (newIndex < 0) newIndex += mod;
                char = char === char.toLowerCase() ? charset[newIndex] : charset[newIndex].toUpperCase();
            }
            result += char;
        }
        return result;
    }

    function removeForeignChars(input) {
        const regex = /[^a-zA-Z0-9 ]/g;
        return input.replace(regex, "");
    }

    let cipherOutput = caesarCipher(selectedOption.value, inputTextValue, shiftValue, moduloValue, alphabetValue, foreignCharsValue);

    if (letterCaseValue == 2) {
        cipherOutput = cipherOutput.toLowerCase();
    } else if (letterCaseValue == 3) {
        cipherOutput = cipherOutput.toUpperCase();
    }

    outputText.value = cipherOutput;
});
