import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'





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




