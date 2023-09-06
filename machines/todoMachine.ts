import { createMachine, assign } from 'xstate'

type TodoEvents = { type: 'Create New' } | { type: 'Form input changed'; value: string } | { type: 'Submit' } | { type: 'Delete'; todo: string }

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AFgCcFewCYnAVgDsrrx4DMjloAbK4eADQgAJ52YV4UwQEAjCHBAByO9skAvtmRQjgEJJwS9KSMQmxgAE7VqNUURgA2KgBm9QC2FAUixeK0ZRUycgpK5pq6+pYmsGZqpJY2CA5uFJlaXlr2-lmb-kmRMctJaUkU7q5JHsGOaRcnabn5MoWinJWYpZCsAMLVYCowJgAHJgADuUyQIBmcwsUKW-hCFH8aW26QywXsqPshzsSSSrgoAS89j8HjSHkc-j8TxAPSKYm6w0+A2+ABEwE0wMowJDjKZxotEB5XFpzltgul0lo7jdccsdmLtgTXGlgtSbgFafS3pQ-gDVOUQeDpBgKABlQioMFSdrVDqYMhGACuylYADFOo7SC7lJgiLhypA+dCBfMhQhXIiEptfKrfEksfYcdFEE4zqqvKEtB5k9t-MFtS9eoz9SopKCwabUBarTajXaHU7Xaxzc6AEYdMwhmGC+GIQLxLYa1yivYEiKphD+UXIsIpPwk+yhRxFjCvPoUMuGxiV6sW3DcKRCdjqSgKARM9clzjbismoQHo9GoTyUi8MbzfQ9sNw0BLewtH8NZ0i8QI7hJMDMnlWxZyxDwQnsB51UcVUPDXYQGVvf5yyNPdH3NQ9jxkVgajqBpmjaTor0w3UtxwndjSrAiiJfGQ3w-ct1G-XRpl-BZ+wQa57GRa5-ERNIvCuO55UCYDyUcW5JJlJxgiSDCN0ZDkuUYk8OHPd9+EEYssMobTuWIjAOMULiJj0XioV7cNBJSNIKBOLQtCSRFRTScTXGCGCRXiElsQLICPCuQs8jpEy6PM3SSLI+pGhaZRGxozTOASyzUGsz9uMmBz+VmPt-0QdUPAoU4Un8SLrjCGCkkcKqsUcTUo3xZqvEeWlSHQOBLB1Po+NK5zyuWJwxXWTZtl2ICDinWw1KqqNKWTfFLiQ1cYuGxlSly+BHP4iMHCA9yrgQoJ-IWmDl3iXwdmlJJF1ODSb2MlgWToSBRthASJsueIkmCLRMjHLMCx8GCfPc1Ucw8bwwjBrwvHe0zqAGQ7MAAUVqepfuOsa-2sOxAmCGN2uuW57kceUowpzMRW80JEVJdG6LvPCHxkP6ytJhBE2cTF0XxCKotceVuvcrxrsCK5RROewOc3Lndx5s1LWtW0vWbZQ+fGgXpZFtIavFhrZOaigNjufYapFHZld2uLVYY+9mJkJ9coNkmlmCKSKCzFIQdRbxbqnVURMlRJHajO43ud68MZytiMB9gGBdCNzQkuVCUVVCc7v984wOXNIvNe9TE9ozcU8YZQXmS-4IHTiNMXiRwoqcJDANCScjmWkTFMpRFbhavydlyXIgA */
    id: 'Todo Machine',
    initial: 'Loading Todos',
    schema: {
      events: {} as TodoEvents,
      // events: {} as { type: 'Todos Loaded'; todos: string[] } | { type: 'Loading todos failed'; errorMessage: string }
      services: {} as {
        loadTodos: {
          data: string[]
        }
        saveTodo: {
          data: void
        }
        deleteTodo: {
          data: void
        }
      }
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewTodoFormInput: ''
    },
    states: {
      'Loading Todos': {
        invoke: {
          src: 'loadTodos',
          onDone: [
            {
              target: 'Todos Loaded',
              actions: 'assignTodosToContext'
            }
          ],
          onError: [
            {
              target: 'Loading Todos Errored',
              actions: 'assignErrorToContext'
            }
          ]
        }
        //   on: {
        //     'Todos Loaded': {
        //       target: 'Todos Loaded',
        //       actions: 'consoleLogTodos'
        //     },
        //     'Loading todos failed': {
        //       target: 'Loading Todos Errored',
        //       actions: 'consoleLogErrors' // If you want to use this, define it below.
        //     }
        //   }
      },

      'Todos Loaded': {
        on: {
          'Create New': {
            target: 'Creating New Todo'
          },
          Delete: {
            target: 'Deleting Todo'
          }
        }
      },

      'Loading Todos Errored': {},

      'Creating New Todo': {
        initial: 'Showing form input',
        states: {
          'Showing form input': {
            on: {
              'Form input changed': {
                actions: 'assignInputFormToContext'
              },

              Submit: 'Saving Todo'
            }
          },

          'Saving Todo': {
            invoke: {
              src: 'saveTodo',

              onError: [
                {
                  target: 'Showing form input',
                  actions: 'assignErrorToContext'
                }
              ],

              onDone: '#Todo Machine.Loading Todos'
            }
          }
        }
      },

      'Deleting Todo': {
        invoke: {
          src: 'deleteTodo',
          onError: 'Deleting todo errored',
          onDone: 'Loading Todos'
        }
      },

      'Deleting todo errored': {}
    }
  },
  {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data
        }
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message
        }
      }),
      assignInputFormToContext: assign((context, event) => {
        return {
          createNewTodoFormInput: event.value
        }
      })
    }
    //   actions: {
    //     consoleLogTodos: (context: any, event: any) => {
    //       alert(JSON.stringify(event))
    //     },
    //     consoleLogErrors: (context: any, event: any) => {
    //       console.error(event.errorMessage)
    //     }
    //   }
  }
)
