import fs from 'fs'
import { assertOptions } from '@sprucelabs/schema'
import csvParser from 'csv-parser'
import SpruceError from '../../errors/SpruceError'

export default class CsvLoaderImpl implements CsvLoader {
    public static Class?: CsvLoaderConstructor

    private csvPath!: string

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async load(csvPath: string) {
        this.csvPath = csvPath
        this.validatePath()

        return await this.loadCsv(this.csvPath)
    }

    private validatePath() {
        this.assertPathWasPassed()
        this.assertPathIsCsv()
        this.assertPathExists()
    }

    private assertPathWasPassed() {
        assertOptions({ csvPath: this.csvPath }, ['csvPath'])
    }

    private assertPathIsCsv() {
        if (!this.csvPath.endsWith('.csv')) {
            throw new SpruceError({
                code: 'INVALID_FILE_EXTENSION',
                expected: '.csv',
                path: this.csvPath,
            })
        }
    }

    private assertPathExists() {
        if (!fs.existsSync(this.csvPath)) {
            throw new SpruceError({
                code: 'FILE_NOT_FOUND',
                path: this.csvPath,
            })
        }
    }

    private async loadCsv(csvPath: string) {
        return new Promise((resolve, reject) => {
            const data: CsvRow[] = []
            fs.createReadStream(csvPath)
                .pipe(csvParser())
                .on('data', (row) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (err) => reject(err))
        }) as Promise<CsvRow[]>
    }
}

export interface CsvLoader {
    load(csvPath: string): Promise<CsvRow[]>
}

export type CsvLoaderConstructor = new () => CsvLoader

export type CsvRow = Record<string, string>
