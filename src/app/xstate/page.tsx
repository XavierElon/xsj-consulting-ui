'use client'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useMachine } from '@xstate/react'
import { todoMachine } from 'machines/todoMachine'

const todos = new Set<string>(['Take bins out', 'Do laundry'])

const XState: NextPage = () => {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos)
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput)
      },
      deleteTodo: async (context, event) => {
        if (event.type === 'Delete') {
          // throw new Error('error')
          todos.delete(event.todo)
        }
      }
    }
  })

  return (
    <>
      <Layout>
        <div className="flex absolute top-1/4 left-1/4 min-h-screen text-black">
          <div className="text-black">
            <p>{JSON.stringify(state.value)}</p>
            <pre>{JSON.stringify(state.value)}</pre>
            <pre>{JSON.stringify(state.context)}</pre>
            <div>
              {state.matches('Todos Loaded') && (
                <>
                  {state.context.todos.map((todo) => (
                    <div key={todo} className="flex items-center">
                      <p>{todo}</p>
                      <button
                        onClick={() => {
                          send({
                            type: 'Delete',
                            todo
                          })
                        }}
                        className="ml-2 bg-slate-500"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </>
              )}

              {state.matches('Todos Loaded') && (
                <button
                  onClick={() => {
                    send({
                      type: 'Create New'
                    })
                  }}
                >
                  Create New
                </button>
              )}
              {state.matches('Deleting todo errored') && (
                <>
                  <p>Something went wrong: {state.context.errorMessage}</p>
                  <button
                    onClick={() => {
                      send({
                        type: 'Speed up'
                      })
                    }}
                    className="bg-slate-400"
                  >
                    Speed Up
                  </button>
                </>
              )}
              {state.matches('Creating New Todo.Showing form input') && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    send({
                      type: 'Submit'
                    })
                  }}
                >
                  <input
                    className="bg-white"
                    onChange={(e) => {
                      send({ type: 'Form input changed', value: e.target.value })
                    }}
                  ></input>
                </form>
              )}
            </div>
          </div>

          {/* <button
            onClick={() => {
              send({ type: 'Todos Loaded', todos: ['Take bins out'] })
            }}
          >
            Loaded
          </button>
          <button
            onClick={() => {
              send({
                type: 'Loading todos failed',
                errorMessage: 'Oh no!'
              })
            }}
          >
            Errored
          </button> */}
        </div>
      </Layout>
    </>
  )
}

export default XState
