import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import CsvLoaderImpl, { CsvLoader } from './CsvLoader'

export default class CsvLoaderTest extends AbstractSpruceTest {
    private static loader: CsvLoader
    private static invalidPath: string

    protected static async beforeEach() {
        await super.beforeEach()

        this.loader = this.Loader()
        this.invalidPath = 'asdf'
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
            async () => await this.loader.load(this.invalidPath)
        )

        errorAssert.assertError(err, 'FILE_NOT_FOUND', {
            path: this.invalidPath,
        })
    }

    @test()
    protected static async throwsIfPathIsNotCsvFormat() {}

    private static Loader() {
        return CsvLoaderImpl.Create()
    }
}
