import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'fileLoadFailed',
    name: 'FILE_LOAD_FAILED',
    fields: {
        path: {
            type: 'text',
            label: 'Path to the file that failed to load.',
            isRequired: true,
        },
    },
})
