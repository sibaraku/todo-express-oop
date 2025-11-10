import { Todo } from '../models/todo.js'

class todoController {
    constructor() {
        this.TODOS = []
    }

    async createTodo(req, res){
        const task = req.body.task
        const newTodo = new Todo (Math.random().toString(), task)
        this.TODOS.push(newTodo)
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTodo(){
        const todosData = await fileManager.readFile('./data/todos.json')
        const newTodo = new Todo (Math.random().toString(), task)
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = [] 
        } 
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    async updateTodo(req, res){
        const todoId = req.params.id
        const updatedTask = req.body.task

        console.log(req.body)
        console.log(req.params)

        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)
        if(todoIndex < 0){
            res.json({
                message: 'Could not find with such index'
            })
            throw new Error('Could not find todo')
        }

        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'todo is updated',
            updatedTask: this.TODOS[todoIndex] 
        })
    }

    async deleteTodo(req, res){
        const todoId = req.params.id

        const todoIndex = this.TODOS.findIndex(todo => todo.id === todoId)

        if (todoIndex < 0) {
            return res.status(404).json({
                message: 'Could not find todo with such id'
            })
        }

        this.TODOS.splice(todoIndex, 1)
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'todo deleted successfully',
            remainingTodos: this.TODOS
        })
    }

}

export const TodoController = new todoController()