const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    upload: async (req, res) => {
        try {
            const myFile = req.files.MyFile;

            if (myFile != undefined) {
                const fileName = myFile.name;

                // rename file
                const fileExtension = fileName.split('.').pop();
                const newFileName = new Date().getTime() + '.' + fileExtension;
                const path = 'uploads/' + newFileName;

                // save file
                myFile.mv(path, async (err) => {
                    if (err) {
                        return res.status(500).send({ error: err.message });
                    }

                    return res.send({ message: 'success', fileName: newFileName });
                });
            } else {
                return res.status(500).send({ error: 'No file uploaded' });
            }
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    }
}