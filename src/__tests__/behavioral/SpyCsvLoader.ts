import CsvLoaderImpl, { CsvLoaderOptions } from './CsvLoader'

export default class SpyCsvLoader extends CsvLoaderImpl {
    public numCallsToValidatePath = 0
    private originalLoadCsv = this.loadCsv
    private err = ''

    public constructor(options?: CsvLoaderOptions) {
        super(options)
    }

    public setThrowOnLoadCsv(err: string) {
        this.err = err

        this.loadCsv = async () => {
            throw new Error(this.err)
        }
    }

    public validatePath() {
        this.numCallsToValidatePath++
        super.validatePath()
    }

    public clearTestDouble() {
        this.numCallsToValidatePath = 0
        this.loadCsv = this.originalLoadCsv
        this.err = ''
    }
}
