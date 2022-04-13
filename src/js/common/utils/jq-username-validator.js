function usernameValidator(value, element) {
    const trimmed  = (value || '').trim();
    if (trimmed && trimmed.match(/(\\)|(\/)|(\+)/g)) {
        return false;
    }

    return true;
}

module.exports = usernameValidator;
