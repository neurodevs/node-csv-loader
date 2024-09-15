import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
    /** an easy to understand version of the errors */
    public friendlyMessage(): string {
        const { options } = this
        let message
        switch (options?.code) {
            case 'FILE_NOT_FOUND':
                message = `File not found! Path: '${options.path}'.`
                break

            case 'INVALID_FILE_EXTENSION':
                message = `Invalid file extension! Expected '${options.expected}', but received a file with path: '${options.path}'.`
                break

            case 'FILE_LOAD_FAILED':
                message = `File load failed! Path: '${options.path}'.\n\nOriginal error: '${options.originalError}'.`
                break

            default:
                message = super.friendlyMessage()
        }

        const fullMessage = options.friendlyMessage
            ? options.friendlyMessage
            : message

        return fullMessage
    }
}
