# Universal Code Converter

A premium utility web application for encoding and decoding text across multiple formats. Convert between Morse code, Binary, ASCII, Hexadecimal, Base64, and Caesar Cipher with an intuitive, modern interface.

![Universal Code Converter](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0-orange?style=flat-square)

## Features

- **Multiple Encoding Formats:**
  - 🔤 Morse Code
  - 🧮 Binary (Text)
  - 🔢 ASCII
  - 🔗 Hexadecimal (Text)
  - 📦 Base64
  - 🔐 Caesar Cipher (with adjustable shift)

- **Bidirectional Conversion:** Encode and decode with a single click
- **Adjustable Caesar Shift:** Fine-tune the shift value from 0-25 using an interactive slider
- **Real-Time Conversion:** Instant results as you work
- **Copy to Clipboard:** One-click copy functionality for output
- **Clean UI:** Modern dark theme with glassmorphism design
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices
- **No Dependencies:** Vanilla JavaScript, HTML, and CSS

## Live Demo

Open `index.html` in your web browser to launch the application.

## Project Structure

```
UniversalCodeConverter/
├── index.html      # Main HTML structure
├── script.js       # Core conversion logic and interactivity
├── style.css       # Styling and responsive design
└── README.md       # Project documentation
```

## How to Use

1. **Select a Converter Type:**
   - Choose from the dropdown menu in the Text/Code section
   - Select Number Base conversions from the tab navigation

2. **Choose Your Mode:**
   - Click "Encode" to convert plain text to the selected format
   - Click "Decode" to convert from the selected format back to text

3. **Enter Your Input:**
   - Type or paste your text in the Input field

4. **Convert:**
   - Click the "Convert" button to process your input

5. **Copy Results:**
   - Click the copy icon to copy the output to your clipboard
   - Or use Ctrl+C to copy from the output field

## Supported Conversions

### Morse Code
- Encode: Text → Morse code (dots and dashes separated by spaces)
- Decode: Morse code → Text
- Example: `HELLO` → `.... . .-.. .-.. ---`

### Binary
- Encode: Text → 8-bit binary representation
- Decode: Binary → Text
- Example: `A` → `01000001`

### ASCII
- Encode: Text → ASCII decimal values
- Decode: ASCII values → Text
- Example: `A` → `65`

### Hexadecimal
- Encode: Text → Hexadecimal representation
- Decode: Hexadecimal → Text
- Example: `A` → `41`

### Base64
- Encode: Text → Base64 encoded string
- Decode: Base64 → Text
- Example: `Hello` → `SGVsbG8=`

### Caesar Cipher
- Encode: Text → Shifted text
- Decode: Shifted text → Original text
- Adjustable shift value (0-25)
- Example (shift=3): `HELLO` → `KHOOR`

## Technical Details

- **Language:** JavaScript (Vanilla - No frameworks)
- **Styling:** CSS3 with modern features (backdrop-filter, gradients)
- **Font:** Inter (Google Fonts)
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)

## Color Scheme

- **Primary Background:** Dark navy gradient (`#0f172a` to `#1e293b`)
- **Accent Color:** Sky blue (`#38bdf8`)
- **Card Background:** Semi-transparent white with glassmorphism
- **Text:** Light colors for high contrast

## Installation

No installation required! Simply:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/UniversalCodeConverter.git
   ```

2. Navigate to the project directory:
   ```bash
   cd UniversalCodeConverter
   ```

3. Open `index.html` in your browser

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Author

Developed by **Muhammad Ali Mehdi**

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Roadmap

- [ ] Number base conversions (Binary, Hex, Octal, Decimal)
- [ ] URL encoding/decoding
- [ ] ROT13 cipher
- [ ] Atbash cipher
- [ ] Dark/Light theme toggle
- [ ] History of recent conversions
- [ ] Batch conversion support

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ by Muhammad Ali Mehdi
