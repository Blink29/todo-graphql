"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const resolvers = {
    Query: {
        todos: () => __awaiter(void 0, void 0, void 0, function* () {
            return prisma.todo.findMany();
        })
    },
    Mutation: {
        createTodo: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { title }) {
            return prisma.todo.create({
                data: {
                    title,
                    completed: false
                }
            });
        }),
        updateTodo: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { id, title, completed }) {
            console.log("updating", id);
            console.log("first", title);
            console.log("first", completed);
            return prisma.todo.update({
                where: {
                    id
                },
                data: {
                    completed,
                    title
                }
            });
        }),
        deleteTodo: (_3, _c) => __awaiter(void 0, [_3, _c], void 0, function* (_, { id }) {
            console.log("todo deleting", id);
            return prisma.todo.delete({
                where: {
                    id
                }
            });
        })
    }
};
exports.default = resolvers;
