import { PrismaClient, Todo } from "@prisma/client";
import { title } from "process";

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
            console.log("updating", id)
            console.log("first", title)
            console.log("first", completed)
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
            console.log("todo deleting", id)
            return prisma.todo.delete({
                where: {
                    id
                }
            })
        }
    }
}

export default resolvers;