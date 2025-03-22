const fs = require('node:fs');

const readFromJsonFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const writeToJsonFile = (filePath, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
}

module.exports = {
    readFromJsonFile,
    writeToJsonFile
}
