const isEmpty = (data) => {
    if (typeof data === 'string' && data === "" ||
        typeof data === 'object' && Object.keys(data).length === 0 ||
        data === undefined ||
        data === null
    ) {
        return true;
    }
}

module.exports = isEmpty;