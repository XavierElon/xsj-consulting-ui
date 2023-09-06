import { createMachine, assign } from 'xstate'

type TodoEvents = { type: 'Create New' } | { type: 'Form input changed'; value: string } | { type: 'Submit' } | { type: 'Delete'; todo: string } | { type: 'Speed up' }

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AFgCcFewCYnAVgDsrrx4DMjloAbK4eADQgAJ52YV4UwQEAjCHBAByO9skAvtmRQjgEJJwS9KSMQmxgAE7VqNUURgA2KgBm9QC2FAUixeK0ZRUycgpK5pq6+pYmsGZqpJY2CA5uFJlaXlr2-lmb-kmRMctJaUkU7q5JHsGOaRcnabn5MoWinJWYpZCsAMLVYCowJgAHJgADuUyQIBmcwsUKW-hCFH8aW26QywXsqPshzsSSSrgoAS89j8HjSHkc-j8TxAPSKYm6w0+A2+ABEwE0wMowJDjKZxotEB5XFpzltgul0lo7jdccsdmLtgTXGlgtSbgFafS3pQ-gDVOUQeDpBgKABlQioMFSdrVDqYMhGACuylYADFOo7SC7lJgiLhypA+dCBfMhQhXIiEptfKrfEksfYcdFEE4zqqvKEtB5k9t-MFtS9eoz9SopKCwabUBarTajXaHU7Xaxzc6AEYdMwhmGC+GIQLxLYa1yivYEiKphD+UXIsIpPwk+yhRxFjCvPoUMuGxiV6sW3DcKRCdjqSgKARM9clzjbismoQHo9GoTyUi8MbzfQ9sNw0BLewtH8NZ0i8QI7hJMDMnlWxZyxDwQnsB51UcVUPDXYQGVvf5yyNPdH3NQ9jxkVgajqBpmjaTor0w3UtxwndjSrAiiJfGQ3w-ct1G-XRpl-BZ+wQa57GRa5-ERNIvCuO55UCYDyUcW5JJlJxgiSDCN0ZDkuUYk8OHPd9+EEYssMobTuWIjAOMULiJj0XioV7cNBJSNIKBOLQtCSRFRTScTXGCGCRXiElsQLICPCuQs8jpEy6PM3SSLI+pGhaZRGxozTOASyzUGsz9uMmBz+VmPt-0QdUPAoU4Un8SLrjCGCkkcKqsUcTUo3xZqvEeGKdU3HKjWUF5kv+CBWCsWBlEBChcFaHlqgACjCTyAEpWH6rTOQsoaRtqepg2K0NSuc8qhN8NYoqcJDANCScjlgjxWoxFrOvxRweo0m8zO2xjhvXUbvnNIwwEgTBnSMH8Tr-awKsyZFUMuZrExCRqp1grxnDajr9nemlaVIdA4EsTbyD46GBLOhwgjWQDNm2XYgIOdG1KqqNKWTfFLiQ1c+rizdSly+BHP4iMHCA9yrgQoJ-KZmDl3iXwdmlJJF1OL7TJo2AWToSBydhSnYcjVX3OCLRMjHLMCx8GCfPc1Ucyenxpa8LwNbowW2JYTAAFF9rG-WyqN2xAmCGN2uuW57kceUozDzMRW80JEVJd3NzvPCHxkQPTqNxNnExdF8QiqLXHlbr3MxoDAiuUUTnsNPSwY+9mJkWtrVtL1m2UHOYaWCvC7SGqS4a2TmooDY7n2GqRR2Bu+evTWM93LOzUI58hgwXvDaWYIpIoLMUiSdJGf2WPUQSSUAmTKM7nVhfaIG37cu3iNQjc0JLlQlFVQneW9-OGBZcaQvJq3Ug-LKP0dJSH+lgQGEBX6CUxPERwV1MgozujBTEawWpUnNhkck4l565CAA */
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
          onError: [
            {
              target: 'Deleting todo errored',
              actions: 'assignErrorToContext'
            }
          ],
          onDone: 'Loading Todos'
        }
      },

      'Deleting todo errored': {
        after: {
          '2500': 'Todos Loaded'
        },

        on: {
          'Speed up': 'Todos Loaded'
        }
      }
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
