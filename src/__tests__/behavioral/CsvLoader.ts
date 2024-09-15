import fs from 'fs'
import { assertOptions } from '@sprucelabs/schema'
import csvParser from 'csv-parser'
import SpruceError from '../../errors/SpruceError'

export default class CsvLoaderImpl implements CsvLoader {
    public static Class?: CsvLoaderConstructor

    private path!: string

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async load(path: string) {
        this.path = path
        this.validatePath()

        try {
            return await this.loadCsv()
        } catch (err: any) {
            debugger
            throw new SpruceError({
                code: 'FILE_LOAD_FAILED',
                path: this.path,
                originalError: err.message,
            })
        }
    }

    private validatePath() {
        this.assertPathWasPassed()
        this.assertPathHasCsvExtension()
        this.assertPathExists()
    }

    private assertPathWasPassed() {
        assertOptions({ path: this.path }, ['path'])
    }

    private assertPathHasCsvExtension() {
        if (!this.path.endsWith('.csv')) {
            throw new SpruceError({
                code: 'INVALID_FILE_EXTENSION',
                expected: '.csv',
                path: this.path,
            })
        }
    }

    private assertPathExists() {
        if (!fs.existsSync(this.path)) {
            throw new SpruceError({
                code: 'FILE_NOT_FOUND',
                path: this.path,
            })
        }
    }

    protected async loadCsv() {
        return new Promise((resolve, reject) => {
            const data: CsvRow[] = []
            fs.createReadStream(this.path)
                .pipe(csvParser())
                .on('data', (row) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (err) => reject(err))
        }) as Promise<CsvRow[]>
    }
}

export interface CsvLoader {
    load(path: string): Promise<CsvRow[]>
}

export type CsvLoaderConstructor = new () => CsvLoader

export type CsvRow = Record<string, string>
