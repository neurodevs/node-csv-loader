import fs from 'fs'
import { assertOptions } from '@sprucelabs/schema'
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
    }

    private validatePath() {
        this.assertPathPassed()
        this.assertPathExists()
    }

    private assertPathPassed() {
        assertOptions({ csvPath: this.csvPath }, ['csvPath'])
    }

    private assertPathExists() {
        if (!fs.existsSync(this.csvPath)) {
            throw new SpruceError({
                code: 'FILE_NOT_FOUND',
                path: this.csvPath,
            })
        }
    }
}

export interface CsvLoader {
    load(csvPath: string): Promise<void>
}

export type CsvLoaderConstructor = new () => CsvLoader
