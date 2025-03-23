const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class TodoDBModel {
    static async getAll() {
        return await prisma.todo.findMany();
    }

    static async findOne(id) {
        return await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        })
    }

    static async createOne(data) {
        return await prisma.todo.create({data});
    }

    static async updateOne(id, data) {
        return await prisma.todo.update({
            where: { id: parseInt(id) },
            data: data
        })
    }

    static async deleteOne(id) {
        return await prisma.todo.delete({
            where: { id: parseInt(id) }
        })
    }
}

module.exports = TodoDBModel;
