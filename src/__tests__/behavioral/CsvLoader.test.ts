import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
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

    private static Loader() {
        return CsvLoaderImpl.Create()
    }
}
