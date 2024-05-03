import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        todos: async (): Promise<Todo[]> => {
            return prisma.todo.findMany()
        }
    },
    Mutation: {
        createTodo: async(_: any, {title} : {title: string}): Promise<Todo> => {
            return prisma.todo.create({
                data: {
                    title,
                    completed: false
                }
            })
        },
        updateTodo: async(_:any, {id, title, completed}: {id: string, title: string, completed: boolean}): Promise<Todo | null> => {
            return prisma.todo.update({
                where: {
                    id
                },
                data: {
                    completed,
                    title
                }
            })
        },
        deleteTodo: async(_:any, {id}: {id: string}): Promise<Todo | null> => {
            return prisma.todo.delete({
                where: {
                    id
                }
            })
        }
    }
}

export default resolvers;