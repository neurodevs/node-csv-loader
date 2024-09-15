import CsvLoaderImpl from './CsvLoader'

export default class SpyCsvLoader extends CsvLoaderImpl {
    private err!: string

    public constructor() {
        super()
    }

    public setThrowOnLoadCsv(err: string) {
        this.err = err

        this.loadCsv = async () => {
            throw new Error(this.err)
        }
    }
}
