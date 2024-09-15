import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'






export declare namespace SpruceErrors.NodeCsvLoader {

	
	export interface InvalidFileExtension {
		
			/** The expected file extension.. */
			'expected': string
			/** The path to the file with an invalid file extension.. */
			'path': string
	}

	export interface InvalidFileExtensionSchema extends SpruceSchema.Schema {
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

	export type InvalidFileExtensionEntity = SchemaEntity<SpruceErrors.NodeCsvLoader.InvalidFileExtensionSchema>

}


export declare namespace SpruceErrors.NodeCsvLoader {

	
	export interface FileNotFound {
		
			/** Path to the file that was not found.. */
			'path': string
	}

	export interface FileNotFoundSchema extends SpruceSchema.Schema {
		id: 'fileNotFound',
		namespace: 'NodeCsvLoader',
		name: 'FILE_NOT_FOUND',
		    fields: {
		            /** Path to the file that was not found.. */
		            'path': {
		                label: 'Path to the file that was not found.',
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type FileNotFoundEntity = SchemaEntity<SpruceErrors.NodeCsvLoader.FileNotFoundSchema>

}




