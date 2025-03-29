const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class TodoDBModel {
    static async getAll(where = {}) {
        return prisma.todo.findMany({where});
    }

    static async findOne({id, userId}) {
        return prisma.todo.findUnique({
            where: {
                id: parseInt(id),
                userId: userId
            }
        })
    }

    static async createOne(data) {
        return prisma.todo.create({data});
    }

    static async updateOne(id, userId, data) {
        return prisma.todo.update({
            where: {
                id: parseInt(id),
                userId: userId
            },
            data: data
        })
    }

    static async deleteOne({id, userId}) {
        return prisma.todo.delete({
            where: {
                id: parseInt(id),
                userId: userId
            }
        })
    }
}

module.exports = TodoDBModel;
