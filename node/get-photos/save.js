const fs = require('fs');

module.exports = {
    saveFile: async function(stream, upn) {
        let writeStream = fs.createWriteStream('./' + upn + '.jpg');
		stream.pipe(writeStream).on("error", (err) => {
			throw error;
		});
		writeStream.on("finish", () => {
			console.log("Downloaded");
		});
		writeStream.on("error", (err) => {
			throw error;
		});
    } 
};