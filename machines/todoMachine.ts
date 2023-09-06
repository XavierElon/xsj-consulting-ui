import { createMachine, assign } from 'xstate'

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogDMAFgDsFAEwBWewDYAnN8db-WwBGdwAaEABPRCC3Ci0vAA5HNwBfFPChHAISTgl6UkYhNjAAJxLUEoojABsVADMKgFsKTJEc8Vp8wpk5BSVzTV19SxNYMzVSSxsEAFovV08g+MdbT1sXBJC3cKiEbyCKezdHBJcnAK1g9zT0kFJ0OEtW7LER0wGpxBnvewWlp1W602YUiXw2Ljini03gS3lsjhhpwSaQyMiyolynSkRTeYw+SGsX08h1sbgSbhcWjcAWB21BsyCPwoxwcCTWGy2KJAzwxgh6mDykFx4wsBOmbkZFFWxxcLk8bk8IN2tm8EKC8sV8vcSVhXJ57WoWIK0hYmAAomUKkKCaMRZMxYgtDtENSEhQYclLlSgskTjcUkA */
    id: 'Todo Machine',
    initial: 'Loading Todos',
    schema: {
      // events: {} as { type: 'Todos Loaded'; todos: string[] } | { type: 'Loading todos failed'; errorMessage: string }
      services: {} as {
        loadTodos: {
          data: string[]
        }
      }
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined
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
      'Todos Loaded': {},
      'Loading Todos Errored': {}
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
