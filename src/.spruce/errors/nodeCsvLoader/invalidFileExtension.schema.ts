import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidFileExtensionSchema: SpruceErrors.NodeCsvLoader.InvalidFileExtensionSchema  = {
	id: 'invalidFileExtension',
	namespace: 'NodeCsvLoader',
	name: 'INVALID_FILE_EXTENSION',
	    fields: {
	            /** The expected file extension.. */
	            'expected': {
	                label: 'The expected file extension.',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** The path to the file with an invalid file extension.. */
	            'path': {
	                label: 'The path to the file with an invalid file extension.',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidFileExtensionSchema)

export default invalidFileExtensionSchema
