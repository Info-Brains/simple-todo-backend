const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class UserDBModel {
    static async FindOne({id, email}) {
        console.assert(id || email, "id or email is required");

        return prisma.user.findUnique({
            where: {
                ...(id ? { id: parseInt(id) } : {}),
                ...(email ? { email: email } : {}),
            }
        })
    }

    static async CreateOne(data, select = {}) {
        return prisma.user.create({data, select});
    }
}

module.exports = UserDBModel;
