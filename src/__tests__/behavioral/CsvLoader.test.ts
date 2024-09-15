import fs from 'fs'
import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import csvParser from 'csv-parser'
import CsvLoaderImpl, { CsvLoaderOptions, CsvRow } from '../../CsvLoader'
import SpyCsvLoader from '../testDoubles/SpyCsvLoader'

export default class CsvLoaderTest extends AbstractSpruceTest {
    private static invalidExtensionPath: string
    private static doesNotExistPath: string
    private static actualPath: string
    private static expectedData: CsvRow[]

    private static loader: SpyCsvLoader

    protected static async beforeEach() {
        await super.beforeEach()

        CsvLoaderImpl.Class = SpyCsvLoader

        this.invalidExtensionPath = generateId()
        this.doesNotExistPath = `${generateId()}.csv`
        this.actualPath = 'src/__tests__/testData/test.csv'
        this.expectedData = await this.loadCsv(this.actualPath)

        this.loader = this.Loader()
        this.loader.clearTestDouble()
    }

    @test()
    protected static async canCreateCsvLoader() {
        assert.isTruthy(this.loader)
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        const err = await assert.doesThrowAsync(
            // @ts-ignore
            async () => await this.load()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['path'],
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

    @test()
    protected static async throwsIfLoadFails() {
        const fakeError = 'Unhandled error'
        this.loader.setThrowOnLoadCsv(fakeError)

        const err = await assert.doesThrowAsync(
            async () => await this.load(this.actualPath)
        )

        errorAssert.assertError(err, 'FILE_LOAD_FAILED', {
            path: this.actualPath,
            originalError: fakeError,
        })
    }

    @test()
    protected static async canTurnOffValidation() {
        const loader = this.Loader({ shouldValidatePath: false })

        await loader.load(this.actualPath)
        assert.isEqual(loader.numCallsToValidatePath, 0)
    }

    @test()
    protected static async loadsCsvDataCorrectly() {
        const data = await this.load(this.actualPath)
        assert.isEqualDeep(data, this.expectedData)
    }

    private static async loadCsv(path: string) {
        return new Promise((resolve, reject) => {
            const data: CsvRow[] = []
            fs.createReadStream(path)
                .pipe(csvParser())
                .on('data', (row) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (err) => reject(err))
        }) as Promise<CsvRow[]>
    }

    private static async load(path: string) {
        return await this.loader.load(path)
    }

    private static Loader(options?: CsvLoaderOptions) {
        return CsvLoaderImpl.Create(options) as SpyCsvLoader
    }
}
