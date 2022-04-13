function whitespaceValidator(value, element) {
    const isWhitespace = (value || '').trim().length === 0;
    return !isWhitespace;
}

module.exports = whitespaceValidator;
