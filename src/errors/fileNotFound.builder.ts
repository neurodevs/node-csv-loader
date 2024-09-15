import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'fileNotFound',
    name: 'FILE_NOT_FOUND',
    fields: {
        path: {
            type: 'text',
            label: 'Path to the file that was not found.',
            isRequired: true,
        },
    },
})
