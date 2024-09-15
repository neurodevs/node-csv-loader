import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface InvalidFileExtensionErrorOptions extends SpruceErrors.NodeCsvLoader.InvalidFileExtension, ISpruceErrorOptions {
	code: 'INVALID_FILE_EXTENSION'
}
export interface FileNotFoundErrorOptions extends SpruceErrors.NodeCsvLoader.FileNotFound, ISpruceErrorOptions {
	code: 'FILE_NOT_FOUND'
}

type ErrorOptions =  | InvalidFileExtensionErrorOptions  | FileNotFoundErrorOptions 

export default ErrorOptions
