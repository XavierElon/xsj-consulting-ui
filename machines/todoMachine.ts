import { createMachine, assign } from 'xstate'

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogDMAFgDsFAEwBWewDYAnN8db-WwBGdwAaEABPRCC3Ci0vAA5HNwBfFPChHAISTgl6UkYhNjAAJxLUEoojABsVADMKgFsKTJEc8Vp8wpk5BSVzTV19SxNYMzVSSxsEAFovV08g+MdbT1sXBJC3cKiEbyCKezdHBJcnAK1g9zSMmSzRTiLMPMhWAGESsBUwTHIAd2GSBAo3GFiB03sCQSFG8bkWti03k29iOth2dhicThQU8jk8Wnctm8Wk8NxArWyYgoHy+qgKmAAcmA-tIMBQAMqEVB-KQNEqNTBkIwAV2UrAAYk1BaQRcpMERcAVIIDjKYBlNEMcDojfC4kYjjpd0QgPActlo3A4LXigo40ukQKR0HBLBSHmARmqJhrZt57Aslk5VutNmFIogZhsXHF8UjvLZHEjTgkyW72tROlIip6xurwRHPIdbG4Em4XBaAqHtuHZkE-RRjg4EmsNltU3c2lSni8IDnQZN8wh7MSG4iiX6gvYSWHdratBRPJs6-FiY4XC5PKSHWmqXksz1MABRMoVSB9vOgaZaY1uLTQpHJS4W23HFPbjuUzg0lRSJksoTnt6g6QrYhxaJOCTeO4JxbMaRLRkECZuLexZTpc3jthg9zpt+dKMH+rKoByXI8vSfICkKoqAWCl6asEYEQVBr6wTWTjQmsiHgUkSYbPaKRAA */
    id: 'Todo Machine',
    initial: 'Loading Todos',
    schema: {
      events: {} as
        | {
            type: 'Create New'
          }
        | {
            type: 'Form input changed'
            value: string
          },
      // events: {} as { type: 'Todos Loaded'; todos: string[] } | { type: 'Loading todos failed'; errorMessage: string }
      services: {} as {
        loadTodos: {
          data: string[]
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
          'Create New': 'Creating New Todo'
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
              }
            }
          }
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
