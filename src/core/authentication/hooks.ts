import { signUpAction } from './actions'
import { $SignUpSchema } from './schema'

import { useCreateForm } from '../ui/components/form'
import { useAction } from 'next-safe-action/hooks'

export const useSignUp = () => {
  const { execute, isExecuting, result } = useAction(signUpAction, {
    onError: ({ error }) => {
      if (error.serverError) {
        form.setError('email', { message: error.serverError })
      }
    },
  })

  const { form, submit, commit, discard, isUnSaved, rest } = useCreateForm({
    onSubmit: execute,
    schema: $SignUpSchema,
    initial: {
      name: '',
      email: '',
      password: '',
    },
  })

  return {
    form,
    data: result,
    isPending: isExecuting,
    submit,
    commit,
    discard,
    isUnSaved,
    rest,
  }
}
