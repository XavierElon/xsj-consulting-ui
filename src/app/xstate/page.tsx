'use client'
import { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useMachine } from '@xstate/react'
import { todoMachine } from 'machines/todoMachine'

const XState: NextPage = () => {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        return ['Take bins out', 'Do laundry']
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
              {state.matches('Creating New Todo.Showing form input') && (
                <input
                  className="bg-white"
                  onChange={(e) => {
                    send({ type: 'Form input changed', value: e.target.value })
                  }}
                ></input>
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
