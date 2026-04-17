/**
 * Universal Code Converter
 * Developed by Muhammad Ali Mehdi
 * 
 * Modular, clean, and efficient conversion logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const state = {
        mode: 'encode', // 'encode' or 'decode'
        type: 'morse',  // selected converter type
        shift: 3        // caesar shift amount
    };

    // --- DOM Elements ---
    const elements = {
        encodingType: document.getElementById('encoding-type'),
        modeEncodeBtn: document.getElementById('mode-encode'),
        modeDecodeBtn: document.getElementById('mode-decode'),
        caesarControls: document.getElementById('caesar-controls'),
        shiftAmount: document.getElementById('shift-amount'),
        shiftValue: document.getElementById('shift-value'),
        inputText: document.getElementById('input-text'),
        outputText: document.getElementById('output-text'),
        convertBtn: document.getElementById('convert-btn'),
        clearBtn: document.getElementById('clear-btn'),
        copyBtn: document.getElementById('copy-btn')
    };

    // --- Mappings & Constants ---

    // Morse Code Map 
    const MORSE_CODE = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
        "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
        '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
        '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
    };

    // Reverse Morse Map for Decoding
    const MORSE_CODE_REVERSE = Object.entries(MORSE_CODE).reduce((acc, [char, code]) => {
        acc[code] = char;
        return acc;
    }, {});

    // --- Converter Functions ---

    const converters = {
        morse: {
            encode: (text) => {
                return text.toUpperCase().split('').map(char => {
                    if (char === ' ') return '/';
                    return MORSE_CODE[char] || char;
                }).join(' ');
            },
            decode: (text) => {
                return text.split(/[\s/]+/).map(code => {
                    if (code === '') return ' '; // handle excessive spaces
                    return MORSE_CODE_REVERSE[code] || code;
                }).join('');
            }
        },
        binary: {
            encode: (text) => {
                return text.split('').map(char => {
                    return char.charCodeAt(0).toString(2).padStart(8, '0');
                }).join(' ');
            },
            decode: (text) => {
                // Remove any non-binary characters (spaces, newlines, etc.)
                const cleanBinary = text.replace(/[^01]/g, '');
                if (cleanBinary.length % 8 !== 0) return "Error: Binary string length must be a multiple of 8.";

                const bytes = cleanBinary.match(/.{1,8}/g) || [];
                return bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
            }
        },
        ascii: {
            encode: (text) => {
                return text.split('').map(char => char.charCodeAt(0)).join(' ');
            },
            decode: (text) => {
                // Split by any non-digit character to handle "65, 66" or "65 66"
                return text.split(/[^\d]+/).filter(Boolean).map(code => {
                    return String.fromCharCode(parseInt(code, 10));
                }).join('');
            }
        },
        hex: {
            encode: (text) => {
                return text.split('').map(char => {
                    return char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
                }).join(' ');
            },
            decode: (text) => {
                // Remove any non-hex characters
                const cleanHex = text.replace(/[^0-9a-fA-F]/g, '');
                if (cleanHex.length % 2 !== 0) return "Error: Hex string must have an even number of characters.";

                const bytes = cleanHex.match(/.{1,2}/g) || [];
                return bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
            }
        },
        base64: {
            encode: (text) => {
                try {
                    return btoa(text);
                } catch (e) {
                    return "Error: " + e.message;
                }
            },
            decode: (text) => {
                try {
                    // Remove whitespace before decoding
                    return atob(text.replace(/\s/g, ''));
                } catch (e) {
                    return "Error: Invalid Base64 string.";
                }
            }
        },
        caesar: {
            encode: (text, shift) => {
                return text.replace(/[a-zA-Z]/g, (char) => {
                    const start = char <= 'Z' ? 65 : 97;
                    return String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
                });
            },
            decode: (text, shift) => {
                return text.replace(/[a-zA-Z]/g, (char) => {
                    const start = char <= 'Z' ? 65 : 97;
                    return String.fromCharCode((char.charCodeAt(0) - start - shift + 26) % 26 + start);
                });
            }
        }
    };

    // --- Core Logic ---

    function updateUI() {
        // Toggle Active State for Buttons
        if (state.mode === 'encode') {
            elements.modeEncodeBtn.classList.add('active');
            elements.modeDecodeBtn.classList.remove('active');
            elements.inputText.placeholder = "Enter text to encode...";
        } else {
            elements.modeEncodeBtn.classList.remove('active');
            elements.modeDecodeBtn.classList.add('active');
            elements.inputText.placeholder = "Enter code to decode...";
        }

        // Show/Hide Caesar Controls
        if (state.type === 'caesar') {
            elements.caesarControls.classList.remove('hidden');
        } else {
            elements.caesarControls.classList.add('hidden');
        }
    }

    function performConversion() {
        const input = elements.inputText.value;
        if (!input) {
            elements.outputText.value = "";
            return;
        }

        const converter = converters[state.type];
        let result = "";

        try {
            if (state.type === 'caesar') {
                result = state.mode === 'encode'
                    ? converter.encode(input, parseInt(state.shift))
                    : converter.decode(input, parseInt(state.shift));
            } else {
                result = state.mode === 'encode'
                    ? converter.encode(input)
                    : converter.decode(input);
            }
        } catch (error) {
            console.error(error);
            result = "Error in conversion.";
        }

        elements.outputText.value = result;
    }

    // --- Event Listeners ---

    // Type Change
    elements.encodingType.addEventListener('change', (e) => {
        state.type = e.target.value;
        updateUI();
        performConversion();
    });

    // Mode Change
    elements.modeEncodeBtn.addEventListener('click', () => {
        state.mode = 'encode';
        updateUI();
        performConversion();
    });

    elements.modeDecodeBtn.addEventListener('click', () => {
        state.mode = 'decode';
        updateUI();
        performConversion();
    });

    // Caesar Shift Change
    elements.shiftAmount.addEventListener('input', (e) => {
        state.shift = e.target.value;
        elements.shiftValue.textContent = state.shift;
        if (state.type === 'caesar') performConversion();
    });

    // Convert Button
    elements.convertBtn.addEventListener('click', performConversion);

    // Live Update (Optional enhance)
    // elements.inputText.addEventListener('input', performConversion); 

    // Clear Button
    elements.clearBtn.addEventListener('click', () => {
        elements.inputText.value = "";
        elements.outputText.value = "";
        elements.inputText.focus();
    });

    // Copy Button & Animation
    elements.copyBtn.addEventListener('click', () => {
        if (!elements.outputText.value) return;

        navigator.clipboard.writeText(elements.outputText.value).then(() => {
            const originalIcon = elements.copyBtn.innerHTML;

            // Temporary Checkmark
            elements.copyBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            elements.copyBtn.style.background = 'rgba(34, 197, 94, 0.1)';

            setTimeout(() => {
                elements.copyBtn.innerHTML = originalIcon;
                elements.copyBtn.style.background = '';
            }, 2000);
        });
    });

    // --- Tab Switching Logic ---
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');

            // Show content
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(`tab-${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'flex'; // Ensure flex display
            }

            // Hide others (helper for animation/layout)
            contents.forEach(c => {
                if (c.id !== `tab-${targetId}`) {
                    c.style.display = 'none';
                }
            });
        });
    });

    // --- Base Converter Logic ---

    const baseElements = {
        fromBase: document.getElementById('from-base'),
        toBase: document.getElementById('to-base'),
        swapBtn: document.getElementById('swap-base-btn'),
        input: document.getElementById('base-input'),
        output: document.getElementById('base-output'),
        convertBtn: document.getElementById('base-convert-btn'),
        clearBtn: document.getElementById('base-clear-btn'),
        copyBtn: document.getElementById('base-copy-btn')
    };

    function convertBase(value, fromBase, toBase) {
        if (!value) return "";
        try {
            // Create a regex to validate the input for the specific base
            // Binary: 0-1, Octal: 0-7, Decimal: 0-9, Hex: 0-9A-Fa-f
            const validChars = {
                2: /^[01]+$/,
                8: /^[0-7]+$/,
                10: /^[0-9]+$/,
                16: /^[0-9A-Fa-f]+$/
            };

            const cleanValue = value.trim();
            if (!validChars[fromBase].test(cleanValue)) {
                return `Error: Invalid characters for Base ${fromBase}`;
            }

            // Use BigInt if available for larger numbers, or standard parseInt
            // Limit checks to prevent crashes on massive numbers
            if (cleanValue.length > 50) return "Error: Number too large";

            const decimalValue = parseInt(cleanValue, fromBase);
            if (isNaN(decimalValue)) return "Error: Invalid Input";

            return decimalValue.toString(toBase).toUpperCase();
        } catch (e) {
            return "Error: Conversion Failed";
        }
    }

    baseElements.convertBtn.addEventListener('click', () => {
        const from = parseInt(baseElements.fromBase.value);
        const to = parseInt(baseElements.toBase.value);
        const input = baseElements.input.value;

        baseElements.output.value = convertBase(input, from, to);
    });

    baseElements.swapBtn.addEventListener('click', () => {
        const temp = baseElements.fromBase.value;
        baseElements.fromBase.value = baseElements.toBase.value;
        baseElements.toBase.value = temp;
        // Trigger conversion if input exists
        if (baseElements.input.value) baseElements.convertBtn.click();
    });

    baseElements.clearBtn.addEventListener('click', () => {
        baseElements.input.value = "";
        baseElements.output.value = "";
        baseElements.input.focus();
    });

    baseElements.copyBtn.addEventListener('click', () => {
        if (!baseElements.output.value) return;
        navigator.clipboard.writeText(baseElements.output.value).then(() => {
            const originalIcon = baseElements.copyBtn.innerHTML;
            baseElements.copyBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            baseElements.copyBtn.style.background = 'rgba(34, 197, 94, 0.1)';
            setTimeout(() => {
                baseElements.copyBtn.innerHTML = originalIcon;
                baseElements.copyBtn.style.background = '';
            }, 2000);
        });
    });

    // Initial Setup
    updateUI();
});
