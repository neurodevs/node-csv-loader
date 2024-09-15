import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import CsvLoaderImpl, { CsvLoader } from './CsvLoader'

export default class CsvLoaderTest extends AbstractSpruceTest {
    private static loader: CsvLoader
    private static invalidExtensionPath: string
    private static doesNotExistPath: string

    protected static async beforeEach() {
        await super.beforeEach()

        this.loader = this.Loader()
        this.invalidExtensionPath = generateId()
        this.doesNotExistPath = `${generateId()}.csv`
    }

    @test()
    protected static async canCreateCsvLoader() {
        assert.isTruthy(this.loader)
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        const err = await assert.doesThrowAsync(
            // @ts-ignore
            async () => await this.loader.load()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['csvPath'],
        })
    }

    @test()
    protected static async throwsIfPathDoesNotExist() {
        const err = await assert.doesThrowAsync(
            async () => await this.loader.load(this.doesNotExistPath)
        )

        errorAssert.assertError(err, 'FILE_NOT_FOUND', {
            path: this.doesNotExistPath,
        })
    }

    @test()
    protected static async throwsWithInvalidFileExtension() {
        const err = await assert.doesThrowAsync(
            async () => await this.loader.load(this.invalidExtensionPath)
        )

        errorAssert.assertError(err, 'INVALID_FILE_EXTENSION', {
            expected: '.csv',
            path: this.invalidExtensionPath,
        })
    }

    private static Loader() {
        return CsvLoaderImpl.Create()
    }
}
