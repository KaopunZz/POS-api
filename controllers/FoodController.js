const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    upload: async (req, res) => {
        try {
            if (req.files != undefined) {
                const myFile = req.files.myFile;

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
    },
    create: async (req, res) => {
        try {
            await prisma.food.create({
                data: {
                    foodTypeId: req.body.foodTypeId,
                    name: req.body.name,
                    remark: req.body.remark,
                    price: req.body.price,
                    img: req.body.img,
                    foodType: req.body.foodType
                }
            });

            return res.send({ message: 'success' });
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    list: async (req, res) => {
        try {
            const foods = await prisma.food.findMany({
                include: {
                    FoodType: true
                },
                where: {
                    status: 'use'
                },
                orderBy: {
                    id: 'desc'
                }
            })

            return res.send({ results: foods })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    remove: async (req, res) => {
        try {
            await prisma.food.update({
                data: {
                    status: 'delete',
                },
                where: {
                    id: parseInt(req.params.id)
                }
            })

            return res.send({ message: 'success' })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    update: async (req, res) => {
        try {
            // remove old file in food
            const oldFood = await prisma.food.findUnique({
                where: {
                    id: req.body.id
                }
            })

            if (oldFood.img != '') {
                if (req.body.img != '') {
                    const fs = require('fs');
                    fs.unlinkSync('uploads/' + oldFood.img);
                }
            }

            await prisma.food.update({
                where: {
                    id: req.body.id
                },
                data: {
                    foodTypeId: req.body.foodTypeId,
                    name: req.body.name,
                    remark: req.body.remark,
                    price: req.body.price,
                    img: req.body.img,
                    foodType: req.body.foodType
                }
            })

            return res.send({ message: 'success' })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    filter: async (req, res) => {
        try {
            let condition = {
                status: 'use'
            }

            if (req.params.foodType != 'all') {
                condition.foodType = req.params.foodType;
            }

            const foods = await prisma.food.findMany({
                where: condition,
                orderBy: {
                    id: 'desc'
                }
            })

            return res.send({ results: foods })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    }
}