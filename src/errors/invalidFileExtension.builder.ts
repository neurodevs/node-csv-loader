import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'invalidFileExtension',
    name: 'INVALID_FILE_EXTENSION',
    fields: {
        expected: {
            type: 'text',
            label: 'The expected file extension.',
            isRequired: true,
        },
        path: {
            type: 'text',
            label: 'Path to the file with an invalid file extension.',
            isRequired: true,
        },
    },
})
