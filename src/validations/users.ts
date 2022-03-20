const userSignUpSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        minLength: 1,
        transform: ['trim', 'toLowerCase'],
      },
      password: {
        type: 'string',
        minLength: 8,
      },
    },
    required: ['email', 'password'],
  },
} as const

const searchUserSchema = {
  body: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
      },
      size: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
      },
      keyword: {
        type: 'string',
        default: '',
      },
    },
    required: ['page', 'size', 'keyword'],
    additionalProperties: false,
  },
} as const

const userLoginSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 8,
      },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
} as const

export { userSignUpSchema, searchUserSchema, userLoginSchema }
