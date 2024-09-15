import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface InvalidFileExtensionErrorOptions extends SpruceErrors.NodeCsvLoader.InvalidFileExtension, ISpruceErrorOptions {
	code: 'INVALID_FILE_EXTENSION'
}
export interface FileNotFoundErrorOptions extends SpruceErrors.NodeCsvLoader.FileNotFound, ISpruceErrorOptions {
	code: 'FILE_NOT_FOUND'
}
export interface FileLoadFailedErrorOptions extends SpruceErrors.NodeCsvLoader.FileLoadFailed, ISpruceErrorOptions {
	code: 'FILE_LOAD_FAILED'
}

type ErrorOptions =  | InvalidFileExtensionErrorOptions  | FileNotFoundErrorOptions  | FileLoadFailedErrorOptions 

export default ErrorOptions
