const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            const saleTemp = await prisma.saleTemp.create({
                data: {
                    userId: req.body.userId,
                    tableNo: req.body.tableNo
                }
            })

            await prisma.saleTempDetail.create({
                data: {
                    saleTempId: saleTemp.id,
                    foodId: req.body.foodId
                }
            })

            return res.send({ message: 'success' })
        } catch (e) {
            console.log(e)
            return res.status(500).send({ error: e.message })
        }
    }
}