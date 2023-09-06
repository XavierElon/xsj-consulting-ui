import { createMachine, assign } from 'xstate'

type TodoEvents = { type: 'Create New' } | { type: 'Form input changed'; value: string } | { type: 'Submit' } | { type: 'Delete'; todo: string } | { type: 'Speed up' }


export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0ARntaKjgBwA2ACwAmewHZ7b28AZgBOPwAaEABPO3dvdxcAVmDAvy1gzyStJPsAXzyooRwCEk4JelJGITYwACc61DqKIwAbFQAzJoBbCmKRMvFaSuqZOQUlc01dfUsTWDM1UksbBFtspIpvTy13AL9Q4Pd7UNco2LWk7K2-TO9b+88-TwKimRLRThrMCshWAGE6mAVGBMAA5MAAd1mSBA80WFlhq22ngoWlcnh29kxriSe0iMTsnlc9goeNczyShy0p1C7leIH6pTEfTGP2GfwAImBWmBlGAYcZTFMVogsn4KKEtE8tIFgt5Qk5vOc7OlQhRPPFPLTXI9ngymZ9KIDgaoquCodIMBQAMqEVCQqRdOrdTBkIwAV2UrAAYj03aRPcpMERcFVIIK4cKlqKEPZ3K4KMF0sEcsnQiF-EkVXGgls8cFsidDiSngb3gMWSaVFIIZCrahbfbHebna73V7WDaPQAjbpmSPwkVIxDBTIUZ7pp5UxxZdw52zEie7eP3dJJVwZ4LljAfQYUatmxh1hu23DcKRCdjqSgKASs3eVziH2uWoRni-moTyUi8SZLfRB2jRFQFWTJSXcBM-D8EIDiuGDs0JNZgk3Ml4zHLIx3cRUXkKRkK2ZZ8gRrc0T3fG1z0vGRWHqRpmjaToegfYRCONYijwtetyMor8ZB-P8a3UQDdDmYDlhHBBsm8NEC3cO4jncFJEIubYyQ3AJXCOTJPDCW4dxYo0KG5XkOKvDhb1-fhBAIwzjL5KiMH4xRBOmPQRNhIcYwkrIKFcVwtGleCFXjDd5yQ2xN0SaDwnsMJiTxaD9L3Fk7NM6jaKaFp2mUNtmOSzhUoc1AnP-ISZncoUFmHUDECSW40KcfF0THTIFzxVEkm8GlFLq44AlCJKn0oQrzWUd4MqBCBWCsWBlBBChcA6fk6gACm8bItAASlYQ19xGxgxt3CaIwqqMqq8mqEE1TZjnJE5IOxDcFy1MkurpeC+pOQbWKMnl7NG8aGiaP4bSMMBIEwD0jCA86QOsRA5OkmkgkxTVjiyUJnqXTruo+-wvrw3aWQqIq2HMrhLPvInymGUmSpcwD7AMDyxNjBwnBcewPB8fGgl0hdtVRTSdL8dxZQQ9a-AKPDSHQOBLGpsBRNh8TLvWFIth2PZ-EOY5Qkx8LTlRBIYOxcUTlwt5Hx+kneJYZWEVV+G1mujV7CSJ4vBJRxTgXTTElTJ4UKOBJU28b7DO+X4IAd6rnfdoWxfCTUFRggLgmegJkkOdbFT8PECatgz91t0YWEwABRIHJtji7ncXDdJQOLUdIyFC8QXWLpMnZ5N11Z5Jwj-cX1It8ZFruHVgpJNNUVI4ripTdPE7rPcT5rwFVxLRvFcIeq3Y18uJkJsHSdf0O2UCendWWLNkybDYp6xfQmX8LtUlFIMlxMdOo8DE96IqaQ+p4KKfjLqgK+sYk4amONKQ44Q-AeGUnYDESYvC3CpL4FGADhp-TShgSBEk8QByCCjQ4xJQhUj9kcJM0pbj+1DtvHBv0TJSEOlgY6McWYq1jBuG67sEz3XRlQt+45t5p1ivfQsSRpZ5CAA */
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
              actions: 'assignTodosToContext',
              cond: 'Has todos'
            },
            'Creating New Todo'
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
    guards: {
      'Has todos': (context: any, event: any) => {
          return event.data.length > 0+
      }
    },
    actions: {
      assignTodosToContext: assign((context: any, event: any) => {
        return {
          todos: event.data
        }
      }),
      assignErrorToContext: assign((context: any, event: any) => {
        if ('data' in event) {
          return {
            errorMessage: (event.data as Error).message
          }
        }
        
      }),
      assignInputFormToContext: assign((context: any, event: any) => {
        if (event.type === 'Form input changed') {
          return {
            createNewTodoFormInput: event.value
          }
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
