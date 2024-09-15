import { CsvLoader, CsvRow } from '../../CsvLoader'

export default class FakeCsvLoader implements CsvLoader {
    public loadCalledWith: string[] = []
    private fakeData: CsvRow[] = []

    public setFakeData(data: CsvRow[]) {
        this.fakeData = data
    }

    public async load(path: string) {
        this.loadCalledWith.push(path)
        return this.fakeData
    }
}
