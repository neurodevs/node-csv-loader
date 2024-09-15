import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import CsvLoaderImpl, { CsvLoader } from './CsvLoader'

export default class CsvLoaderTest extends AbstractSpruceTest {
    private static loader: CsvLoader

    protected static async beforeEach() {
        await super.beforeEach()

        this.loader = this.Loader()
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
        const invalidPath = 'asdf'

        const err = await assert.doesThrowAsync(
            async () => await this.loader.load(invalidPath)
        )

        errorAssert.assertError(err, 'FILE_NOT_FOUND', { path: invalidPath })
    }

    private static Loader() {
        return CsvLoaderImpl.Create()
    }
}
