import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface FileNotFoundErrorOptions extends SpruceErrors.NodeCsvLoader.FileNotFound, ISpruceErrorOptions {
	code: 'FILE_NOT_FOUND'
}

type ErrorOptions =  | FileNotFoundErrorOptions 

export default ErrorOptions
